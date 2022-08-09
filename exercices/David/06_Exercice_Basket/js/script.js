
class Product {
    name = "";
    price = 1;
    quantity = 1;

    constructor(name, price, quantity) {
        this.name  = name;
        this.price = price;
        this.quantity = quantity;
    }
};

class Basket {
    items = []

    add_item(product) {
        const index = this.items.findIndex((item) => item.name === product.name)
        if (index === -1) {
            this.items.push(product);
        }
        else {
            console.log(this.items[index].quantity);
            console.log(product.quantity);
            console.log(this.items[index]);
            console.log(typeof(this.items[index].quantity));
            this.items[index].quantity = this.items[index].quantity + product.quantity;
            
        }
        update_basket();
    }
}

function update_shop_table() {
    for (let item of shop_products) {
        const row       = shop_table.insertRow();
        const name      = row.insertCell();
        const price     = row.insertCell();
        const quantity  = row.insertCell();

        name.innerText = item.name;
        price.innerText = item.price;
        let qttyField = document.createElement('input');
        qttyField.type = 'number';
        qttyField.value = 1;
        quantity.appendChild(qttyField);

        let button = document.createElement('button');
        button.innerText = 'Add';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            item.quantity = qttyField.value;
            console.log(item.quantity);
            basket.add_item(item);
        });

        row.appendChild(button);
    }
};

function update_basket() {
    let total = 0;
    basket_table.innerHTML = '';
    for (let item of basket.items) {
        const row      = basket_table.insertRow();
        const name     = row.insertCell();
        const price    = row.insertCell();
        const quantity = row.insertCell();

        name.innerText  = item.name;
        price.innerText = item.price;
        quantity.innerHTML = item.quantity;
        
        total += (price * quantity);
    }
    total_field.innerText = `total: ${total}`;
};

// function load_basket() {
//     let tmp = localStorage.getItem('basket');
//     if (!tmp) {
//         localStorage.setItem('basket', '');
//         basket = [];
//     }
//     basket = JSON.parse(tmp);
// }

// function update_basket() {
//     for (let item of basket) {

//         const row = basket_table.insertRow();
//         const name = row.insertCell();
//         const price = row.insertCell();
//         const quantity = row.insertCell()
//         name.innerText = item.name;
//         price.innerText = item.price;
//         quantity.innerText = item.quantity;
//     }

// }

// function add_to_basket(elem) {
//     console.log('coucou');
//     let index = basket.findIndex((e) => e.name === elem.name);
//     if (index != -1) {
//         basket[index].quantity += elem.quantity;
//     } else {
//         basket.push(elem);
//     }
//     update_basket();
// }

// init_shop();

const shop_table   = document.getElementById('shop_table');
const shop_products = [
    new Product("Table", 150),
    new Product("Chaise", 25),
    new Product("Meuble", 250),
]

const basket_table = document.getElementById('basket_table');
const basket = new Basket();

const total_field = document.getElementById('total');

update_shop_table();
update_basket();