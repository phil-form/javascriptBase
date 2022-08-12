import { clear_root } from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { edit_page } from "./edit_view.js";

export function info_page(user) {
    if (current_page === "info_page")
        return
    set_current_page("info_page");
    clear_root();
    
    const elem = document.createElement('p');
    elem.className = "ml-3"
    root.appendChild(elem);
    
    const lastname = document.createElement('span');
    lastname.innerText = `${user.lastname} `;
    elem.appendChild(lastname);

    const firstname = document.createElement('span');
    firstname.innerText = `${user.firstname} `;
    elem.appendChild(firstname);
    
    const email = document.createElement('span');
    email.innerText = `${user.email} `;
    elem.appendChild(email);
    
    const edit = document.createElement('button');
    edit.className = "btn btn-success ml-3";
    edit.innerText = "edit";
    root.appendChild(edit);
    
    edit.addEventListener('click', (e) => {
        e.preventDefault();
        edit_page(user);
    });
};