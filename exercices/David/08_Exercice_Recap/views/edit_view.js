import { clear_root } from "../utils.js"
import { current_page, set_current_page, save} from "../script.js";
import { info_page } from "./info_view.js";


export function edit_page(user) {
    if (current_page === "edit_page")
        return
    set_current_page("edit_page");
    clear_root();
    
    const user_create_form = document.createElement('form');
    root.appendChild(user_create_form);
    
    //fields
    const lastname  = document.createElement('input');
    const firstname = document.createElement('input');
    const email     = document.createElement('input');
    
    lastname.type   = 'text';
    lastname.id     = 'lastname';
    lastname.value  = user.lastname;
    lastname.className = "form-control w-25";
    
    firstname.type  = 'text';
    firstname.id    = 'firstname';
    firstname.value = user.firstname;
    firstname.className = "form-control w-25";
    
    email.type      = 'text';
    email.id        = 'email';
    email.value     = user.email;
    email.className = "form-control w-25";
    
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
    let email_div = document.createElement('div');
    email_div.className = "col w-50";
    email_div.appendChild(email_label);
    email_div.appendChild(email);
    user_create_form.appendChild(email_div);
    user_create_form.appendChild(document.createElement('br'));

    //button
    const submit = document.createElement('input');
    submit.type  = 'submit';
    submit.value = 'Save changes';
    submit.className = "btn btn-success ml-3"
    user_create_form.appendChild(submit);
    
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        user.firstname = firstname.value;
        user.lastname = lastname.value;
        user.email = email.value;

        save();
        info_page(user);
    });
};