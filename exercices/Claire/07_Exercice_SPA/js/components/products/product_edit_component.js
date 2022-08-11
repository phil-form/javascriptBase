import { Component } from "../generics/base_component.js";


export class ProductEditComponent extends Component {

    constructor(productService, product=null) {
        super('product-edit-template');
        this.productService = productService;
        this.product = product;
        this.#bind();
    }

    #bind() {
        const inputName = this.root.getElementById('input-product-edit-name');
        const inputPrice = this.root.getElementById('input-product-edit-price');

        if (this.product) {
            inputName.value = this.product.name;
            inputPrice.value = this.product.price;
        }
        
        const btnSave = this.root.getElementById('btn-product-edit-save');
        btnSave.addEventListener('click', (e) => {
            e.preventDefault();
            const name = inputName.value;
            const price = inputPrice.value;
            const product = this.productService.addOrUpdate(name, price);
            document.dispatchEvent(new CustomEvent('infoProductView', {detail: product}));
        })
        
        const btnCancel = this.root.getElementById('btn-product-edit-cancel');
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            document.dispatchEvent(new CustomEvent('shopView'));
        })

    }
}
customElements.define('product-edit', ProductEditComponent);