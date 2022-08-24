import { TableComponent } from '../generics/table.js'
import { Component } from "../generics/base_component.js";
import { routeTo } from '../../app.js';


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
            routeTo('product-edit');
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
                        routeTo('basket');
                    },
                    buttonType: 3,
                },
                { actionName: 'Info', actionCb: (data) => {
                        routeTo('product-info', data);
                    },
                    buttonType: 4
                },
                { actionName: 'Edit', actionCb: (data) => {
                        routeTo('product-edit', data);
                    },
                    buttonType: 1
                },
                { actionName: 'Delete', actionCb: (data) => {
                        this.productService.delete(data);
                        routeTo('product-list');
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