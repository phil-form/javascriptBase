import { TableComponent } from '../generics/table.js'
import { Component } from '../generics/base_component.js';
import { routeTo } from '../../app.js';

export class ContactListComponent extends Component {

    constructor(contactService) {
        super('contact-list-template');
        this.contactService = contactService;
        this.#bind();
    }

    #bind() {
        const newBtn = this.root.querySelector('#btn-contact-list-new');
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            routeTo('contact-edit');
        })

        const data = this.contactService.contacts;
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
                        routeTo('contact-info', data);
                    },
                    buttonType: 4
                },
                { actionName: 'Edit', actionCb: (data) => {
                    routeTo('contact-edit', data);
                    },
                    buttonType: 1
                },
                { actionName: 'Delete', actionCb: (data) => {
                        this.contactService.delete(data);
                        routeTo('contact-list');
                    },
                    buttonType: 5
                },
            ]
        }

        const table = new TableComponent(tableConfig);
        const itemTable = this.root.querySelector('#data-contacts');
        itemTable.innerHTML = '';
        itemTable.appendChild(table.html);
    }

}

customElements.define('contact-list', ContactListComponent);