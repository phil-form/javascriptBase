import { clear_root, my_remove } from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { users } from "../script.js";
import { info_page } from "./info_view.js";
import { edit_page } from "./edit_view.js";



export function list_view() {
    if (current_page === "list_page")
        return
    set_current_page("list_page");
    clear_root();
    
    const users_table = document.createElement('table');
    users_table.className = "table table-hover";
    root.appendChild(users_table);

    const thead = document.createElement('thead');
    thead.style.border = "none";
    users_table.appendChild(thead);
    
    //header
    const tr = thead.insertRow();
    tr.className = "d-flex";
    
    const id = document.createElement('th');
    id.innerText = "#";
    id.setAttribute("scope", "col");
    id.className = "col-1";
    tr.appendChild(id);
    
    const lastname = document.createElement('th');
    lastname.innerText = "Last Name";
    lastname.setAttribute("scope", "col");
    lastname.className = "col-1";
    tr.appendChild(lastname);
    
    const firstname = document.createElement('th');
    firstname.innerText = "First Name";
    firstname.setAttribute("scope", "col");
    firstname.className = "col-1";
    tr.appendChild(firstname);
    
    const email = document.createElement('th');
    email.innerText = "E-mail";
    email.setAttribute("scope", "col");
    email.className = "col-3";
    tr.appendChild(email);
    
    //body
    const tbody = document.createElement('tbody');
    users_table.className = "table table-hover";
    users_table.appendChild(tbody);
    let id_counter = 1;
    
    for (const user of users) {
        const row = tbody.insertRow();
        row.className = "d-flex";
        
        const id = document.createElement('th');
        id.innerText = id_counter++;
        id.setAttribute("scope", "row");
        id.className = "col-1";
        row.appendChild(id);
        
        const lastname = row.insertCell();
        lastname.innerText = user.lastname;
        lastname.className = "col-1";
        const firstname = row.insertCell();
        firstname.innerText = user.firstname;
        firstname.className = "col-1";
        const email = row.insertCell();
        email.innerText = user.email;
        email.className = "col-2";

        const action = row.insertCell();
        
        const action_form = document.createElement('form');
        action_form.className = "btn-group";
        action.appendChild(action_form);
        
        const info = document.createElement('input');
        info.type = 'submit';
        info.value = 'info';
        info.className = "btn btn-outline-primary";
        action_form.appendChild(info);
        
        const edit = document.createElement('input');
        edit.type = 'submit';
        edit.value = 'edit';
        edit.className = "btn btn-outline-success";
        action_form.appendChild(edit);
        
        const remove = document.createElement('input');
        remove.type = 'submit';
        remove.value = 'X';
        remove.className = "btn";
        remove.style.fontWeight = "bold";
        remove.style.color = "red";
        action_form.appendChild(remove);
        
        info.addEventListener('click', (e) => {
            e.preventDefault();
            info_page(user);
        })
        edit.addEventListener('click', (e) => {
            e.preventDefault();
            edit_page(user);
        })
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            my_remove(user);
        })
    };
};