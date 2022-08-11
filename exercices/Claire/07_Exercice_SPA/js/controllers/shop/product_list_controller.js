import { basket } from "../../models/basket.js"
import { catalog } from "../../models/product.js"
import { TableComponent } from "../../components/table.js"

const products = catalog.products

const newBtn = document.getElementById('btn-product-new')
newBtn.addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('editProductView'))
})

export function renderProductData() {

    const data = products
    const tableConfig = {
        data: data,
        columns: [
            { columnName: 'Name', value: 'name' },
            { columnName: 'Price', value: 'price' },
            { columnName: 'Actions', type: 'ACTIONS' },
        ],
        actions: [
            { actionName: 'Add to basket', actionCb: (data) => {
                    basket.add(data.product, 1)
                    document.dispatchEvent(new Event('basketView'))
                },
                buttonType: 3,
            },
            { actionName: 'Info', actionCb: (data) => {
                    document.dispatchEvent(new CustomEvent('infoProductView', {detail: data.product}))
                },
                buttonType: 4
            },
            { actionName: 'Edit', actionCb: (data) => {
                    document.dispatchEvent(new CustomEvent('editProductView', {detail: data.product}))
                },
                buttonType: 1
            },
            { actionName: 'Delete', actionCb: (data) => {
                    catalog.delete(data.product)
                    renderListData()
                },
                buttonType: 5
            },
        ]
    }

    const table = new TableComponent(tableConfig);
    const itemTable = document.getElementById('data-products');
    itemTable.innerHTML = ''
    itemTable.appendChild(table.html);
}