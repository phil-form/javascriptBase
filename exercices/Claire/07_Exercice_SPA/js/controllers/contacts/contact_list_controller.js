import { contactList } from '../../models/contact.js'
import { TableComponent } from '../../components/table.js'


const contacts = contactList.contacts
const newBtn = document.getElementById('btn-contact-list-new')
newBtn.addEventListener('click', (e) => {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('editContactView'))
})

export function renderListData() {
    const data = contacts
    const tableConfig = {
        data: data,
        columns: [
            { columnName: '#', value: 'id' },
            { columnName: 'First name', value: 'firstname' },
            { columnName: 'Last name', value: 'lastname' },
            { columnName: 'Email', value: 'email' },
            { columnName: 'Actions', type: 'ACTIONS' },
        ],
        actions: [
            { actionName: 'Info', actionCb: (data) => {
                    document.dispatchEvent(new CustomEvent('infoContactView', {detail: data}))
                },
                buttonType: 4
            },
            { actionName: 'Edit', actionCb: (data) => {
                    document.dispatchEvent(new CustomEvent('editContactView', {detail: data}))
                },
                buttonType: 1
            },
            { actionName: 'Delete', actionCb: (data) => {
                    contactList.delete(data)
                    renderListData()
                },
                buttonType: 5
            },
        ]
    }

    const table = new TableComponent(tableConfig);
    const itemTable = document.getElementById('data-contacts');
    itemTable.innerHTML = ''
    itemTable.appendChild(table.html);
}
