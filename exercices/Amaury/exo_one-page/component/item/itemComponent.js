import {getFromStorage, setToStorage} from '../../utilities/storage.js';
import BasketComponent from '../basket/basketComponent.js';

class ItemComponent {
    constructor(ref, name, price) {
        this.ref = ref;
        this.name = name;
        this.price = price;
    };

    toTableRow(container) {
        const itemRow = document.createElement('tr');

        const refTd = document.createElement('td');
        refTd.innerHTML = this.ref;
        
        const nameTd = document.createElement('td');
        nameTd.innerHTML = this.name;
        
        const priceTd = document.createElement('td');
        priceTd.innerHTML = this.price;
        
        const quantityTd = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 0;
        quantityInput.addEventListener('focus', (e) => {
            quantityInput.value = '';
        });

        quantityInput.addEventListener('blur', (e) => {
            if (quantityInput.value == '') {
                quantityInput.value = 0;
            };
        });
        quantityTd.appendChild(quantityInput);
        
        const actionsTd = document.createElement('td');
        const addToBasketBtn = document.createElement('button');
        addToBasketBtn.classList.add('btn', 'btn-secondary');
        addToBasketBtn.innerHTML = 'Add to basket';
        addToBasketBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let refNode = e.currentTarget.parentNode.parentNode.firstChild;
            let ref = refNode.innerText;
            let nameNode = refNode.nextSibling;
            let name = nameNode.innerText;
            let priceNode = nameNode.nextSibling;
            let price = priceNode.innerText;
            let quantity = priceNode.nextSibling.firstChild.value;
            
            let basketItem = {
                name: name,
                quantity: quantity,
                price: price
            };

            let basket = getFromStorage('basket');
            if (basket.length != 0) {
                basket[0].items[ref] = basketItem;
            } else {
                basket.push(new BasketComponent());
                basket[0].items[ref] = basketItem;
            };
            setToStorage('basket', basket);
        });

        actionsTd.appendChild(addToBasketBtn);
        
        itemRow.appendChild(refTd);
        itemRow.appendChild(nameTd);
        itemRow.appendChild(priceTd);
        itemRow.appendChild(quantityTd);
        itemRow.appendChild(actionsTd);
        
        container.appendChild(itemRow);
    };
};

export default ItemComponent;