

export class Component extends HTMLElement {

    constructor(templateName) {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        let template = document.getElementById(templateName);
        this.root.appendChild(template.content.cloneNode(true));
        this.#bind();
    }

    #bind() {
        
    }

}