import { contactList } from "../contact.js"

export function renderInfoContact(contact) {
    document.getElementById('info-firstname').innerText = contact.firstname
    document.getElementById('info-lastname').innerText = contact.lastname
    document.getElementById('info-email').innerText = contact.email
    
    const editBtn = document.getElementById('btn-info-edit')
    editBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('editView', {detail: contact}))
    })
    const deleteBtn = document.getElementById('btn-info-delete')
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault()
        contactList.remove(contact)
        document.dispatchEvent(new CustomEvent('listView'))
    })
}