import { renderEditContact } from "./contacts/contact_edit_controller.js"
import { renderInfoContact } from "./contacts/contact_info_controller.js"
import { renderListData } from "./contacts/contact_list_controller.js"

const navlinkHome = document.getElementById('navlink-home')
navlinkHome.addEventListener('click', (e) => {
    renderHome()
})
const navlinkList = document.getElementById('navlink-list')
navlinkList.addEventListener('click', (e) => {
    renderContactList()
})

document.addEventListener('homeView', (e) => {
    renderHome()
})

document.addEventListener('listContactView', (e) => {
    renderContactList()
})

document.addEventListener('infoContactView', (e) => {
    renderContactInfo(e.detail)
})

document.addEventListener('editContactView', (e) => {
    renderContactEdit(e.detail)
})

renderContactList()

export function renderHome() {
    activeNavlink('navlink-home')
    activeView('view-home')
}

export function renderContactList() {
    renderListData()
    activeNavlink('navlink-list')
    activeView('view-contact-list')    
}

export function renderContactInfo(contact) {
    renderInfoContact(contact)
    activeNavlink('none')
    activeView('view-contact-info')
}

export function renderContactEdit(contact) {
    renderEditContact(contact)
    activeNavlink('none')
    activeView('view-contact-edit')
}

function activeNavlink(id) {
    const navs = document.querySelectorAll('.nav-item')
    for (const nav of navs) {
        if(nav.id == id && !nav.classList.contains('active')) {
            nav.classList.add('active')
        } else if (nav.classList.contains('active')) {
            nav.classList.remove('active')
        }
    }
}

function activeView(id) {
    const views = document.querySelectorAll('.container')
    for (const view of views) {
        if(view.id == id) {
            view.hidden = false
        } else {
            view.hidden = true
        }
    }
}