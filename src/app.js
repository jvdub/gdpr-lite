/**
 * Idea behind this:
 * - Provide an easy-to-use JS library that will show a GDPR-compliant message
 * - End-users need only call a function and pass in minimal data to get this running
 * - The tool will include all JS libraries and HTML needed for this to work
 */

import { utils } from './utils';

export const gdprLite = {
    getTextForNotice(providedText, urlToTerms) {
        let noticeText = document.createElement('p');
        noticeText.id = 'gdpr-lite-text';

        if (urlToTerms && typeof urlToTerms === 'string') {
            let a = document.createElement('a');
            a.id = 'gdpr-lite-tac';
            a.innerText = 'Terms and Conditions';
            a.href = urlToTerms;

            noticeText.innerText = `${providedText} For more information, please refer to our `;
            noticeText.appendChild(a);
            noticeText.innerText += '.';
        } else {
            noticeText.innerText = providedText;
        }

        return noticeText;
    },
    createToastHTML(noticeVerbiage, urlToTerms) {
        let containingDiv = utils.createDiv('toast');
        let imgDiv = utils.createDiv('img');
        let noticeDiv = utils.createDiv('notice');
        let noticeText = getTextForNotice(noticeVerbiage, urlToTerms);

        noticeDiv.appendChild(noticeText);
        imgDiv.appendChild(noticeDiv);
        containingDiv.appendChild(imgDiv);
        document.body.appendChild(containingDiv);

        // TODO: Add stylesheet to HTML
    },
    initialize(noticeText = 'This site uses cookies to offer its online services.', urlToTerms) {
        createToastHTML(noticeText, urlToTerms);
    }
};
