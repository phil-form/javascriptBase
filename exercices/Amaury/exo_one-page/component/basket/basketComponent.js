import {getFromStorage, setToStorage} from '../../utilities/storage.js';

class BasketComponent {
    constructor(items = {}) {
        this.user = null;
        this.closed = false;
        this.items = items;
    };

    removeItem(ref) {
        delete this.items[ref];
    };

    close() {
        this.closed = true;
    };

    toHTML(container) {
        container.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('table');

        const tHead = document.createElement('thead');
        const tBody = document.createElement('tbody');

        const refTh = document.createElement('th');
        refTh.innerHTML = '#ref';

        const nameTh = document.createElement('th');
        nameTh.innerHTML = 'Name';

        const quantityTh = document.createElement('th');
        quantityTh.innerHTML = 'Quantity';

        const priceTh = document.createElement('th');
        priceTh.innerHTML = 'Price';

        const actionsTh = document.createElement('th');
        actionsTh.innerHTML = 'Actions';

        tHead.appendChild(refTh);
        tHead.appendChild(nameTh);
        tHead.appendChild(quantityTh);
        tHead.appendChild(priceTh);
        tHead.appendChild(actionsTh);

        table.appendChild(tHead);
        table.appendChild(tBody);

        for (let ref in this.items) {
            const newRow = tBody.insertRow();

            const refCell = newRow.insertCell();
            refCell.innerHTML = ref;
            const nameCell = newRow.insertCell();
            nameCell.innerHTML = this.items[ref].name;
            const quantityCell = newRow.insertCell();
            quantityCell.innerHTML = this.items[ref].quantity;
            const priceCell = newRow.insertCell();
            priceCell.innerHTML = this.items[ref].price * this.items[ref].quantity;

            const removeFromBasketBtn = document.createElement('button');
            removeFromBasketBtn.classList.add('btn', 'btn-outline-danger');
            removeFromBasketBtn.innerHTML = 'Remove';
            removeFromBasketBtn.addEventListener('click', (e) => {
                e.preventDefault();

                let ref = e.currentTarget.parentNode.parentNode.firstChild.innerText;
                this.removeItem(ref);
                let basket = getFromStorage('basket');
                basket[0] = this;
                setToStorage('basket', basket);
            });

            const actionCell = newRow.insertCell();
            actionCell.appendChild(removeFromBasketBtn);
        };

        container.appendChild(table);
    };

    addTotalPrice(container) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.id = 'total-price-basket-id';
        p.innerHTML = 'Total price: ' + this.computeTotalPrice();

        div.appendChild(p);

        container.appendChild(div);
    };

    computeTotalPrice() {
        let total = 0;
        for (let ref in this.items) {
            total += this.items[ref].price * this.items[ref].quantity;
        };

        return total;
    };
};

export default BasketComponent;