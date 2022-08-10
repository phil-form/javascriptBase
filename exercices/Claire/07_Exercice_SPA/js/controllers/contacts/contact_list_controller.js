import { contactList } from '../../contact.js'


const contactTable = document.getElementById('data-contacts')
const newBtn = document.getElementById('btn-contact-list-new')
newBtn.addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('editContactView'))
})

export function renderListData() {
    contactTable.innerHTML = ''
    for(let i in contactList.contacts) {
        contactTable.appendChild(getAsHtmlRow(contactList.contacts[i]))
    }
}

function getAsHtmlRow(contact) {
    const tr = document.createElement('tr')
    
    const cellId = tr.insertCell()
    const cellFn = tr.insertCell()
    const cellLn = tr.insertCell()
    const cellEm = tr.insertCell()
    const cellAction = tr.insertCell()
    cellId.innerText = contact.id
    cellFn.innerText = contact.firstname
    cellLn.innerText = contact.lastname
    cellEm.innerText = contact.email

    const form = document.createElement('form')
    form.name = `form-contacts-action-${contact.id}`
    const infoBtn = document.createElement('input')
    infoBtn.classList.add('btn', 'btn-info')
    infoBtn.type = 'button'
    infoBtn.value = 'Info'
    infoBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('infoContactView', {detail: contact}))
    })
    form.appendChild(infoBtn)
    const editBtn = document.createElement('input')
    editBtn.id = `btn-contact-list-edit-${contact.id}`
    editBtn.classList.add('btn', 'btn-primary')
    editBtn.type = 'button'
    editBtn.value = 'Edit'
    editBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('editContactView', {detail: contact}))
    })

    form.appendChild(editBtn)
    const deleteBtn = document.createElement('input')
    deleteBtn.id = `btn-contact-list-delete-${contact.id}`
    deleteBtn.classList.add('btn', 'btn-danger')
    deleteBtn.type = 'button'
    deleteBtn.value = 'Delete'
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault()
        contactList.remove(contact)
        renderListData()
    })
    form.appendChild(deleteBtn)
    cellAction.appendChild(form)
    return tr;
}