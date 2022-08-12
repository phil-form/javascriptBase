import { clear_root, ElemGenerator } from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { users,save  } from "../script.js";
import { User } from "../classes/user.js";
import { list_view } from "./list_view.js";

export function register_view() {
    if (current_page === "register_page")
        return
    set_current_page("register_page");
    clear_root();
    
    const register_user_config = {
        attributes: {},
        data: [
            {
             attributes: {class: "col mb-4"},
             data: [
                {element: "label", attributes: {for: "lastname", class: "form-label"}, data: "Last Name"},
                {attributes: {type: "text", name: "lastname", id: "lastname", class:"form-control", placeholder: "lastname"}},]
                
            },
            {
             attributes: {class: "col mb-4"},
             data: [
                {element: "label", attributes: {for: "firstname", class: "form-label"}, data: "First Name"},
                {attributes: {type: "text", name: "firstname", id: "firstname", class:"form-control", placeholder: "firstname"}},]
           },
           {
             attributes: {class: "col mb-4"},
             data: [
                {element: "label", attributes: {for: "email", class: "form-label"}, data: "E-mail"},
                {attributes: {type: "text", name: "email", id: "email", class:"form-control", placeholder: "email"}},]
          },],
        actions: [
            {
              attributes: {type: "submit", value: "Create User", class: "btn btn-success ml-3"},
              callBacks: [{event: "click", callback: create_user}],
            },
        ]
    };

    function create_user() {
        const firstname = document.getElementById('firstname').value; 
        const lastname  = document.getElementById('lastname').value;
        const email     = document.getElementById('email').value;

        const id = users.length + 1;
        const new_user = new User(lastname, firstname, email, id);
        
        users.push(new_user);
        save();
        list_view();
    }

    const user_create_form = new ElemGenerator(register_user_config).create_form();
    root.appendChild(user_create_form);
};