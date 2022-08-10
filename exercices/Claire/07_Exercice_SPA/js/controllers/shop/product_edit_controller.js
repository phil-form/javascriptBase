import { catalog } from "../../models/product.js"

const form = document.forms['form-edit-product']
const inputName = document.getElementById('input-product-edit-name')
const inputPrice = document.getElementById('input-product-edit-price')

const btnSave = document.getElementById('btn-product-edit-save')
btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    const name = inputName.value
    const price = inputPrice.value
    const product = catalog.addOrUpdate(name, price)
    document.dispatchEvent(new CustomEvent('infoProductView', {detail: product}))
})

document.getElementById('btn-product-edit-cancel').addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('shopView'))
})

export function renderEditProduct(product) {
    form.reset()

    if (product) {
        inputName.value = product.name
        inputPrice.value = product.price
    }
}