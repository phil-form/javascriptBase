import { basket } from "../../models/basket.js"
import { catalog } from "../../models/product.js"


export function renderInfoProduct(product) {
    document.getElementById('info-product-name').innerText = product.name
    document.getElementById('info-product-price').innerText = product.price

    const addBtn = document.getElementById('btn-product-info-add-basket')
    addBtn.addEventListener('click', (e) => {
        e.preventDefault()
        basket.add(product, 1)
        document.dispatchEvent(new Event('basketView'))
    })
    
    const editBtn = document.getElementById('btn-product-info-edit')
    editBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.dispatchEvent(new CustomEvent('editProductView', {detail: product}))
    })
    const deleteBtn = document.getElementById('btn-product-info-delete')
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault()
        catalog.delete(product)
        document.dispatchEvent(new CustomEvent('shopView'))
    })
}