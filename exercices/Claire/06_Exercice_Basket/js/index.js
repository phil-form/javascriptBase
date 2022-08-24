import { Basket } from './basket.js'
import { products, addProduct, deleteProduct } from './product.js'

const basketTable = document.getElementById('basket_data');
const productsTable = document.getElementById('products_data');

let basket = new Basket();

const clearBasketBtn = document.getElementById('clear_basket');
clearBasketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    basket.empty();
    renderBasket();
});

const newProductForm = document.getElementById('product-form');
newProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProduct(e.target['product-name'].value, parseInt(e.target['product-price'].value));
    renderProducts();
    newProductForm.reset();
});

renderProducts();
renderBasket();

function renderProducts() {
    clearProductsView();
    for (const productName in products) {
        productsTable.appendChild(products[productName].getAsHtmlRow());
        const insertBtn = document.forms[`product-form-${productName}`].elements['insert'];
        insertBtn.addEventListener( 'click', (e) => {
            e.preventDefault();
            const quantity = parseInt(document.forms[`product-form-${productName}`].elements['quantity'].value);
            if (quantity > 0) {
                basket.add(products[productName], quantity);
                renderBasket()
            } else {
                alert('Quantity must be positive !');
            }
        });
        const deleteBtn = document.forms[`product-form-${productName}`].elements['delete'];
        deleteBtn.addEventListener( 'click', (e) => {
            e.preventDefault();
            deleteProduct(productName);
            renderProducts();
        });
    }
}

function renderBasket() {
    
    const totalInput = document.getElementById('total_input');
    totalInput.value = basket.total();

    clearBasketView();
    for (let item of basket.items) {
        basketTable.appendChild(item.getAsHtmlRow());
    }

}

function clearBasketView() {
    basketTable.innerHTML = '';
}

function clearProductsView() {
    productsTable.innerHTML = '';
}
