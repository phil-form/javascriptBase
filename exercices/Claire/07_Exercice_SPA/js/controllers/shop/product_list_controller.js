import { basket } from "../../models/basket.js"
import { catalog } from "../../models/product.js"

const products = catalog.products

const productsTable = document.getElementById('data-products')
const newBtn = document.getElementById('btn-product-new')
newBtn.addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('editProductView'))
})

export function renderProductData() {
    productsTable.innerHTML = ''
    for(let i in products) {
        productsTable.appendChild(getAsHtmlRow(products[i]))
    }
}

function getAsHtmlRow(product) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <form>
                    <input type="button" class="btn btn-info" id="btn-products-info" value="Info">
                    <input type="button" class="btn btn-success" id="btn-products-add-basket" value="Add to basket">
                </form>
            </td>
            <td>
                <form>
                    <input type="button" class="btn btn-primary" id="btn-products-edit" value="Edit">
                    <input type="button" class="btn btn-danger" id="btn-products-delete" value="Delete">
                </form>
            </td>
        </tr>
    `
    
    const infoBtn = tr.querySelector('#btn-products-info')
    infoBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('infoProductView', {detail: product}))
    })

    const addBasketBtn = tr.querySelector('#btn-products-add-basket')
    addBasketBtn.addEventListener('click', (e) => {
        e.preventDefault()
        basket.add(product, 1)
    })
    
    const editBtn = tr.querySelector('#btn-products-edit')
    editBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('editProductView', {detail: product}))
    })

    const deleteBtn = tr.querySelector('#btn-products-delete')
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault()
        catalog.delete(product)
        renderListData()
    })

    return tr;
}