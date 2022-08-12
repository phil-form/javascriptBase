import { users, set_current_page, save } from "./script.js";
import { list_view } from "./views/list_view.js";

export function clear_root() {
    while (root.firstChild)
    root.removeChild(root.firstChild);
};

export function create_table(tableConfig) {
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
            td.innerText = item.data;
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

export function my_remove(user) {
    set_current_page("remove");
    const index = users.indexOf(user);
    if (index !== -1)
        users.splice(index, 1);
    save();
    list_view();
};

