import { catalog } from "../../models/product.js"


export function renderInfoProduct(product) {
    document.getElementById('info-product-name').innerText = product.name
    document.getElementById('info-product-price').innerText = product.price
    
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