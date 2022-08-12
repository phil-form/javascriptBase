import { clear_root, ElemGenerator } from "../utils.js"
import { current_page, set_current_page, save} from "../script.js";
import { info_page } from "./info_view.js";


export function edit_page(user) {
    if (current_page === "edit_page")
        return
    set_current_page("edit_page");
    clear_root();
    
    const user_create_form_config = {
        attributes: {},
        data: [
            {
             attributes: {class: "col mb-4"},
             data: [
                {element: "label", attributes: {for: "lastname", class: "form-label"}, data: "Last Name"},
                {attributes: {type: "text", name: "lastname", id: "lastname", class:"form-control", value: user.lastname}},]
                
            },
            {
             attributes: {class: "col mb-4"},
             data: [
                {element: "label", attributes: {for: "firstname", class: "form-label"}, data: "First Name"},
                {attributes: {type: "text", name: "firstname", id: "firstname", class:"form-control", value: user.firstname}},]
           },
           {
             attributes: {class: "col mb-4"},
             data: [
                {element: "label", attributes: {for: "email", class: "form-label"}, data: "E-mail"},
                {attributes: {type: "text", name: "email", id: "email", class:"form-control", value: user.email}},]
          },],
        actions: [
            {
              attributes: {type: "submit", value: "Save  changes", class: "btn btn-success ml-3"},
              callBacks: [{event: "click", params: user, callback: update}],
            },
        ]
    };

    const user_create_form = new ElemGenerator(user_create_form_config).create_form();
    root.appendChild(user_create_form);
};

function update(user) {
    user.firstname = document.getElementById('firstname').value; 
    user.lastname  = document.getElementById('lastname').value;
    user.email     = document.getElementById('email').value;
    save();
    info_page(user);
}