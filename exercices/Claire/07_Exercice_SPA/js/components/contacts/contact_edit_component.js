import { Component } from "../generics/base_component.js";


export class ContactEditComponent extends Component {

    constructor(contactService, contact=null) {
        super('contact-edit-template');
        this.contact = contact;
        this.contactService = contactService;
        this.#bind();
    }

    #bind() {
        const inputId = this.root.getElementById('input-contact-edit-id');
        const inputFirstname = this.root.getElementById('input-contact-edit-firstname');
        const inputLastname = this.root.getElementById('input-contact-edit-lastname');
        const inputEmail = this.root.getElementById('input-contact-edit-email');

        // load contact data if exists
        if(this.contact) {
            inputId.value = this.contact.id
            inputFirstname.value = this.contact.firstname
            inputLastname.value = this.contact.lastname
            inputEmail.value = this.contact.email
        }

        const saveBtn = this.root.getElementById('btn-contact-edit-save');
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const contact = this.contactService.addOrUpdate(parseInt(inputId.value), inputFirstname.value, 
                inputLastname.value, inputEmail.value)
            document.dispatchEvent(new CustomEvent('infoContactView', {detail: contact}))
        });

        const cancelBtn = this.root.getElementById('btn-contact-edit-cancel')
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault()
            document.dispatchEvent(new CustomEvent('listContactView'))
        })
    }

}
customElements.define('contact-edit', ContactEditComponent);