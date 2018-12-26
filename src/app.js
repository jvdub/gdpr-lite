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
    style.innerText = '#gdpr-lite-toast{position:fixed;left:0;bottom:0;width:100%;background-color:darkslategrey;color:white;text-align:center;}button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1pxsolidtransparent;border-radius:4px;color:#fff;background-color:#5cb85c;border-color:#4cae4c;}';

    document.head.appendChild(style);
}

function wireAcceptEvent(btn) {
    btn.onclick = (e) => {
        document.getElementById('gdpr-lite-toast').style.display = 'none';
        document.cookie = "gdprlite=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
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

function shouldShowMessage() {
    if (!document.cookie.includes('gdprlite=')) {
        return true;
    } else if (document.cookie.includes('gdprlite=') && document.cookie.replace(/(?:(?:^|.*;\s*)gdprlite\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== 'true') {
        return true;
    } else if (document.cookie.includes('gdprlite=') && document.cookie.replace(/(?:(?:^|.*;\s*)gdprlite\s*\=\s*([^;]*).*$)|^.*$/, "$1") === 'true') {
        return false;
    }

    return false;
}

export const gdprLite = {
    initialize(noticeText = 'This site uses cookies to offer its online services.', urlToTerms) {
        if (shouldShowMessage()) {
            createToastHTML(noticeText, urlToTerms);
        }
    }
};
