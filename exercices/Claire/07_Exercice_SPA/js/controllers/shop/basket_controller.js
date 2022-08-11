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
                    basket.add(data.product, parseInt(data.form.get('quantity')), true)
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
                    basket.delete(data.product)
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
    const itemTable = document.getElementById('table-basket');
    itemTable.innerHTML = ''
    itemTable.appendChild(table.html);

    document.getElementById('total-basket').innerText = basket.total()
}