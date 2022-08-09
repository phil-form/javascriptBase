export class Address {
    constructor(firstName, lastName, zip) {
        this.firstName = firstName
        this.lastName = lastName
        this.zip = zip // [1000, 10 000]
    }
}

export function generateHtml(addresse) {
    const tr = document.createElement("tr")
    const tdFirstName = document.createElement("td")
    tdFirstName.innerText = addresse.firstName
    tr.appendChild(tdFirstName)
    const tdLastName = document.createElement("td")
    tdLastName.innerText = addresse.lastName
    tr.appendChild(tdLastName)
    const tdZip = document.createElement("td")
    tdZip.innerText = addresse.zip
    tr.appendChild(tdZip)
    return tr
}