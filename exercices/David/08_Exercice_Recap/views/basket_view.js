import { clear_root } from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { basket } from "../script.js";
import { ElemGenerator } from "../utils.js";

export function basket_view() {
    if (current_page === "basket_view")
        return
    set_current_page("basket_view");
    clear_root();

    let basket_table_config = {
        attributes: {class: "table table-hover"},
        thead: {
            head_attributes: {style: "border: none"},
            row_attributes: {class: "d-flex"},
            data:
            [
                {attributes: {scope: "row", class: "col-1"}, dataType: "raw", data:"Id"}, 
                {attributes: {scope: "row", class: "col-1"}, dataType: "raw", data:"Name"}, 
                {attributes: {scope: "row", class: "col-1"}, dataType: "raw", data:"Price"}, 
                {attributes: {scope: "row", class: "col-1"}, dataType: "raw", data:"Quantity"}
            ]},
        tbody: {
                attributes: {},
                data: []
               },
        tfoot: {
                foot_attributes: {},
                row_attributes: {class: "d-flex"},
                data: [
                    {attributes: {scope: "row", class: "col-1"}, data: `total: ${basket.compute_total()}`}
                ]
            }
    }

    for (const elem in basket.items) {
        const item = basket.items[elem];
        basket_table_config.tbody.data.push(
            {attributes: {class: "d-flex"}, data: [
                {attributes: {scope:"row", class:"col-1"}, data: item.id}, 
                {attributes: {scope:"row", class:"col-1"}, data: item.name}, 
                {attributes: {scope:"row", class:"col-1"}, data: item.price},
                {attributes: {scope:"row", class:"col-1"}, data: item.qty},
            ]}
            
        );
    }
    console.log(basket_table_config);

    const table = new ElemGenerator(basket_table_config).create_table();
    root.appendChild(table);

    const checkout = document.createElement('button');
    checkout.className = "btn btn-primary";
    checkout.innerText = "checkout";
    checkout.disabled = true;
    root.appendChild(checkout);
};