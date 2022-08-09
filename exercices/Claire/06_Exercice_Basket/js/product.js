

export class Product {
    
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getAsHtmlRow() {
        const tr = document.createElement('tr');
        
        const cellName = tr.insertCell();
        const cellPrice = tr.insertCell();
        const cellForm = tr.insertCell();
        cellName.innerText = this.name;
        cellPrice.innerText = this.price;
        
        const form = document.createElement('form');
        form.name = `product-form-${this.name}`;
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.name = 'quantity';
        qtyInput.value = 0;
        qtyInput.min = 0;
        form.appendChild(qtyInput);
        const insertBtn = document.createElement('input');
        insertBtn.type = 'submit';
        insertBtn.name = 'insert';
        insertBtn.value = 'Ajouter au panier';
        form.appendChild(insertBtn);
        cellForm.appendChild(form);

        return tr;
    }

}

export const products = [
    new Product('Chaise', 25),
    new Product('Table', 150),
    new Product('Meuble TV', 250)
];