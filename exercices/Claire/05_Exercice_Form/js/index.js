import { Address, generateHtml } from "./address.js"

/** @typedef form HTMLFormElement */
const form = document.forms['address_form']
const firstNameInput = form.elements['firstName']
const lastNameInput = form.elements['lastName']
const zipCodeInput = form.elements['zip']
const table = document.getElementById("table_data")

form.elements['send'].addEventListener("click", function(e) {
    e.preventDefault()
    let address = new Address(firstNameInput.value, lastNameInput.value, zipCodeInput.value)
    addData(address)
    refresh()
});

form.elements['autoComplete'].addEventListener("click", function(e) {
    e.preventDefault()
    autoComplete()
});

form.elements['clear'].addEventListener("click", function(e) {
    e.preventDefault()
    firstNameInput.value = null
    lastNameInput.value = null
    zipCodeInput.value = null
});

refresh()

function refresh() {
    clearTable()
    const addresses = getData()
    for(let address of addresses) {
        const tableEntry = generateHtml(address)
        table.appendChild(tableEntry)
    }
}

function autoComplete() {
    alert('autocomplete');
}

function clearTable() {
    for(let element of table.children) {
        element.remove()
    }
}

function getData() {
    const data = JSON.parse(localStorage.getItem('addresses'))
    return data != null ? data : []
}

function addData(address) {
    const data = getData()
    data.push(address)
    localStorage.setItem('addresses', JSON.stringify(data))
}

function clearData() {
    localStorage.removeItem('addresses')
}