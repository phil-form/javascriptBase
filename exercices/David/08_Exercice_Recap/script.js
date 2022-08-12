import { Shop }   from "./classes/shop.js"
import { Basket } from "./classes/basket.js"

import {list_view}     from "./views/list_view.js"
import {register_view} from "./views/register_view.js"
import {basket_view}   from "./views/basket_view.js"
import {shop_view}     from "./views/shop_view.js"
import {NavBar}        from "./nav_bar.js";
import { edit_page } from "./views/edit_view.js"

export const users  = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : [];
export const shop   = new Shop();
export const basket = new Basket();

export let   current_page = "";
export function set_current_page(page_title) {
    current_page = page_title;
}

export function save() {
    sessionStorage.setItem('users',  JSON.stringify(users));
    sessionStorage.setItem('shop',   JSON.stringify(shop.items));
    sessionStorage.setItem('basket', JSON.stringify(basket.items));
}

const nav = document.getElementById("nav_bar");
const nav_config = [
    {title: "Register", callback: register_view},
    {title: "Home",     callback: list_view},
    {title: "Shop",     callback: shop_view},
    {title: "Basket",   callback: basket_view}
];
nav.appendChild(new NavBar(nav_config));

const root = document.getElementById("root");

register_view();