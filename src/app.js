/**
 * Idea behind this:
 * - Provide an easy-to-use JS library that will show a GDPR-compliant message
 * - End-users need only call a function and pass in minimal data to get this running
 * - The tool will include all JS libraries and HTML needed for this to work
 */

import { utils } from './utils';

export const gdprLite = {
    createToastHTML(noticeVerbiage) {
        let containingDiv = utils.createDiv('toast');
        let imgDiv = utils.createDiv('img');
        let noticeDiv = utils.createDiv('notice');

        let noticeText = document.createElement('p');
        noticeText.id = 'gdpr-lite-text';
        noticeText.innerText = noticeVerbiage;

        noticeDiv.appendChild(noticeText);
        imgDiv.appendChild(noticeDiv);
        containingDiv.appendChild(imgDiv);
        document.body.appendChild(containingDiv);

        // TODO: Add stylesheet to HTML
    },
    initialize(noticeText = 'This site uses cookies to offer its online services. For more information on their usage, please refer to .....') {
        createToastHTML(noticeText);
    }
};
