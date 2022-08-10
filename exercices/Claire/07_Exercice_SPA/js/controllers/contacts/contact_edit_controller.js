import { contactList } from "../../models/contact.js"

const form = document.forms['form-edit-contact']
const inputId = document.getElementById('input-contact-edit-id')
const inputFirstname = document.getElementById('input-contact-edit-firstname')
const inputLastname = document.getElementById('input-contact-edit-lastname')
const inputEmail = document.getElementById('input-contact-edit-email')

const btnSave = document.getElementById('btn-contact-edit-save')
btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    const id = parseInt(inputId.value)
    const firstname = inputFirstname.value
    const lastname = inputLastname.value
    const email = inputEmail.value
    const contact = contactList.addOrUpdate(id, firstname, lastname, email)
    document.dispatchEvent(new CustomEvent('infoContactView', {detail: contact}))
})

document.getElementById('btn-contact-edit-cancel').addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('listContactView'))
})

export function renderEditContact(contact) {
    form.reset()

    if (contact) {
        inputId.value = contact.id
        inputFirstname.value = contact.firstname
        inputLastname.value = contact.lastname
        inputEmail.value = contact.email
    }
    


}