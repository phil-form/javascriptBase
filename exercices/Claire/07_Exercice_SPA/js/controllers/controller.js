import { BasketService } from "../services/basket_service.js"
import { ContactService } from "../services/contact_service.js"
import { ProductService } from "../services/product_service.js"
import { ContactListComponent } from "../components/contacts/contact_list_component.js"
import { ContactInfoComponent } from "../components/contacts/contact_info_component.js"
import { ContactEditComponent } from "../components/contacts/contact_edit_component.js";
import { ProductListComponent } from "../components/products/product_list_component.js";
import { ProductEditComponent } from "../components/products/product_edit_component.js"
import { ProductInfoComponent } from "../components/products/product_info_component.js"
import { BasketComponent } from "../components/basket_component.js"

const content = document.getElementById('content');
const contactService = new ContactService();
const productService = new ProductService();
const basketService = new BasketService();

export function init() {
    
    /* -------- CONTACTS --------  */
    document.addEventListener('listContactView', (e) => {
        render('contact-list');
    });

    document.addEventListener('infoContactView', (e) => {
        render('contact-info', e.detail);
    });

    document.addEventListener('editContactView', (e) => {
        render('contact-edit', e.detail);
    });

    /* --------   SHOP    --------  */
    document.addEventListener('shopView', (e) => {
        render('product-list');
    });

    document.addEventListener('infoProductView', (e) => {
        render('product-info', e.detail);
    });

    document.addEventListener('editProductView', (e) => {
        render('product-edit', e.detail);
    });

    document.addEventListener('basketView', (e) => {
        render('basket')
    });
}

function render(viewName, data) {
    content.innerHTML = ''
    switch(viewName) {
        case 'contact-list':
            content.appendChild(new ContactListComponent(contactService));
            activeNavlink('navlink-contacts');
            break;
        case 'contact-edit':
            content.appendChild(new ContactEditComponent(contactService, data));
            activeNavlink('none');
            break;
        case 'contact-info':
            content.appendChild(new ContactInfoComponent(contactService, data));
            activeNavlink('none');
            break;
        case 'product-list':
            content.appendChild(new ProductListComponent(productService, basketService));
            activeNavlink('navlink-shop');
            break;
        case 'product-edit':
            content.appendChild(new ProductEditComponent(productService, product));
            activeNavlink('none');
            break;
        case 'product-info':
            content.appendChild(new ProductInfoComponent(productService, basketService, data));
            activeNavlink('none');
            break;
        case 'basket':
            content.appendChild(new BasketComponent(basketService));
            activeNavlink('navlink-basket');
            break;
    }
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