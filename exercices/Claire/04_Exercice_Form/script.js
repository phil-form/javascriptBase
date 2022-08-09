
/**  */
class Address {
    constructor(firstName, lastName, zip) {
        this.firstName = firstName
        this.lastName = lastName
        this.zip = zip // [1000, 10 000]
    }

    generateHtml() {
        const tr = document.createElement("tr")
        const tdFirstName = document.createElement("td")
        tdFirstName.innerText = this.firstName
        tr.appendChild(tdFirstName)
        const tdLastName = document.createElement("td")
        tdLastName.innerText = this.lastName
        tr.appendChild(tdLastName)
        const tdZip = document.createElement("td")
        tdZip.innerText = this.zip
        tr.appendChild(tdZip)
        return tr
    }
}

/** @typedef addresses Address[] */
const addresses = [new Address("test", "test", 1234)]

/** @typedef form HTMLFormElement */
const form = document.forms['address_form']
const firstNameInput = form.elements['firstName']
const lastNameInput = form.elements['lastName']
const zipCodeInput = form.elements['zip']
const table = document.getElementById("table_data")

form.elements['send'].addEventListener("click", function(e) {
    e.preventDefault()
    let address = new Address(firstNameInput.value, lastNameInput.value, zipCodeInput.value)
    console.log(address)
    addresses.push(address)
    refresh()
});

form.elements['autoComplete'].addEventListener("click", function() {
    autoComplete()
});

form.elements['clear'].addEventListener("click", function() {
    firstNameInput.value = null
    lastNameInput.value = null
    zipCodeInput.value = null
});

refresh()

function refresh() {
    clearTable()
    for(let address of addresses) {
        const tableEntry = address.generateHtml()
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