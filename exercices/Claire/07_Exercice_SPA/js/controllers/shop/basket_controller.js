import { TableComponent } from '../../components/table.js';
import { basket } from '../../models/basket.js';


export function renderBasket() {
    const data = basket.items
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
                    console.log(data.product)
                    console.log(data.form.get('quantity'))
                    basket.add(data.product, parseInt(data.form.get('quantity')))
                    document.dispatchEvent(new Event('basketView'))
                },
                buttonType: 3,
            },
            { actionName: 'Details', actionCb: (data) =>
                {
                    document.dispatchEvent(new CustomEvent('infoProductView', {detail: data.product}))
                },
                buttonType: 1
            },
            { actionName: 'Remove', actionCb: (data) =>
                {
                    basket.delete(data.product)
                    document.dispatchEvent(new Event('basketView'))
                },
                buttonType: 2
            },
        ],
        form: {
            formName: 'itemForm',
            formIdValue: 'name',
            formFields: [
                // { fieldName: 'product', value: 'product', type: 'hidden' },
                { fieldName: 'quantity', value: 'quantity', type: 'number' }
            ]
        }
    }

    const table = new TableComponent(tableConfig);
    const itemTable = document.getElementById('table-basket');
    itemTable.innerHTML = ''
    itemTable.appendChild(table.html);

    document.getElementById('total-basket').innerText = basket.total()
}