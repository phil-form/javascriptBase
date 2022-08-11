import { clear_root } from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { users,save  } from "../script.js";
import { User } from "../classes/user.js";
import { list_view } from "./list_view.js";
export function register_view() {
    if (current_page === "register_page")
        return
    set_current_page("register_page");
    clear_root();
    
    const user_create_form = document.createElement('form');
    root.appendChild(user_create_form);
    
    //fields
    const lastname  = document.createElement('input');
    const firstname = document.createElement('input');
    const email     = document.createElement('input');
    
    lastname.type  = 'text';
    lastname.id    = 'lastname';
    lastname.className = "form-control w-25";
    firstname.type = 'text';
    firstname.id   = 'firstname';
    firstname.className = "form-control w-25";
    email.type     = 'email';
    email.id       = 'email';
    email.className = "form-control w-25 ";

    //labels
    const lastname_label  = document.createElement('label');
    const firstname_label = document.createElement('label');
    const email_label     = document.createElement('label');
    
    //lastname
    lastname_label.setAttribute("for", 'lastname');
    lastname_label.innerText = 'Last Name';
    lastname_label.className = "form-label";
    let lname_div = document.createElement('div');
    lname_div.className = "col w-50";
    lname_div.appendChild(lastname_label);
    lname_div.appendChild(lastname);
    user_create_form.appendChild(lname_div);
    user_create_form.appendChild(document.createElement('br'));
    
    //firstname
    firstname_label.setAttribute("for", 'firstname');
    firstname_label.innerText = 'First Name';
    firstname_label.className = "form-label";
    let fname_div = document.createElement('div');
    fname_div.className = "col w-50";
    fname_div.appendChild(firstname_label);
    fname_div.appendChild(firstname);
    user_create_form.appendChild(fname_div);
    user_create_form.appendChild(document.createElement('br'));
    
    //email
    email_label.setAttribute("for", 'email');
    email_label.innerText = 'E-mail';
    email_label.className = "form-label";
    let mail_div = document.createElement('div');
    mail_div.className = "col w-50";
    mail_div.appendChild(email_label);
    mail_div.appendChild(email);
    user_create_form.appendChild(mail_div);
    user_create_form.appendChild(document.createElement('br'));
    
    //button
    const submit = document.createElement('input');
    submit.type  = 'submit';
    submit.value = 'Create User';
    submit.className = "btn btn-primary ml-3";
    user_create_form.appendChild(submit);
    
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const id = users.length + 1;
        const new_user = new User(lastname.value, firstname.value, email.value, id);
        
        users.push(new_user);
        save();
        list_view();
    });
};