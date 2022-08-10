export class Contact {

    constructor(firstname, lastname, email) {
        this.id = null
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
    }

}

class ContactList {

    constructor() {
        this.load();
    }

    load() {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        this.contacts = contacts ? contacts : [];
        for(let i in this.contacts) {
            this.contacts[i] = Object.assign(new Contact(), this.contacts[i]);
        }
        console.log('Contact list loaded from localstorage !')
    }

    addOrUpdate(id, firstname, lastname, email) {
        let contact = null
        if(id) {
            for(let i in this.contacts) {
                if(this.contacts[i].id == id) {
                    this.contacts[i].firstname = firstname
                    this.contacts[i].lastname = lastname
                    this.contacts[i].email = email
                    contact = this.contacts[i]
                }
            }
        } else {
            contact  = new Contact(firstname, lastname, email)
            contact.id = this.contacts.length + 1;
            this.contacts.push(contact);
        }
        localStorage.setItem('contacts', JSON.stringify(this.contacts))
        return contact;
    }

    remove(contact) {
        for(let i in this.contacts) {
            if(this.contacts[i].id == contact.id) {
                this.contacts.splice(i, 1)
            }
        }
        localStorage.setItem('contacts', JSON.stringify(this.contacts))
    }

}

export const contactList = new ContactList()

