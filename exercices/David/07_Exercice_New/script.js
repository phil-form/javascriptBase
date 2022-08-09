const itemsTable = document.getElementById('items_table');
const basketTable = document.getElementById('basket_table');
const basketTBody = document.getElementById('basketBody');
const itemTBody = document.getElementById('itemTBody');
const priceSpan = document.getElementById('price');
const addItemFormButton = document.getElementById('add_item_form_button');

class BasketItem
{
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }

    getAsTrElement(tr)
    {
        const nameTd = tr.insertCell();
        const priceTd = tr.insertCell();
        const qtyTd = tr.insertCell();
        const actionTd = tr.insertCell();

        nameTd.innerText = this.item.name;
        priceTd.innerText = this.item.price;
        qtyTd.innerText = this.quantity;

        const remove = document.createElement('input');
        actionTd.appendChild(remove);
        remove.type = 'submit';
        remove.value = 'remove';

        remove.addEventListener('click', (e) => {
            delete basket[tr.children[0].innerHTML];
            sessionStorage.setItem('basket', JSON.stringify(basket));
            render();
        });
    }
}

let tmp = sessionStorage.getItem('basket');
let basket = null;
if (tmp)
    basket = JSON.parse(tmp);
else
    basket = basket ? basket : {};

for(const index in basket)
{
    basket[index] = new BasketItem(basket[index].item, basket[index].quantity);
}

class Item
{
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getAsTrElement(tr)
    {
        const nameTd = tr.insertCell();
        const priceTd = tr.insertCell();
        const actionsTd = tr.insertCell();

        nameTd.innerText = this.name;
        priceTd.innerText = this.price;

        const addToBskForm = document.createElement('form');
        actionsTd.appendChild(addToBskForm);

        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.value = 1;
        addToBskForm.appendChild(qtyInput);

        const submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = "Ajouter au panier";
        addToBskForm.appendChild(submitBtn);

        submitBtn.addEventListener('click', (e) =>
        {
            e.preventDefault();

            if(basket[this.name])
            {
                basket[this.name].quantity += parseInt(qtyInput.value);
            } else
            {
                basket[this.name] = new BasketItem(this, parseInt(qtyInput.value));
            }

            sessionStorage.setItem('basket', JSON.stringify(basket));
            render();
        });
    }
}

let items = [
    new Item("Chaise", 25),
    new Item("Table", 150),
    new Item("Meuble TV", 250),
];

function renderBasket()
{
    while(basketTBody.firstChild)
    {
        basketTBody.removeChild(basketTBody.firstChild);
    }

    let totalPrice = 0;
    for(const bsk in basket)
    {
        const tr = document.createElement('tr');
        basketTBody.appendChild(tr);
        const item = basket[bsk];
        item.getAsTrElement(tr);
        totalPrice += item.item.price * item.quantity;
    }
    priceSpan.innerText = totalPrice;
}

function renderShop()
{
    while (itemTBody.firstChild) {
        itemTBody.removeChild(itemTBody.firstChild);
    }

    for (const item of items) {
        const tr = document.createElement('tr');
        itemTBody.appendChild(tr);
        item.getAsTrElement(tr);
    }
}

addItemFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    const item_name = document.getElementById('item_add_form_name').value;
    const item_price = document.getElementById('item_add_form_price').value;
    const new_item = new Item(item_name, item_price);
    items.push(new_item);
    render();
});

function render() {
    renderShop();
    renderBasket();
}

render();