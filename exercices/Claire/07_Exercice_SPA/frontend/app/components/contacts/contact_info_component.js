import { routeTo } from "../../app.js";
import { Component } from "../generics/base_component.js";


export class ContactInfoComponent extends Component {

    constructor(contactService, contact=null) {
        super('contact-info-template');
        this.contactService = contactService;
        this.contact = contact;
        this.#bind();
    }

    #bind() {
        this.root.getElementById('info-contact-firstname').innerText = this.contact.firstname;
        this.root.getElementById('info-contact-lastname').innerText = this.contact.lastname;
        this.root.getElementById('info-contact-email').innerText = this.contact.email;
        
        const editBtn = this.root.getElementById('btn-contact-info-edit');
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            routeTo('contact-edit', this.contact);
        });

        const deleteBtn = this.root.getElementById('btn-contact-info-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.contactService.delete(this.contact);
            routeTo('contact-list');
        });
    }    

}
customElements.define('contact-info', ContactInfoComponent);