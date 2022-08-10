import { contactList } from "../../models/contact.js"

export function renderInfoContact(contact) {
    document.getElementById('info-contact-firstname').innerText = contact.firstname
    document.getElementById('info-contact-lastname').innerText = contact.lastname
    document.getElementById('info-contact-email').innerText = contact.email
    
    const editBtn = document.getElementById('btn-contact-info-edit')
    editBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('editContactView', {detail: contact}))
    })
    const deleteBtn = document.getElementById('btn-contact-info-delete')
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault()
        contactList.delete(contact)
        document.dispatchEvent(new CustomEvent('listContactView'))
    })
}