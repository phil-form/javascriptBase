import {getFromStorage, setToStorage} from '../../utilities/storage.js';
import UserFormComponent from './userFormComponent.js';


class UserComponent {
    constructor(lastname, firstname, email) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
    };

    toHTML(container) {
        container.innerHTML = '';

        const infoDiv = document.createElement('div');

        const lastnameTitle = document.createElement('h2');
        lastnameTitle.innerHTML = 'Lastname';
        const firstnameTitle = document.createElement('h2');
        firstnameTitle.innerHTML = 'Firstname';
        const emailTitle = document.createElement('h2');
        emailTitle.innerHTML = 'Email';

        const lastnameValue = document.createElement('p');
        lastnameValue.innerHTML = this.lastname;
        const firstnameValue = document.createElement('p');
        firstnameValue.innerHTML = this.firstname;
        const emailValue = document.createElement('p');
        emailValue.innerHTML = this.email;

        infoDiv.appendChild(lastnameTitle);
        infoDiv.appendChild(lastnameValue);

        infoDiv.appendChild(firstnameTitle);
        infoDiv.appendChild(firstnameValue);

        infoDiv.appendChild(emailTitle);
        infoDiv.appendChild(emailValue);

        container.appendChild(infoDiv);
    };

    toTableRow(container, index) {
        const userRow = document.createElement('tr');
        
        const idTd = document.createElement('td');
        idTd.innerHTML = index;
        
        const lastnameTd = document.createElement('td');
        lastnameTd.innerHTML = this.lastname;
        
        const firstnameTd = document.createElement('td');
        firstnameTd.innerHTML = this.firstname;
        
        const emailTd = document.createElement('td');
        emailTd.innerHTML = this.email;
        
        const actionsTd = document.createElement('td');
        const infoBtn = document.createElement('button');
        infoBtn.innerHTML = 'Info';
        infoBtn.classList.add('btn', 'btn-link', 'text-info');
        infoBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const root = document.getElementById('root');
            this.toHTML(root);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.classList.add('btn', 'btn-link', 'text-danger');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let index = parseInt(e.currentTarget.parentNode.parentNode.firstChild.innerText);
            let users = getFromStorage('users');
            users.splice(index, 1);
            setToStorage('users', users);
        });
        const editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList.add('btn', 'btn-link', 'text-success');
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
        
            const container = document.getElementById('root');
            const userForm = new UserFormComponent(this);
            userForm.toHTML(container);
        });
        actionsTd.appendChild(infoBtn);
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        
        userRow.appendChild(idTd);
        userRow.appendChild(lastnameTd);
        userRow.appendChild(firstnameTd);
        userRow.appendChild(emailTd);
        userRow.appendChild(actionsTd);
        
        container.appendChild(userRow);
    };
};

export default UserComponent;