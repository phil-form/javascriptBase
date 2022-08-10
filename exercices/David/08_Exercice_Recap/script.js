
class User {
    lastname = "";
    firstname = "";
    email = "";
    constructor(lastname, firstname, email) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
    };
    
    add_item(item) {
        const index = this.basket.findIndex((e) => e.name === item.name);
        if (index === -1)
            this.basket.push(item);
        else
            this.basket[index].qty += parseInt(item.qty);
        save();
    }
};

class Item {
    id = -1;
    name = "";
    price = "";
    
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        if (id)
            this.id = id;
        else
            this.id = shop.get_existing_or_new_id(this.name);
    }
    
}

class Shop {
    items = {};
    
    constructor() {
        this.items = sessionStorage.getItem('shop') ? JSON.parse(sessionStorage.getItem('shop')) : {};
    }
    
    add_item(item) {
        const update = this.get(item.id);
        if (update) {
            if (this.items[update].stock)
                this.items[update].stock += parseInt(item.qty);
            else
                this.items[update].stock = parseInt(item.qty);
        }
        else {
            this.items[item.id] = item;
            this.items[item.id].stock = parseInt(item.qty);
        }
        save();
    }

    buy_item(item) {
        // console.log(`shop ${this.items[item]}`);
        // console.log(basket.items[item]);
        basket.add_item(this.items[item]);
        //console.log(basket.items[item]);
    }

    get(key) {
        for (let search in this.items)
            if (search === key)
                return search
        return null;
    }

    get_existing_or_new_id(item_name) {
        if (Object.keys(this.items).length === 0)
            return 1;

        let max = -1;
        for (let key in this.items) {
            if (this.items[key].name === item_name)
                return key;
            if (key > max)
                max = key;
        }
        return max === -1 ? 1 : ++max;
    }
}

class Basket {
    items = {}
    
    constructor() {
        this.items = sessionStorage.getItem('basket') ? JSON.parse(sessionStorage.getItem('basket')) : {};
    }

    add_item(item) {
        const update = this.get(item.id);
        if (update) {
            if (this.items[update].qty)
                this.items[update].qty += parseInt(item.qty);
            else
                this.items[update].qty = parseInt(item.qty);
        }
        else {
            this.items[item.id] = item;
            this.items[item.id].qty = parseInt(item.qty);
        }
        save();
    }

    get(key) {
        console.log('start');
        console.log(this.items);
        for (let search in this.items) {
            console.log('ok');
            console.log(search);
            // if (search === key)
            //     return search
        }
        console.log('wtf');
        return null;
    }

    compute_total() {
        let total = 0;
        for (let item in this.items) {

        }
    }
}


function load_users() {
    const stored_users = sessionStorage.getItem('users');
    if (!stored_users) {
        users = [];
        save();
    } else {
        users = JSON.parse(stored_users);
    }
}

function list_view() {
    if (current_page === "list_page")
        return
    current_page = "list_page";
    nav_bar();
    clear_root();
    
    const users_table = document.createElement('table');
    users_table.className = "table table-hover";
    root.appendChild(users_table);

    const thead = document.createElement('thead');
    thead.style.border = "none";
    users_table.appendChild(thead);
    
    //header
    const tr = thead.insertRow();
    tr.className = "d-flex";
    
    const id = document.createElement('th');
    id.innerText = "#";
    id.setAttribute("scope", "col");
    id.className = "col-1";
    tr.appendChild(id);
    
    const lastname = document.createElement('th');
    lastname.innerText = "Last Name";
    lastname.setAttribute("scope", "col");
    lastname.className = "col-1";
    tr.appendChild(lastname);
    
    const firstname = document.createElement('th');
    firstname.innerText = "First Name";
    firstname.setAttribute("scope", "col");
    firstname.className = "col-1";
    tr.appendChild(firstname);
    
    const email = document.createElement('th');
    email.innerText = "E-mail";
    email.setAttribute("scope", "col");
    email.className = "col-3";
    tr.appendChild(email);
    
    //body
    const tbody = document.createElement('tbody');
    users_table.className = "table table-hover";
    users_table.appendChild(tbody);
    let id_counter = 1;
    
    for (const user of users) {
        const row = tbody.insertRow();
        row.className = "d-flex";
        
        const id = document.createElement('th');
        id.innerText = id_counter++;
        id.setAttribute("scope", "row");
        id.className = "col-1";
        row.appendChild(id);
        
        const lastname = row.insertCell();
        lastname.innerText = user.lastname;
        lastname.className = "col-1";
        const firstname = row.insertCell();
        firstname.innerText = user.firstname;
        firstname.className = "col-1";
        const email = row.insertCell();
        email.innerText = user.email;
        email.className = "col-2";

        const action = row.insertCell();
        
        const action_form = document.createElement('form');
        action_form.className = "btn-group";
        action.appendChild(action_form);
        
        const info = document.createElement('input');
        info.type = 'submit';
        info.value = 'info';
        info.className = "btn btn-outline-primary";
        action_form.appendChild(info);
        
        const edit = document.createElement('input');
        edit.type = 'submit';
        edit.value = 'edit';
        edit.className = "btn btn-outline-success";
        action_form.appendChild(edit);
        
        const remove = document.createElement('input');
        remove.type = 'submit';
        remove.value = 'X';
        remove.className = "btn";
        remove.style.fontWeight = "bold";
        remove.style.color = "red";
        action_form.appendChild(remove);
        
        info.addEventListener('click', (e) => {
            e.preventDefault();
            info_page(user);
        })
        edit.addEventListener('click', (e) => {
            e.preventDefault();
            edit_page(user);
        })
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            my_remove(user);
        })
    };
};

function register_view() {
    if (current_page === "register_page")
    return
    current_page = "register_page";
    nav_bar();
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

function edit_page(user) {
    if (current_page === "edit_page")
    return
    current_page = "edit_page";
    nav_bar();
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

function info_page(user) {
    if (current_page === "info_page")
    return
    current_page = "info_page";
    nav_bar();
    clear_root();
    
    const elem = document.createElement('p');
    elem.className = "ml-3"
    root.appendChild(elem);
    
    const lastname = document.createElement('span');
    lastname.innerText = `${user.lastname} `;
    elem.appendChild(lastname);

    const firstname = document.createElement('span');
    firstname.innerText = `${user.firstname} `;
    elem.appendChild(firstname);
    
    const email = document.createElement('span');
    email.innerText = `${user.email} `;
    elem.appendChild(email);
    
    const edit = document.createElement('button');
    edit.className = "btn btn-success ml-3";
    edit.innerText = "edit";
    root.appendChild(edit);
    
    edit.addEventListener('click', (e) => {
        e.preventDefault();
        edit_page(user);
    });
};

function my_remove(user) {
    current_page = "remove";
    users.pop(user);
    save();
    list_view();
};

function nav_bar() {
    while (nav.firstChild)
        nav.removeChild(nav.firstChild);
    
    const nav_bar = document.createElement('form');
    nav.appendChild(nav_bar);
    
    const create_user_button = document.createElement('button');
    create_user_button.innerText = 'Register';
    create_user_button.className = "btn btn-link";
    nav_bar.appendChild(create_user_button);
    
    const list_users_button = document.createElement('button');
    list_users_button.innerText = 'Home';
    list_users_button.className = "btn btn-link";
    nav_bar.appendChild(list_users_button);

    const shop_button = document.createElement('button');
    shop_button.innerText = 'Shop';
    shop_button.className = "btn btn-link";
    nav_bar.appendChild(shop_button);

    const basket_button = document.createElement('button');
    basket_button.innerText = 'Basket';
    basket_button.className = "btn btn-link";
    nav_bar.appendChild(basket_button);
    
    create_user_button.addEventListener('click', (e) => {
        e.preventDefault();
        register_view();
    });
    
    list_users_button.addEventListener('click', (e) => {
        e.preventDefault();
        list_view();
    })

    shop_button.addEventListener('click', (e) => {
        e.preventDefault();
        shop_page();
    })

    basket_button.addEventListener('click', (e) => {
        e.preventDefault();
        basket_page();
    })
};

function basket_page() {
    if (current_page === "basket_page")
        return
    current_page = "basket_page";
    nav_bar();
    clear_root();
};

function shop_page() {
    if (current_page === "shop_page")
        return
    current_page = "shop_page";
    nav_bar();
    clear_root();

    const add_item_form = document.createElement('form');
    root.appendChild(add_item_form);

    add_item_form.innerHTML = `
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
    const add_item_button = document.createElement('button');
    add_item_button.innerText = "Add item to shop";
    add_item_button.className = "btn btn-success mb-3 ml-3";
    add_item_button.addEventListener('click', (e) => {
        e.preventDefault();
        const new_item = new Item(
            document.getElementById('item_name').value,
            document.getElementById('item_price').value
        )
        new_item.qty = parseInt(document.getElementById('item_quantity').value);
        shop.add_item(new_item);
        current_page = "shop_add";
        shop_page();
    })
    add_item_form.appendChild(add_item_button);

    const shop_table = document.createElement('table');
    shop_table.className = "table table-hover";
    root.appendChild(shop_table);

    //header
    shop_table.innerHTML = `
        <thead style="border: none">
            <tr class="d-flex">
                <div class="d-flex justify-content-center">
                    <th scope="col" class="col-1">Id</th>
                    <th scope="col" class="col-1">Name</th>
                    <th scope="col" class="col-1">Price</th>
                    <th scope="col" class="col-1">Stock</th>
                    <th scope="col" class="col-1"></th>
                </div>
            </tr>
        </thead>
    `;

    //body
    const tbody = document.createElement('tbody');
    shop_table.appendChild(tbody);

    for (const key in shop.items) {
        const elem = shop.items[key]
        tbody.innerHTML += `
            <tr class="d-flex" id="shop_items_row_${key}">
                <th scope="col" class="col-1">${elem.id}</th>
                <td scope="col" class="col-1">${elem.name}</td>
                <td scope="col" class="col-1">${elem.price}</td>
                <td scope="col" class="col-1" id="shop_buy_stock_${key}">${elem.stock}</td>
                <td>
                    <form class="btn-group">
                        <input type="number" value="1" id="shop_buy_qty_${key}">
                        <input type="submit" value="Buy" class="btn btn-primary" id="shop_buy_btn_${key}">
                        </form>
                    <input type="submit" value="X" class="btn" style="font-weight: bold; color: red;" id="shop_delete_item_${key}">
                </td>
            </tr>
        `

        const shop_delete_button = document.getElementById(`shop_delete_item_${key}`);
        shop_delete_button.addEventListener('click', (e) => {
            e.preventDefault();
            delete shop.items[key];
            save();
            current_page = "shop_delete";
            shop_page();
        });

        const shop_buy_btn = document.getElementById(`shop_buy_btn_${key}`);
        shop_buy_btn.addEventListener('click', (e) => {
            e.preventDefault();
            const qty = parseInt(document.getElementById(`shop_buy_qty_${key}`).value);
            const stock = parseInt(document.getElementById(`shop_buy_stock_${key}`).innerText);
            if (qty <= stock) {
                shop.buy_item(key);
            } else {
                current_page = "reload";
                shop_page();
            }
        })
    }
}

function clear_root() {
    while (root.firstChild)
    root.removeChild(root.firstChild);
};

function save() {
    sessionStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('shop', JSON.stringify(shop.items));
}

const users  = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : [];
const shop   = new Shop();
const basket = new Basket();
const root   = document.getElementById("root");
const nav    = document.getElementById("nav_bar");

let current_page = "";



function create_table(tableConfig) {
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const thead_tr = thead.insertRow();
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);   

    for (let columnName in tableConfig.thead) {
        const th = document.createElement('th');
        th.scope = "col";
        th.className = tableConfig.thead[columnName] !== "id" ? "col-1" : "";
        th.innerText = tableConfig.thead[columnName];
        thead_tr.appendChild(th);
    }

    for (let row in tableConfig.tbody) {
        const tr = tbody.insertRow();
        tr.className = "d-flex";
        for (let item in tableConfig.tbody[row]) {
            const data = tr.insertCell();
            data.scope = "row";

            data.className = item !== "id" ? "col-1" : "";
            data.innerText = tableConfig.tbody[row][item];
        }
    }


    //style
    table.className = "table table-hover";
    thead.style = "border: none;"
    thead_tr.className = "d-flex";
    return table;
    // const test_config = {
    //     thead: ["id", "Name", "Price", ""],
    //     tbody: [
    //     ]
    // }
}

shop_page();