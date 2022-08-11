import ItemComponent from './itemComponent.js';
import ItemFormComponent from './itemFormComponent.js';


class ItemsListComponent {
    constructor(items) {
        this.items = items;
    };

    toHTML(container) {
        container.innerHTML = '';

        const itemsTable = document.createElement('table');
        itemsTable.classList.add('table');

        const tHead = document.createElement('thead');
        const tBody = document.createElement('tbody');

        const refTh = document.createElement('th');
        refTh.innerHTML = '#ref';

        const nameTh = document.createElement('th');
        nameTh.innerHTML = 'Name';

        const priceTh = document.createElement('th');
        priceTh.innerHTML = 'Price';

        const quantityTh = document.createElement('th');
        quantityTh.innerHTML = 'Quantity';

        const actionsTh = document.createElement('th');
        actionsTh.innerHTML = 'Actions';

        tHead.appendChild(refTh);
        tHead.appendChild(nameTh);
        tHead.appendChild(priceTh);
        tHead.appendChild(quantityTh);
        tHead.appendChild(actionsTh);

        this.items.forEach(i => {
            let item = new ItemComponent(i.ref, i.name, i.price);
            item.toTableRow(tBody);
        });

        itemsTable.appendChild(tHead);
        itemsTable.appendChild(tBody);

        container.appendChild(itemsTable);
    };

    addCreateAction(container) {
        let createBtn = document.createElement('button');
        createBtn.classList.add('btn', 'btn-primary');
        createBtn.innerHTML = 'Create';

        createBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const container = document.getElementById('root');
            const itemForm = new ItemFormComponent();
            itemForm.toHTML(container);
        });

        container.appendChild(createBtn);
    };
};

export default ItemsListComponent;