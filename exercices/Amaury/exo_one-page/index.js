
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    showUsersList(root);
});

const getUsers = () => {
    let users = localStorage.getItem('users');
    return users != null ? JSON.parse(users) : [];
};

const setUsers = (data) => {
    localStorage.setItem('users', JSON.stringify(data));
};

const showUsersList = (container) => {
    container.innerHTML = '';

    let users = getUsers();
    container.appendChild(usersToList(users, container));

    let createBtn = document.createElement('button');
    createBtn.classList.add('btn', 'btn-primary');
    createBtn.innerHTML = 'create';

    createBtn.addEventListener('click', (e) => {
        e.preventDefault();

        showUserForm(container);
    });

    container.appendChild(createBtn);
};

const showUserForm = (container, users, user = null) => {
    container.innerHTML = '';

    container.appendChild(createUserForm(user, container, users)); 
};

const showUserDetails = (container, user) => {
    container.innerHTML = '';

    container.appendChild(createUserDetails(user, container));
};

const usersToList = (users, container) => {
    const usersTable = document.createElement('table');
    usersTable.classList.add('table');

    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');

    const idTh = document.createElement('th');
    idTh.innerHTML = '#';

    const lastnameTh = document.createElement('th');
    lastnameTh.innerHTML = 'lastname';

    const firstnameTh = document.createElement('th');
    firstnameTh.innerHTML = 'firstname';

    const emailTh = document.createElement('th');
    emailTh.innerHTML = 'email';

    const actionsTh = document.createElement('th');
    actionsTh.innerHTML = 'actions';

    tHead.appendChild(idTh);
    tHead.appendChild(lastnameTh);
    tHead.appendChild(firstnameTh);
    tHead.appendChild(emailTh);
    tHead.appendChild(actionsTh);

    users.forEach(user => {
        tBody.appendChild(userToRow(users, user, container));
    });

    usersTable.appendChild(tHead);
    usersTable.appendChild(tBody);

    return usersTable;
};

const userToRow = (users, user, container) => {
    let userIndex = users.indexOf(user);

    const userRow = document.createElement('tr');

    const idTd = document.createElement('td');
    idTd.innerHTML = userIndex;

    const lastnameTd = document.createElement('td');
    lastnameTd.innerHTML = user.lastname;

    const firstnameTd = document.createElement('td');
    firstnameTd.innerHTML = user.firstname;

    const emailTd = document.createElement('td');
    emailTd.innerHTML = user.email;

    const actionsTd = document.createElement('td');
    const infoBtn = document.createElement('button');
    infoBtn.innerHTML = 'info';
    infoBtn.classList.add('btn', 'btn-info');
    infoBtn.addEventListener('click', (e) => {
        e.preventDefault();

        showUserDetails(container, user);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();

        deleteUser(userIndex);
        showUsersList(container);
    });
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'edit';
    editBtn.classList.add('btn', 'btn-warning');
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();

        showUserForm(container, users, user);
    });
    actionsTd.appendChild(infoBtn);
    actionsTd.appendChild(deleteBtn);
    actionsTd.appendChild(editBtn);

    userRow.appendChild(idTd);
    userRow.appendChild(lastnameTd);
    userRow.appendChild(firstnameTd);
    userRow.appendChild(emailTd);
    userRow.appendChild(actionsTd);

    return userRow;
};

const createUserForm = (user, container, users) => {
    const frm = document.createElement('form');

    const lastnameDiv = document.createElement('div');
    lastnameDiv.classList.add('mb-3', 'mt-3');
    const lastnameLabel = document.createElement('label');
    lastnameLabel.classList.add('form-label');
    lastnameLabel.innerHTML = 'Lastname';
    const lastnameInput = document.createElement('input');
    lastnameInput.classList.add('form-control');
    lastnameInput.type = 'text';
    lastnameInput.value = user ? user.lastname : '';
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
    firstnameInput.value = user ? user.firstname : '';
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
    emailInput.value = user ? user.email : '';
    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'save';
    submit.classList.add('btn', 'btn-primary', 'mt-3');
    submit.addEventListener('click', (e) => {
        e.preventDefault();

        let newUser = {
            id: user ? users.indexOf(user) : null,
            lastname: lastnameInput.value,
            firstname: firstnameInput.value,
            email: emailInput.value
        };

        user ? updateUser(newUser) : addNewUser(newUser);
        showUsersList(container);
    });

    frm.appendChild(lastnameDiv);
    frm.appendChild(firstnameDiv);
    frm.appendChild(emailDiv);
    frm.appendChild(submit);

    return frm;
};

const createUserDetails = (user, container) => {
    const infoDiv = document.createElement('div');

    const lastnameTitle = document.createElement('h2');
    lastnameTitle.innerHTML = 'Lastname';
    const firstnameTitle = document.createElement('h2');
    firstnameTitle.innerHTML = 'Firstname';
    const emailTitle = document.createElement('h2');
    emailTitle.innerHTML = 'Email';

    const lastnameValue = document.createElement('p');
    lastnameValue.innerHTML = user.lastname;
    const firstnameValue = document.createElement('p');
    firstnameValue.innerHTML = user.firstname;
    const emailValue = document.createElement('p');
    emailValue.innerHTML = user.email;

    infoDiv.appendChild(lastnameTitle);
    infoDiv.appendChild(lastnameValue);

    infoDiv.appendChild(firstnameTitle);
    infoDiv.appendChild(firstnameValue);

    infoDiv.appendChild(emailTitle);
    infoDiv.appendChild(emailValue);

    return infoDiv;
};

const addNewUser = (user) => {
    let users =getUsers();
    user.id = users.length;;
    users.push(user);
    setUsers(users);
};

const deleteUser = (userIndex) => {
    let users = getUsers();
    users.splice(userIndex, 1);
    setUsers(users);
};

const updateUser = (user) => {
    let users = getUsers();
    users[user.id] = user;
    setUsers(users);
};