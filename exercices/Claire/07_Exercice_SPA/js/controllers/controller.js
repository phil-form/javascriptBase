import { renderListData } from "./contacts/contact_list_controller.js"
import { renderInfoContact } from "./contacts/contact_info_controller.js"
import { renderEditContact } from "./contacts/contact_edit_controller.js"
import { renderProductData } from "./shop/product_list_controller.js"
import { renderInfoProduct } from "./shop/product_info_controller.js"
import { renderEditProduct } from "./shop/product_edit_controller.js"
import { renderBasket } from "./shop/basket_controller.js"


const navlinkHome = document.getElementById('navlink-home')
navlinkHome.addEventListener('click', (e) => {
    home()
})
const navlinkContacts = document.getElementById('navlink-contacts')
navlinkContacts.addEventListener('click', (e) => {
    contacts()
})
const navlinkShop = document.getElementById('navlink-shop')
navlinkShop.addEventListener('click', (e) => {
    shop()
})
const navlinkBasket = document.getElementById('navlink-basket')
navlinkBasket.addEventListener('click', (e) => {
    basket()
})

document.addEventListener('homeView', (e) => {
    home()
})

/* -------- CONTACTS --------  */
document.addEventListener('listContactView', (e) => {
    contacts()
})

document.addEventListener('infoContactView', (e) => {
    renderInfoContact(e.detail)
    activeNavlink('none')
    activeView('view-contact-info')
})

document.addEventListener('editContactView', (e) => {
    renderEditContact(e.detail)
    activeNavlink('none')
    activeView('view-contact-edit')
})

/* --------   SHOP    --------  */
document.addEventListener('shopView', (e) => {
    shop()
})

document.addEventListener('infoProductView', (e) => {
    renderInfoProduct(e.detail)
    activeNavlink('none')
    activeView('view-product-info')
})

document.addEventListener('editProductView', (e) => {
    renderEditProduct(e.detail)
    activeNavlink('none')
    activeView('view-product-edit')
})

document.addEventListener('basketView', (e) => {
    basket()
})

home()

function home() {
    activeNavlink('navlink-home')
    activeView('view-home')
}

function contacts() {
    renderListData()
    activeNavlink('navlink-contacts')
    activeView('view-contact-list') 
}

function shop() {
    renderProductData()
    activeNavlink('navlink-shop')
    activeView('view-shop')
}

function basket() {
    renderBasket()
    activeNavlink('navlink-basket')
    activeView('view-basket')
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