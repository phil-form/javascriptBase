import { getAsHtmlRow, loadBasket, addToBasket, computeTotal, emptyBasket } from './basket.js'
import { products } from './product.js'

const basketTable = document.getElementById('basket_data');
const clearBasketBtn = document.getElementById('clear_basket');
clearBasketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emptyBasket();
    clearBasket();
});

populateProducts();
refreshBasket();

function populateProducts() {
    const productsTable = document.getElementById('products_data');
    
    for (const product of products) {
        productsTable.appendChild(product.getAsHtmlRow());
        const insertBtn = document.forms[`product-form-${product.name}`].elements['insert'];
        insertBtn.addEventListener( 'click', (e) => {
            e.preventDefault();
            const quantity = parseInt(document.forms[`product-form-${product.name}`].elements['quantity'].value);
            if (quantity > 0) {
                addToBasket(product, quantity);
                refreshBasket()
            } else {
                alert('Quantity must be positive !');
            }
        });
    }
}

function refreshBasket() {
    let basket = loadBasket();
    
    const totalInput = document.getElementById('total_input');
    totalInput.value = computeTotal(basket);

    clearBasket();
    for (let item of basket) {
        console.log(item);
        basketTable.appendChild(getAsHtmlRow(item));
    }

}

function clearBasket() {
    basketTable.innerHTML = ''
}
