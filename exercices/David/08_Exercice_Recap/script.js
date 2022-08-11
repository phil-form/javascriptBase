

// function load_users() {
//     const stored_users = sessionStorage.getItem('users');
//     if (!stored_users) {
//         users = [];
//         save();
//     } else {
//         users = JSON.parse(stored_users);
//     }
// }


import {list_view, register_view, edit_page, info_page,
        basket_page, shop_page, users, shop, basket} from "./view.js"

const root   = document.getElementById("root");

// basket_page();
list_view();