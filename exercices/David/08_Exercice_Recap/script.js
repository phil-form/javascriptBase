import {list_view, register_view, basket_page, shop_page} from "./view.js"
import { NavBar } from "./nav_bar.js";


const nav = document.getElementById("nav_bar");
console.log(nav.firstChild);
const nav_config = [
    {title: "Register", callback: register_view},
    {title: "Home",     callback: list_view},
    {title: "Shop",     callback: shop_page},
    {title: "Basket",   callback: basket_page}
];
nav.appendChild(new NavBar(nav_config));

const root = document.getElementById("root");

list_view();