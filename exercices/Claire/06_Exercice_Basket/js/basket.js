class BasketItem {

    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

}

export function getAsHtmlRow(basketItem) {
    const tr = document.createElement('tr');
    
    const cellName = tr.insertCell();
    const cellPrice = tr.insertCell();
    const cellQty = tr.insertCell();
    cellName.innerText = basketItem.product.name;
    cellPrice.innerText = basketItem.product.price;
    cellQty.innerText = basketItem.quantity;

    return tr;
}

export function loadBasket() {
    const basket = JSON.parse(localStorage.getItem('basket'));
    return basket ? basket : [];
}

export function addToBasket(product, quantity) {
    const basket = loadBasket();
    let found = false;
    for(let item of basket) {
        if(item.product.name == product.name) {
            item.quantity += 1;
            found = true;
        }
    }
    if(!found) {
        basket.push(new BasketItem(product, quantity));
    }
    localStorage.setItem('basket', JSON.stringify(basket))
}

export function emptyBasket() {
    localStorage.removeItem('basket');
}

export function computeTotal(basket) {
    let total = 0;
    for (let item of basket) {
        total += item.product.price * item.quantity;
    }
    return total;
}