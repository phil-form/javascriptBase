import { init } from "./controllers/controller.js";

const navlinkContacts = document.getElementById('navlink-contacts')
navlinkContacts.addEventListener('click', (e) => {
    routeTo('contact-list');
});
const navlinkShop = document.getElementById('navlink-shop')
navlinkShop.addEventListener('click', (e) => {
    routeTo('product-list');
});
const navlinkBasket = document.getElementById('navlink-basket')
navlinkBasket.addEventListener('click', (e) => {
    routeTo('basket');
})

init()
routeTo('product-list');

export function routeTo(viewId, data=null) {
    switch(viewId) {
        case 'contact-list':
            document.dispatchEvent(new Event('listContactView'));
            break;
        case 'contact-info':
            document.dispatchEvent(new CustomEvent('infoContactView', {detail: data}));
            break;
        case 'contact-edit':
            document.dispatchEvent(new CustomEvent('editContactView', {detail: data}));
            break;
        case 'product-list':
            document.dispatchEvent(new Event('shopView'));
            break;
        case 'product-info':
            document.dispatchEvent(new CustomEvent('infoProductView', {detail: data}));
            break;
        case 'product-edit':
            document.dispatchEvent(new CustomEvent('editProductView', {detail: data}));
            break;
        case 'basket':
            document.dispatchEvent(new Event('basketView'));
            break;
    }
}