const products = [
    {name: 'Chair', price: 25},
    {name: 'Table', price: 250},
    {name: 'Cupboard', price: 130}
];

document.addEventListener('DOMContentLoaded', () => {
    const basketTable = document.querySelector('table#basket-table-id tbody');
    const totalPriceSpan = document.querySelector('span#total-price-id');
    const productsTable = document.querySelector('table#product-table-id tbody');

    const resetBtn = document.querySelector('button#reset-basket-id');
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();

        resetBasket();
        refreshBasket(basketTable, totalPriceSpan);
    });
    
    listProducts(productsTable, totalPriceSpan, basketTable);
    refreshBasket(basketTable, totalPriceSpan);
});

const listProducts = (productsTable, totalPriceSpan, basketTable) => {
    products.forEach((product, index) => {
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = '0';

        const addToBasketBtn = document.createElement('button');
        addToBasketBtn.innerHTML = 'Add to basket';
        addToBasketBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let quantity = parseInt(quantityInput.value);
            addToBasket(index, quantity);
            refreshBasket(basketTable, totalPriceSpan);
        });

        const newRow = productsTable.insertRow();

        const nameCell = newRow.insertCell();
        nameCell.innerHTML = product.name;
        const priceCell = newRow.insertCell();
        priceCell.innerHTML = product.price;
        const quantityCell = newRow.insertCell();
        quantityCell.appendChild(quantityInput);
        const actionCell = newRow.insertCell();
        actionCell.appendChild(addToBasketBtn);

        totalPriceSpan.innerHTML = '0';
    });
};

const addToBasket = (index, quantity) => {
    let basket = localStorage.getItem('basket');
    basket = basket != null ? JSON.parse(basket) : [];

    let product = products[index];
    let price = quantity * product.price;

    let basketItem = {
        name: product.name,
        quantity: quantity,
        price: price
    };

    basket.push(basketItem);

    localStorage.setItem('basket', JSON.stringify(basket));
};

const refreshBasket = (basketTable, totalPriceSpan) => {
    basketTable.innerHTML = '';

    let basket = localStorage.getItem('basket');
    basket = basket != null ? JSON.parse(basket) : [];
    
    let totalPrice = 0;

    basket.forEach((item) => {

        const newRow = basketTable.insertRow();

        const nameCell = newRow.insertCell();
        nameCell.innerHTML = item.name;
        const quantityCell = newRow.insertCell();
        quantityCell.innerHTML = item.price;
        const priceCell = newRow.insertCell();
        priceCell.innerHTML = item.price;

        totalPrice += parseInt(item.price);
    });

    totalPriceSpan.innerHTML = totalPrice;
};

const resetBasket = () => {
    localStorage.clear();
};