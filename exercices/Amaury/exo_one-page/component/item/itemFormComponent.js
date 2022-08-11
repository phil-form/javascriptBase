import ItemComponent from "./itemComponent.js";
import {getFromStorage, setToStorage} from '../../utilities/storage.js';


class ItemFormComponent {
    constructor(item = null) {
        this.item = item;
    };

    toHTML(container) {
        container.innerHTML = '';

        const frm = document.createElement('form');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('mb-3', 'mt-3');
        const nameLabel = document.createElement('label');
        nameLabel.classList.add('form-label');
        nameLabel.innerHTML = 'Name';
        const nameInput = document.createElement('input');
        nameInput.classList.add('form-control');
        nameInput.type = 'text';
        nameInput.value = this.item ? this.item.name : '';
        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameInput);

        const priceDiv = document.createElement('div');
        priceDiv.classList.add('mb-3', 'mt-3');
        const priceLabel = document.createElement('label');
        priceLabel.classList.add('form-label');
        priceLabel.innerHTML = 'Price';
        const priceInput = document.createElement('input');
        priceInput.classList.add('form-control');
        priceInput.type = 'text';
        priceInput.value = this.item ? this.item.price : '';
        priceDiv.appendChild(priceLabel);
        priceDiv.appendChild(priceInput);

        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Save';
        submit.classList.add('btn', 'btn-primary', 'mt-3');
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            let ref = '#2022-' + nameInput.value[0] + Math.floor(Math.random() * 10000000);
            let newItem = new ItemComponent(ref, nameInput.value, priceInput.value);
            let items = getFromStorage('items');
            items.push(newItem);
            setToStorage('items', items);
        });

        frm.appendChild(nameDiv);
        frm.appendChild(priceDiv);
        frm.appendChild(submit);

        container.appendChild(frm);
    };
};

export default ItemFormComponent;