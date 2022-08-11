import UserFormComponent from "./userFormComponent.js";
import UserComponent from "./userComponent.js";


class UsersListComponent {
    constructor(users) {
        this.users = users;
    };

    toHTML(container) {
        container.innerHTML = '';

        const usersTable = document.createElement('table');
        usersTable.classList.add('table');

        const tHead = document.createElement('thead');
        const tBody = document.createElement('tbody');

        const idTh = document.createElement('th');
        idTh.innerHTML = '#';

        const lastnameTh = document.createElement('th');
        lastnameTh.innerHTML = 'Lastname';

        const firstnameTh = document.createElement('th');
        firstnameTh.innerHTML = 'Firstname';

        const emailTh = document.createElement('th');
        emailTh.innerHTML = 'Email';

        const actionsTh = document.createElement('th');
        actionsTh.innerHTML = 'Actions';

        tHead.appendChild(idTh);
        tHead.appendChild(lastnameTh);
        tHead.appendChild(firstnameTh);
        tHead.appendChild(emailTh);
        tHead.appendChild(actionsTh);

        this.users.forEach(u => {
            let index = this.users.indexOf(u);
            let user = new UserComponent(u.lastname, u.firstname, u.email);
            user.toTableRow(tBody, index);
        });

        usersTable.appendChild(tHead);
        usersTable.appendChild(tBody);

        container.appendChild(usersTable);
    };

    addCreateAction(container) {
        let createBtn = document.createElement('button');
        createBtn.classList.add('btn', 'btn-primary');
        createBtn.innerHTML = 'Create';

        createBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const container = document.getElementById('root');
            const userForm = new UserFormComponent();
            userForm.toHTML(container);
        });

        container.appendChild(createBtn);
    };
};

export default UsersListComponent;