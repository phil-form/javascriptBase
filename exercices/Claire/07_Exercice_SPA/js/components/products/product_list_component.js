import { TableComponent } from '../generics/table.js'
import { Component } from "../generics/base_component.js";


export class ProductListComponent extends Component {

    constructor(productService, basketService) {
        super('product-list-template');
        this.productService = productService;
        this.basketService = basketService;
        this.#bind();
    }

    #bind() {
        const newBtn = this.root.getElementById('btn-product-new');
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.dispatchEvent(new CustomEvent('editProductView'));
        });

        const data = this.productService.products;
        const tableConfig = {
            data: data,
            columns: [
                { columnName: 'Name', value: 'name' },
                { columnName: 'Price', value: 'price' },
                { columnName: 'Actions', type: 'ACTIONS' },
            ],
            actions: [
                { actionName: 'Add to basket', actionCb: (data) => {
                        this.basketService.add(data, 1);
                        document.dispatchEvent(new Event('basketView'));
                    },
                    buttonType: 3,
                },
                { actionName: 'Info', actionCb: (data) => {
                        document.dispatchEvent(new CustomEvent('infoProductView', {detail: data}));
                    },
                    buttonType: 4
                },
                { actionName: 'Edit', actionCb: (data) => {
                        document.dispatchEvent(new CustomEvent('editProductView', {detail: data}));
                    },
                    buttonType: 1
                },
                { actionName: 'Delete', actionCb: (data) => {
                        this.productService.delete(data);
                        document.dispatchEvent(new Event('shopView'));
                    },
                    buttonType: 5
                },
            ]
        }
    
        const table = new TableComponent(tableConfig);
        const itemTable = this.root.getElementById('data-products');
        itemTable.innerHTML = '';
        itemTable.appendChild(table.html);
    }

}
customElements.define('product-list', ProductListComponent);