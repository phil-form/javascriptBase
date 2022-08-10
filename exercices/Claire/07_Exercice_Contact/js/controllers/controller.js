import { renderEditContact } from "./edit_controller.js"
import { renderInfoContact } from "./info_controller.js"
import { renderListData } from "./list_controller.js"

const navlinkHome = document.getElementById('navlink-home')
navlinkHome.addEventListener('click', (e) => {
    renderHome()
})
const navlinkList = document.getElementById('navlink-list')
navlinkList.addEventListener('click', (e) => {
    renderList()
})

document.addEventListener('homeView', (e) => {
    renderHome()
})

document.addEventListener('listView', (e) => {
    renderList()
})

document.addEventListener('infoView', (e) => {
    renderInfo(e.detail)
})

document.addEventListener('editView', (e) => {
    renderEdit(e.detail)
})

renderList()

export function renderHome() {
    activeNavlink('navlink-home')
    activeView('view-home')
}

export function renderList() {
    renderListData()
    activeNavlink('navlink-list')
    activeView('view-list')    
}

export function renderInfo(contact) {
    renderInfoContact(contact)
    activeNavlink('none')
    activeView('view-info')
}

export function renderEdit(contact) {
    renderEditContact(contact)
    activeNavlink('none')
    activeView('view-edit')
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