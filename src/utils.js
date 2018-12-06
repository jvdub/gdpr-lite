export const utils = {
    createDiv(idPortion) {
        let div = document.createElement('div');
        div.id = `gdpr-lite-${idPortion}`;

        return div;
    }
};
