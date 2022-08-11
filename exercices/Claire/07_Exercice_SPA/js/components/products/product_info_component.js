
import { routeTo } from "../../app.js";
import { Component } from "../generics/base_component.js";


export class ProductInfoComponent extends Component {

    constructor(productService, basketService, product) {
        super('product-info-template');
        this.productService = productService;
        this.basketService = basketService;
        this.product = product;
        this.#bind();
    }

    #bind() {
        this.root.getElementById('info-product-name').innerText = this.product.name;
        this.root.getElementById('info-product-price').innerText = this.product.price;
    
        const addBtn = this.root.getElementById('btn-product-info-add-basket');
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.basketService.add(this.product, 1);
            routeTo('basket');
        });
        
        const editBtn = this.root.getElementById('btn-product-info-edit');
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            routeTo('product-edit', this.product);
        });

        const deleteBtn = this.root.getElementById('btn-product-info-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.productService.delete(this.product);
            routeTo('product-list');
        });
    }

}
customElements.define('product-info', ProductInfoComponent);