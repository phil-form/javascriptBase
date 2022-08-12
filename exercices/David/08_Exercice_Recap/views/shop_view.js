import { clear_root, ElemGenerator}      from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { shop } from "../script.js";
import { Item } from "../classes/item.js";

export function shop_view() {
    if (current_page === "shop_view")
        return
    set_current_page("shop_view"); 
    clear_root();

    const shop_add_item_form = document.createElement('form');
    root.appendChild(shop_add_item_form);

    shop_add_item_form.innerHTML = `
        <div class="col w-25>
            <label for="item_name" class="form-label">Name</label><br>
            <input type="text" class="form-control w-25" name="item_name" id="item_name">
        </div>
        <div class="col w-25>
            <label for="item_price" class="form-label">Price</label><br>
            <input type="number" class="form-control w-25 mb-3" name="item_price" id="item_price">
        </div>
        <div class="col w-25>
            <label for="item_quantity" class="form-label">Quantity</label><br>
            <input type="number" class="form-control w-25 mb-3" name="item_quantity" id="item_quantity">
        </div>
    `;
    const shop_add_item_button = document.createElement('button');
    shop_add_item_button.innerText = "Add item to shop";
    shop_add_item_button.className = "btn btn-success mb-3 ml-3";
    shop_add_item_button.addEventListener('click', (e) => {
        e.preventDefault();
        const new_item = new Item(
            document.getElementById('item_name').value,
            document.getElementById('item_price').value
        )
        new_item.stock = parseInt(document.getElementById('item_quantity').value);
        shop.add_item(new_item);
        set_current_page("shop_add");
        shop_view();
    })
    shop_add_item_form.appendChild(shop_add_item_button);

    function make_config(item) {
        const formConfig = {
            attributes: {class: "btn-group"},
            data: [
                {attributes: {type: "number", value:1, id: `shop_buy_item_${item.id}`}},
                {attributes: {type: "submit", value: "Buy", class: "btn btn-primary"}, 
                            callBacks: [{event: "click", params: item, callback: buy}]}
            ]
        };
        return formConfig;
    };

    function buy(item) {
        const qty_elem = document.getElementById(`shop_buy_item_${item.id}`);
        const qty = parseInt(qty_elem.value);
        const stock = parseInt(item.stock);
        if (qty <= stock)
            shop.buy_item(item.id, qty);
        set_current_page("reload");
        shop_view();
    }

    const tableConfig = {
        attributes: {class: "table table-hover"},
        thead: {
            attributes: {style: "border: none;"},
            row_attributes: {class: "d-flex"},
            data: [
                {attributes: {scope: "col", class: "col-1"}, data: "Id"},
                {attributes: {scope: "col", class: "col-1"}, data: "Name"},
                {attributes: {scope: "col", class: "col-1"}, data: "Price"},
                {attributes: {scope: "col", class: "col-1"}, data: "Stock"},
                {attributes: {scope: "col", class: "col-1"}, data: ""},
            ]
        },
        tbody: {
            attributes: {},
            data: [],
        },
        tfoot: {},
    };

    for (const item_index in shop.items) {
        const item = shop.items[item_index];
        const rval = {
            attributes: {class: "d-flex"},
            data: [
                {attributes: {scope:"col", class:"col-1"}, data: item.id},
                {attributes: {scope:"col", class:"col-1"}, data: item.name},
                {attributes: {scope:"col", class:"col-1"}, data: item.price},
                {attributes: {scope:"col", class:"col-1"}, data: item.stock},
                {attributes: {scope:"col", class:"col-1"}, dataType: "form", data: make_config(item)},
            ]
        };
        tableConfig.tbody.data.push(rval);
    };

    const shop_table = new ElemGenerator(tableConfig).create_table();
    root.appendChild(shop_table);
}