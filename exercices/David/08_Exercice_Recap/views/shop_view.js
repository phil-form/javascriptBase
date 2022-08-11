import { clear_root} from "../utils.js"
import { current_page, set_current_page } from "../script.js";
import { shop, save } from "../script.js";
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

    const shop_table = document.createElement('table');
    shop_table.className = "table table-hover";
    root.appendChild(shop_table);

    //header
    shop_table.innerHTML = `
        <thead style="border: none">
            <tr class="d-flex">
                <th scope="col" class="col-1">Id</th>
                <th scope="col" class="col-1">Name</th>
                <th scope="col" class="col-1">Price</th>
                <th scope="col" class="col-1">Stock</th>
                <th scope="col" class="col-1"></th>
            </tr>
        </thead>
    `;

    //body
    const tbody = document.createElement('tbody');
    shop_table.appendChild(tbody);

    for (const key in shop.items) {
        const elem = shop.items[key];

        const tr = document.createElement('tr');
        tr.className = 'd-flex';
        tbody.appendChild(tr);

        const id = document.createElement('th');
        id.scope = 'col';
        id.className = "col-1";
        id.innerText = elem.id;
        tr.appendChild(id);

        const name     = document.createElement('td');
        name.scope     = 'col';
        name.className = "col-1";
        name.innerText = elem.name;
        tr.appendChild(name);

        const price     = document.createElement('td');
        price.scope     = 'col';
        price.className = "col-1";
        price.innerText = elem.price;
        tr.appendChild(price);

        const stock     = document.createElement('td');
        stock.scope     = 'col';
        stock.className = "col-1";
        stock.innerText = elem.stock;
        tr.appendChild(stock);

        const td = document.createElement('td');
        stock.scope     = 'col';
        stock.className = "col-1";
        tr.appendChild(td);

        const shop_buy_item_form = document.createElement('form');
        shop_buy_item_form.className = "btn-group";
        td.appendChild(shop_buy_item_form);

        const shop_buy_item_qty = document.createElement('input');
        shop_buy_item_qty.type  = 'number';
        shop_buy_item_qty.value = '1';
        shop_buy_item_form.appendChild(shop_buy_item_qty);

        const shop_buy_item_btn =  document.createElement('input');
        shop_buy_item_btn.type  = 'submit';
        shop_buy_item_btn.value = 'Buy';
        shop_buy_item_btn.className = 'btn btn-primary';
        shop_buy_item_form.appendChild(shop_buy_item_btn);

        const shop_delete_item_btn = document.createElement('input');
        shop_delete_item_btn.type  = 'submit';
        shop_delete_item_btn.value = 'X';
        shop_delete_item_btn.className = 'btn';
        shop_delete_item_btn.style = 'font-weight: bold; color: red;';
        td.appendChild(shop_delete_item_btn);

        shop_delete_item_btn.addEventListener('click', (e) => {
            e.preventDefault();
            delete shop.items[key];
            save();
            set_current_page("shop_delete");
            shop_view();
        });

        shop_buy_item_btn.addEventListener('click', (e) => {
            e.preventDefault();
            const qty = parseInt(shop_buy_item_qty.value);
            const stock = parseInt(elem.stock);
            if (qty <= stock)
                shop.buy_item(key, qty);
            set_current_page("reload");
            shop_view();
        })
    }
}