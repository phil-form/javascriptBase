import UserComponent from "./userComponent.js";
import {getFromStorage, setToStorage} from '../../utilities/storage.js';


class UserFormComponent {
    constructor(user = null) {
        this.user = user;
    };

    toHTML(container) {
        container.innerHTML = '';

        const frm = document.createElement('form');

        const lastnameDiv = document.createElement('div');
        lastnameDiv.classList.add('mb-3', 'mt-3');
        const lastnameLabel = document.createElement('label');
        lastnameLabel.classList.add('form-label');
        lastnameLabel.innerHTML = 'Lastname';
        const lastnameInput = document.createElement('input');
        lastnameInput.classList.add('form-control');
        lastnameInput.type = 'text';
        lastnameInput.value = this.user ? this.user.lastname : '';
        lastnameDiv.appendChild(lastnameLabel);
        lastnameDiv.appendChild(lastnameInput);

        const firstnameDiv = document.createElement('div');
        firstnameDiv.classList.add('mb-3', 'mt-3');
        const firstnameLabel = document.createElement('label');
        firstnameLabel.classList.add('form-label');
        firstnameLabel.innerHTML = 'Firstname';
        const firstnameInput = document.createElement('input');
        firstnameInput.classList.add('form-control');
        firstnameInput.type = 'text';
        firstnameInput.value = this.user ? this.user.firstname : '';
        firstnameDiv.appendChild(firstnameLabel);
        firstnameDiv.appendChild(firstnameInput);

        const emailDiv = document.createElement('div');
        emailDiv.classList.add('mb-3', 'mt-3');
        const emailLabel = document.createElement('label');
        emailLabel.classList.add('form-label');
        emailLabel.innerHTML = 'Email';
        const emailInput = document.createElement('input');
        emailInput.classList.add('form-control');
        emailInput.type = 'email';
        emailInput.value = this.user ? this.user.email : '';
        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(emailInput);

        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Save';
        submit.classList.add('btn', 'btn-primary', 'mt-3');
        submit.addEventListener('click', (e) => {
            e.preventDefault();

            let newUser = new UserComponent(lastnameInput.value, firstnameInput.value, emailInput.value);
            let users = getFromStorage('users');
            users.push(newUser);
            setToStorage('users', users);
        });

        frm.appendChild(lastnameDiv);
        frm.appendChild(firstnameDiv);
        frm.appendChild(emailDiv);
        frm.appendChild(submit);

        container.appendChild(frm);
    };
};

export default UserFormComponent;