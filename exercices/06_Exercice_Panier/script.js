const itemsTable = document.getElementById('items_table');
const basketTable = document.getElementById('basket_table');
const basketTBody = document.getElementById('basketBody');
const itemTBody = document.getElementById('itemTBody');
const priceSpan = document.getElementById('price');
const itemForm = document.forms['itemForm'];
const addItemBtn = document.getElementById('addItemBtn');

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
        const actTd = tr.insertCell();

        const removeFromBasket = document.createElement('input');
        removeFromBasket.type = 'submit'
        removeFromBasket.value = "Retirer du panier";
        actTd.appendChild(removeFromBasket);

        removeFromBasket.addEventListener('click', (e) =>
        {
            e.preventDefault();

            delete basket[this.item.name];
            renderBasket();
        });

        nameTd.innerText = this.item.name;
        priceTd.innerText = this.item.price;
        qtyTd.innerText = this.quantity;
    }
}

let basket = JSON.parse(sessionStorage.getItem('basket'));
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

        const removeBtn = document.createElement('input');
        removeBtn.type = 'button';
        removeBtn.value = "Retirer l'article";
        addToBskForm.appendChild(removeBtn);

        removeBtn.addEventListener('click', (e) =>
        {
            e.preventDefault();

            const index = items.indexOf(this);
            if(index !== -1)
            {
                items.splice(index, 1);
                sessionStorage.setItem('items', JSON.stringify(items));

                if(basket[this.name])
                {
                    delete basket[this.name];
                    sessionStorage.setItem('basket', JSON.stringify(basket));
                    renderBasket();
                }

                renderItems();
            }
        });

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
            renderBasket();
        });
    }
}

let items = JSON.parse(sessionStorage.getItem('items'));
items = items ? items.map((item) =>
{
    return new Item(item.name, item.price);
}) : [];

renderItems();

function renderItems()
{
    while(itemTBody.firstChild)
    {
        itemTBody.removeChild(itemTBody.firstChild);
    }

    for(const itm of items)
    {
        const tr = document.createElement('tr');
        itemTBody.appendChild(tr);
        itm.getAsTrElement(tr);
    }
}


renderBasket();

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

addItemBtn.addEventListener('click', (e) =>
{
    e.preventDefault();
    const name = itemForm.name.value;
    const price = itemForm.price.value;
    items.push(new Item(name, price));
    sessionStorage.setItem('items', JSON.stringify(items));

    renderItems();
});
