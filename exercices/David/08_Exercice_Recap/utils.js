import { users, set_current_page, save } from "./script.js";
import { list_view } from "./views/list_view.js";

export function clear_root() {
    while (root.firstChild)
    root.removeChild(root.firstChild);
};

export  class ElemGenerator {
    constructor(config) {
        this.config = config;
    }

    create_table() {
        const tableConfig = this.config
        const table = document.createElement('table');
    
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const tfoot = document.createElement('tfoot');
        table.appendChild(thead);
        table.appendChild(tbody);   
        table.appendChild(tfoot);   
        
        const column_count = tableConfig.thead.length;
        
        //table config=======================================================
        //set table attributes
        for (const attr in tableConfig.attributes) {
            table.setAttribute(attr, tableConfig.attributes[attr]);
        }
        //===================================================================
    
        //head===============================================================
        //set head attributes
        for (const attr in tableConfig.thead.head_attributes) {
            thead.setAttribute(attr, tableConfig.thead.head_attributes[attr]);
        }
    
        //set row attributes
        const thead_tr = thead.insertRow();
        for (const attr in tableConfig.thead.row_attributes) {
            thead_tr.setAttribute(attr, tableConfig.thead.row_attributes[attr]);
        }
    
        //set attributes for every column and fill data
        for (const colummn in tableConfig.thead.data) {
            const th = document.createElement('th');
            for (const attr in tableConfig.thead.data[colummn].attributes) {
                th.setAttribute(attr, tableConfig.thead.data[colummn].attributes[attr]);
            }
            th.innerText = tableConfig.thead.data[colummn].data;
            thead_tr.appendChild(th);
        };
        //===================================================================
    
        //body===============================================================
        //set body attributes
        for (const attr in tableConfig.tbody.attributes) {
            tbody.setAttribute(attr, tableConfig.tbody.attributes[attr]);
        }
    
        //for every row
        for (const row_index in tableConfig.tbody.data) {
            const row = tableConfig.tbody.data[row_index];
            const tr = tbody.insertRow();
    
            //set row attributes
            for (const attr in row.attributes) {
                tr.setAttribute(attr, row.attributes[attr]);
            }
            //for every item in row
            let col_counter = 0;
            for (const item_index in row.data) {
                if (col_counter === column_count)
                    return;
                const item = row.data[item_index];
                const td = tr.insertCell();
    
                //set item attributes
                for (const attr in item.attributes) {
                    td.setAttribute(attr, item.attributes[attr])
                }
                //set item data
                this.process_data(td, item.dataType, item.data);
            }
        }
        //body===============================================================
    
        //tfoot==============================================================
        for (const attr in tableConfig.tfoot.foot_attributes) {
            tfoot.setAttribute(attr, tableConfig.tfoot.foot_attributes[attr]);
        }
        
        //set row attributes
        const tfoot_tr = tfoot.insertRow();
        for (const attr in tableConfig.tfoot.row_attributes) {
            tfoot_tr.setAttribute(attr, tableConfig.tfoot.row_attributes[attr]);
        }
    
        //set attributes for every column and fill data
        for (const colummn in tableConfig.tfoot.data) {
            const th = document.createElement('th');
            for (const attr in tableConfig.tfoot.data[colummn].attributes) {
                th.setAttribute(attr, tableConfig.tfoot.data[colummn].attributes[attr]);
            }
            th.innerText = tableConfig.tfoot.data[colummn].data;
            tfoot_tr.appendChild(th);
        };
        //===================================================================
        return table;
    }

    create_form() {
        const form_container = document.createElement('div');
        form_container.className = "d-flex justify-content-center";
        const form = document.createElement('form');
        form_container.appendChild(form);

        //set attributes
        for (const attr in this.config.attributes) {
            form.setAttribute(attr, this.config.attributes[attr]);
        }

        //for every field
        for (const field_index in this.config.data) {
            const field = this.config.data[field_index];
            const div = document.createElement('div');

            //set field (<div>) attributes
            for (const attr in field.attributes) {
                div.setAttribute(attr, field.attributes[attr]);
            }

            //for every input in field
            for (const input_index in field.data) {
                const input = field.data[input_index];
                const input_field = document.createElement(input.element ? input.element : "input");
                div.appendChild(input_field);
                
                //set input attributes
                for (const attr in input.attributes) {
                    input_field.setAttribute(attr, input.attributes[attr]);
                }
                //set input data
                input_field.innerText = input.data;
                form.appendChild(div);
            }
        }
        //for every action
        for (const action_index in this.config.actions) {
            const action = this.config.actions[action_index];
            const action_input = document.createElement(action.element ? action.element : "input");

            //set attributes
            for (const attr in action.attributes) {
                action_input.setAttribute(attr, action.attributes[attr]);
            }

            //set callbacks
            for (const callback_index in action.callBacks) {
                const callback = action.callBacks[callback_index];
                action_input.addEventListener(callback.event, (e) => {
                    e.preventDefault();
                    callback.callback(callback.params);
                })
            }

            //set data
            action_input.innerText = action.data;
            form.appendChild(action_input);
        }

        return form_container;
    };

    process_data(td, dataType, data) {
        switch (dataType) {
            case undefined:
                td.innerText = data;
                break;
            case "raw":
                td.innerText = data;
                break;
            case "form":
                td.appendChild(this.process_action(data));
                break;
            case "action":
                td.appendChild(this.process_action(data));
                break;
        }
    }

    process_action(formConfig) {
        const form = document.createElement('form');
        //set form attributes
        for (const  attr in formConfig.attributes) {
            form.setAttribute(attr, formConfig.attributes[attr]);
        }

        for (const item_index in formConfig.data) {
            const input = document.createElement('input');
            const item  = formConfig.data[item_index];

            //set attributes
            for (const  attr in item.attributes) {
                input.setAttribute(attr, item.attributes[attr]);
            }

            //set data
            input.innerText = item.data;
            form.appendChild(input);

            //set callbacks
            for (const callback_index in item.callBacks) {
                const callback = item.callBacks[callback_index];
                input.addEventListener(callback.event, (e) => {
                    e.preventDefault();
                    callback.callback(callback.params);
                });
            }
        }
        return form;
    };
}

export function my_remove(user) {
    set_current_page("remove");
    const index = users.indexOf(user);
    if (index !== -1)
        users.splice(index, 1);
    save();
    list_view();
};

