import { contactList } from "../contact.js"

const form = document.forms['form-edit-contact']
const inputId = document.getElementById('input-edit-id')
const inputFirstname = document.getElementById('input-edit-firstname')
const inputLastname = document.getElementById('input-edit-lastname')
const inputEmail = document.getElementById('input-edit-email')

const btnSave = document.getElementById('btn-edit-save')
btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    const id = parseInt(inputId.value)
    const firstname = inputFirstname.value
    const lastname = inputLastname.value
    const email = inputEmail.value
    const contact = contactList.addOrUpdate(id, firstname, lastname, email)
    document.dispatchEvent(new CustomEvent('infoView', {detail: contact}))
})

document.getElementById('btn-edit-cancel').addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('listView'))
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