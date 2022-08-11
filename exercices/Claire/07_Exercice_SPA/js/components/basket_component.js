import { Component } from "./generics/base_component.js";
import { TableComponent } from './generics/table.js'


export class BasketComponent extends Component {

    constructor(basketService) {
        super('basket-template');
        this.basketService = basketService;
        this.#bind();
    }

    #bind() {
        const data = this.basketService.items
        const tableConfig = {
            data: data,
            columns: [
                { columnName: 'Name', value: 'product.name' },
                { columnName: 'Price', value: 'product.price' },
                { columnName: 'Quantity', type: 'FORM' },
                { columnName: 'Actions', type: 'ACTIONS' },
            ],
            actions: [
                { actionName: 'Update quantity', actionCb: (data) =>
                    {
                        this.basketService.add(data.product, parseInt(data.form.get('quantity')), true)
                        document.dispatchEvent(new Event('basketView'))
                    },
                    hasForm: true,
                    buttonType: 3,
                },
                { actionName: 'Info', actionCb: (data) =>
                    {
                        document.dispatchEvent(new CustomEvent('infoProductView', {detail: data.product}))
                    },
                    buttonType: 4
                },
                { actionName: 'Delete', actionCb: (data) =>
                    {
                        this.basketService.delete(data.product)
                        document.dispatchEvent(new Event('basketView'))
                    },
                    buttonType: 5
                },
            ],
            form: {
                formName: 'itemForm',
                formIdValue: 'name',
                formFields: [
                    { fieldName: 'quantity', value: 'quantity', type: 'number' }
                ]
            }
        }
    
        const table = new TableComponent(tableConfig);
        const itemTable = this.root.getElementById('table-basket');
        itemTable.innerHTML = ''
        itemTable.appendChild(table.html);
    
        this.root.getElementById('total-basket').innerText = this.basketService.total()
    }

}
customElements.define('basket-list', BasketComponent);