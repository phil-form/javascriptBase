import NavBarComponent from './component/nav/navbarComponent.js';
import UserListComponent from './component/user/usersListComponent.js';
import ItemsListComponent from './component/item/iTemsListComponent.js';
import BasketComponent from './component/basket/basketComponent.js';
import {getFromStorage} from './utilities/storage.js';


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const rootNav = document.getElementById('root-nav');

    let users = getFromStorage('users');
    let items = getFromStorage('items');
    let basketItems = getFromStorage('basket')[0].items;
    
    const usersList = new UserListComponent(users);
    const itemsList = new ItemsListComponent(items);
    const basket = new BasketComponent(basketItems);
    
    const logo = './assets/logo.png';
    const links = ['Users', 'Items', 'Basket'];
    const navBar = new NavBarComponent(logo, links);
    navBar.toHTML(rootNav);

    //put all in nav
    const usersLink = document.getElementById('nav-link-users');
    usersLink.addEventListener('click', (e) => {
        e.preventDefault();

        usersList.toHTML(root);
        usersList.addCreateAction(root);
    });
    const itemsLink = document.getElementById('nav-link-items');
    itemsLink.addEventListener('click', (e) => {
        e.preventDefault();
      
        itemsList.toHTML(root);
        itemsList.addCreateAction(root);
    });
    const basketLink = document.getElementById('nav-link-basket');
    basketLink.addEventListener('click', (e) => {
        e.preventDefault();
      
        basket.toHTML(root);
        basket.addTotalPrice(root);
    });

    // Home Page   
    usersList.toHTML(root);
    usersList.addCreateAction(root);
});
