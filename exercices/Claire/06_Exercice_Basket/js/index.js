import { getAsHtmlRow, loadBasket, addToBasket, computeTotal, emptyBasket } from './basket.js'
import { products, addProduct, deleteProduct } from './product.js'

const basketTable = document.getElementById('basket_data');
const productsTable = document.getElementById('products_data');

const clearBasketBtn = document.getElementById('clear_basket');
clearBasketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emptyBasket();
    refreshBasket();
});

const newProductForm = document.getElementById('product-form');
newProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProduct(e.target['product-name'].value, parseInt(e.target['product-price'].value));
    refreshProducts();
    newProductForm.reset();
});

refreshProducts();
refreshBasket();

function refreshProducts() {
    clearProducts();
    for (const productName in products) {
        productsTable.appendChild(products[productName].getAsHtmlRow());
        const insertBtn = document.forms[`product-form-${productName}`].elements['insert'];
        insertBtn.addEventListener( 'click', (e) => {
            e.preventDefault();
            const quantity = parseInt(document.forms[`product-form-${productName}`].elements['quantity'].value);
            if (quantity > 0) {
                addToBasket(product, quantity);
                refreshBasket()
            } else {
                alert('Quantity must be positive !');
            }
        });
        const deleteBtn = document.forms[`product-form-${productName}`].elements['delete'];
        deleteBtn.addEventListener( 'click', (e) => {
            e.preventDefault();
            deleteProduct(productName);
            refreshProducts();
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
    basketTable.innerHTML = '';
}

function clearProducts() {
    productsTable.innerHTML = '';
}
