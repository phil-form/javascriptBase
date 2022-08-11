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
            document.dispatchEvent(new CustomEvent('editContactView', {detail: this.contact}));
        });

        const deleteBtn = this.root.getElementById('btn-contact-info-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.contactService.delete(this.contact);
            document.dispatchEvent(new CustomEvent('listContactView'));
        });
    }    

}
customElements.define('contact-info', ContactInfoComponent);