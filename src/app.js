/**
 * Idea behind this:
 * - Provide an easy-to-use JS library that will show a GDPR-compliant message
 * - End-users need only call a function and pass in minimal data to get this running
 * - The tool will include all JS libraries and HTML needed for this to work
 */

function createDiv(idPortion) {
    let div = document.createElement('div');
    div.id = `gdpr-lite-${idPortion}`;

    return div;
}

function createButton(text) {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.innerText = text;

    return btn;
}

function getTextForNotice(providedText, urlToTerms) {
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
}

function includeCss() {
    let style = document.createElement('style');
    style.innerText = '#gdpr-lite-toast{position:fixed;left:0;bottom:0;width:100%;background-color:red;color:white;text-align:center;}';

    document.head.appendChild(style);
}

function wireAcceptEvent(btn) {
    btn.onclick = (e) => {
        document.getElementById('gdpr-lite-toast').style.display = 'none';
    };

    return btn;
}

function createToastHTML(noticeVerbiage, urlToTerms) {
    let containingDiv = createDiv('toast');
    let noticeDiv = createDiv('notice');
    let noticeText = getTextForNotice(noticeVerbiage, urlToTerms);
    let acceptButton = wireAcceptEvent(createButton('Accept and close'));

    noticeDiv.appendChild(noticeText);
    containingDiv.appendChild(noticeDiv);
    containingDiv.appendChild(acceptButton);
    document.body.appendChild(containingDiv);

    includeCss();
}

export const gdprLite = {
    initialize(noticeText = 'This site uses cookies to offer its online services.', urlToTerms) {
        createToastHTML(noticeText, urlToTerms);
    }
};
