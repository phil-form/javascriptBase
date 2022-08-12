import { clear_root, my_remove, ElemGenerator } from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { users } from "../script.js";
import { info_page } from "./info_view.js";
import { edit_page } from "./edit_view.js";

export function list_view() {
    if (current_page === "list_page")
        return
    set_current_page("list_page");
    clear_root();

    const list_config = {
        attributes: {class: "table table-hover"},
        thead: {
            head_attributes: {style: "border: none;"},
            row_attributes: {class: "d-flex"},
            data: [
                {attributes: {scope: "col", class:"col-1"}, data: "#"},
                {attributes: {scope: "col", class:"col-1"}, data: "Last Name"},
                {attributes: {scope: "col", class:"col-1"}, data: "First Name"},
                {attributes: {scope: "col", class:"col-3"}, data: "E-mail"},
            ]
        },
        tbody: {
            attributes: {},
            data: []
        },
        tfoot: {
            foot_attributes:  {}
        }
    }

    let count = 1;
    for (const user of users) {
        const rval = {
            attributes: {class: "d-flex"},
            data: [
                {attributes: {scope: "col", class: "col-1", style:"font-weight: bold;"}, data: count++},
                {attributes: {scope: "col", class: "col-1"}, data: user.lastname},
                {attributes: {scope: "col", class: "col-1"}, data: user.firstname},
                {attributes: {scope: "col", class: "col-1"}, data: user.email},
                {attributes: {scope: "col", class:"col-3"}, dataType: "action", data: make_config(user)}
                ]
        }
        list_config.tbody.data.push(rval);
    }

    function make_config(user) {
        const config = {
            attributes: {class: "btn-group"},
                data: [
                    {attributes: {type: "submit",  value: "info", class: "btn btn-outline-primary"},
                                        callBacks: [{event: 'click', params: user, callback: info_page}]},
                    {attributes: {type: "submit",  value: "edit", class: "btn btn-outline-success"},
                                        callBacks: [{event: 'click', params: user, callback: edit_page}]},
                    {attributes: {type: "submit",  value: "X", class: "btn", style: "font-weight: bold;  color: red"},
                                        callBacks: [{event: 'click', params: user, callback: my_remove}]},
            ]
        };
        return config;
    };
    
    const users_table = new ElemGenerator(list_config).create_table();
    root.appendChild(users_table);
};