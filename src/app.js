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
    style.innerText = '#gdpr-lite-toast{visibility:hidden;max-width:50px;height:50px;margin:auto;background-color:#333;color:#fff;text-align:center;border-radius:2px;position:fixed;z-index:1;left:0;right:0;bottom:30px;font-size:17px;white-space:nowrap;}#gdpr-lite-toast#gdpr-lite-img{width:50px;height:50px;float:left;padding-top:16px;padding-bottom:16px;box-sizing:border-box;background-color:#111;color:#fff;}#gdpr-lite-toast#gdpr-lite-desc{color:#fff;padding:16px;overflow:hidden;white-space:nowrap;}#gdpr-lite-toast.show{visibility:visible;-webkit-animation:fadein 0.5s,expand 0.5s 0.5s,stay 3s 1s,shrink 0.5s 2s,fadeout 0.5s 2.5s;animation:fadein 0.5s,expand 0.5s 0.5s,stay 3s 1s,shrink 0.5s 4s,fadeout 0.5s 4.5s;}@-webkit-keyframesfadein{from{bottom:0;opacity:0;}to{bottom:30px;opacity:1;}}@keyframesfadein{from{bottom:0;opacity:0;}to{bottom:30px;opacity:1;}}@-webkit-keyframesexpand{from{min-width:50px}to{min-width:350px}}@keyframesexpand{from{min-width:50px}to{min-width:350px}}@-webkit-keyframesstay{from{min-width:350px}to{min-width:350px}}@keyframesstay{from{min-width:350px}to{min-width:350px}}@-webkit-keyframesshrink{from{min-width:350px;}to{min-width:50px;}}@keyframesshrink{from{min-width:350px;}to{min-width:50px;}}@-webkit-keyframesfadeout{from{bottom:30px;opacity:1;}to{bottom:60px;opacity:0;}}@keyframesfadeout{from{bottom:30px;opacity:1;}to{bottom:60px;opacity:0;}}';

    document.head.appendChild(style);
}

function createToastHTML(noticeVerbiage, urlToTerms) {
    let containingDiv = createDiv('toast');
    let imgDiv = createDiv('img');
    let noticeDiv = createDiv('notice');
    let noticeText = getTextForNotice(noticeVerbiage, urlToTerms);

    noticeDiv.appendChild(noticeText);
    imgDiv.appendChild(noticeDiv);
    containingDiv.appendChild(imgDiv);
    document.body.appendChild(containingDiv);

    includeCss();
}

export const gdprLite = {
    initialize(noticeText = 'This site uses cookies to offer its online services.', urlToTerms) {
        createToastHTML(noticeText, urlToTerms);
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('gdpr-lite-toast').className = 'show';
        }, false);
    }
};
