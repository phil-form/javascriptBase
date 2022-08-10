const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : [];
const root = document.getElementById("root");
const nav  = document.getElementById("nav_bar");
let current_page = "";

class User {
    lastname = "";
    firstname = "";
    email = "";
    constructor(lastname, firstname, email) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
    };
};


function load_users() {
    const stored_users = sessionStorage.getItem('users');
    if (!stored_users) {
        users = [];
        sessionStorage.setItem('users', JSON.stringify(users));
    } else {
        users = JSON.parse(stored_users);
    }
}

function list_view() {
    if (current_page === "list_page")
        return
    current_page = "list_page";
    nav_bar();
    clear_root();

    const users_table = document.createElement('table');
    users_table.className = "table table-hover";
    root.appendChild(users_table);

    const thead = document.createElement('thead');
    users_table.appendChild(thead);

    //header
    const tr = thead.insertRow();
    tr.className = "d-flex";

    const id = document.createElement('th');
    id.innerText = "#";
    id.setAttribute("scope", "col");
    id.className = "col-1";
    tr.appendChild(id);

    const lastname = document.createElement('th');
    lastname.innerText = "Last Name";
    lastname.setAttribute("scope", "col");
    lastname.className = "col-1";
    tr.appendChild(lastname);

    const firstname = document.createElement('th');
    firstname.innerText = "First Name";
    firstname.setAttribute("scope", "col");
    firstname.className = "col-1";
    tr.appendChild(firstname);

    const email = document.createElement('th');
    email.innerText = "E-mail";
    email.setAttribute("scope", "col");
    email.className = "col-2";
    tr.appendChild(email);

    //body
    const tbody = document.createElement('tbody');
    users_table.className = "table table-hover";
    users_table.appendChild(tbody);
    let id_counter = 1;

    for (const user of users) {
        const row = tbody.insertRow();
        row.className = "d-flex";

        const id = document.createElement('th');
        id.innerText = id_counter++;
        id.setAttribute("scope", "row");
        id.className = "col-1";
        row.appendChild(id);

        const lastname = row.insertCell();
        lastname.innerText = user.lastname;
        lastname.className = "col-1";
        const firstname = row.insertCell();
        firstname.innerText = user.firstname;
        firstname.className = "col-1";
        const email = row.insertCell();
        email.innerText = user.email;
        email.className = "col-2";

        const action = row.insertCell();

        const action_form = document.createElement('form');
        action_form.className = "btn-group";
        action.appendChild(action_form);

        const info = document.createElement('input');
        info.type = 'submit';
        info.value = 'info';
        info.className = "btn btn-outline-primary";
        action_form.appendChild(info);

        const edit = document.createElement('input');
        edit.type = 'submit';
        edit.value = 'edit';
        edit.className = "btn btn-outline-success";
        action_form.appendChild(edit);

        const remove = document.createElement('input');
        remove.type = 'submit';
        remove.value = 'remove';
        remove.className = "btn btn-danger";
        action_form.appendChild(remove);

        info.addEventListener('click', (e) => {
            e.preventDefault();
            info_page(user);
        })
        edit.addEventListener('click', (e) => {
            e.preventDefault();
            edit_page(user);
        })
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            my_remove(user);
        })
    };
};

function register_view() {
    if (current_page === "register_page")
        return
    current_page = "register_page";
    nav_bar();
    clear_root();

    const user_create_form = document.createElement('form');
    root.appendChild(user_create_form);

    //fields
    const lastname  = document.createElement('input');
    const firstname = document.createElement('input');
    const email     = document.createElement('input');

    lastname.type  = 'text';
    lastname.id    = 'lastname';
    lastname.className = "form-control w-25";
    firstname.type = 'text';
    firstname.id   = 'firstname';
    firstname.className = "form-control w-25";
    email.type     = 'email';
    email.id       = 'email';
    email.className = "form-control w-25";

    //labels
    const lastname_label  = document.createElement('label');
    const firstname_label = document.createElement('label');
    const email_label     = document.createElement('label');

    //lastname
    lastname_label.setAttribute("for", 'lastname');
    lastname_label.innerText = 'Last Name';
    lastname_label.className = "form-label";
    let lname_div = document.createElement('div');
    lname_div.className = "col w-50";
    lname_div.appendChild(lastname_label);
    lname_div.appendChild(lastname);
    user_create_form.appendChild(lname_div);
    user_create_form.appendChild(document.createElement('br'));

    //firstname
    firstname_label.setAttribute("for", 'firstname');
    firstname_label.innerText = 'First Name';
    firstname_label.className = "form-label";
    let fname_div = document.createElement('div');
    fname_div.className = "col w-50";
    fname_div.appendChild(firstname_label);
    fname_div.appendChild(firstname);
    user_create_form.appendChild(fname_div);
    user_create_form.appendChild(document.createElement('br'));

    //email
    email_label.setAttribute("for", 'email');
    email_label.innerText = 'E-mail';
    email_label.className = "form-label";
    let mail_div = document.createElement('div');
    mail_div.className = "col w-50";
    mail_div.appendChild(email_label);
    mail_div.appendChild(email);
    user_create_form.appendChild(mail_div);
    user_create_form.appendChild(document.createElement('br'));

    //button
    const submit = document.createElement('input');
    submit.type  = 'submit';
    submit.value = 'Create User';
    submit.className = "btn btn-primary ml-3";
    user_create_form.appendChild(submit);

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const id = users.length + 1;
        const new_user = new User(lastname.value, firstname.value, email.value, id);

        users.push(new_user);
        sessionStorage.setItem('users', JSON.stringify(users));
        list_view();
    });
};

function edit_page(user) {
    if (current_page === "edit_page")
        return
    current_page = "edit_page";
    nav_bar();
    clear_root();

    const user_create_form = document.createElement('form');
    root.appendChild(user_create_form);

    //fields
    const lastname  = document.createElement('input');
    const firstname = document.createElement('input');
    const email     = document.createElement('input');

    lastname.type   = 'text';
    lastname.id     = 'lastname';
    lastname.value  = user.lastname;
    lastname.className = "form-control w-25";

    firstname.type  = 'text';
    firstname.id    = 'firstname';
    firstname.value = user.firstname;
    firstname.className = "form-control w-25";

    email.type      = 'text';
    email.id        = 'email';
    email.value     = user.email;
    email.className = "form-control w-25";

    //labels
    const lastname_label  = document.createElement('label');
    const firstname_label = document.createElement('label');
    const email_label     = document.createElement('label');

    //lastname
    lastname_label.setAttribute("for", 'lastname');
    lastname_label.innerText = 'Last Name';
    lastname_label.className = "form-label";
    let lname_div = document.createElement('div');
    lname_div.className = "col w-50";
    lname_div.appendChild(lastname_label);
    lname_div.appendChild(lastname);
    user_create_form.appendChild(lname_div);
    user_create_form.appendChild(document.createElement('br'));

    //firstname
    firstname_label.setAttribute("for", 'firstname');
    firstname_label.innerText = 'First Name';
    firstname_label.className = "form-label";
    let fname_div = document.createElement('div');
    fname_div.className = "col w-50";
    fname_div.appendChild(firstname_label);
    fname_div.appendChild(firstname);
    user_create_form.appendChild(fname_div);
    user_create_form.appendChild(document.createElement('br'));

    //email
    email_label.setAttribute("for", 'email');
    email_label.innerText = 'E-mail';
    email_label.className = "form-label";
    let email_div = document.createElement('div');
    email_div.className = "col w-50";
    email_div.appendChild(email_label);
    email_div.appendChild(email);
    user_create_form.appendChild(email_div);
    user_create_form.appendChild(document.createElement('br'));

    //button
    const submit = document.createElement('input');
    submit.type  = 'submit';
    submit.value = 'Save changes';
    submit.className = "btn btn-success ml-3"
    user_create_form.appendChild(submit);

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        user.firstname = firstname.value;
        user.lastname = lastname.value;
        user.email = email.value;

        sessionStorage.setItem('users', JSON.stringify(users));
        info_page(user);
    });
};

function info_page(user) {
    if (current_page === "info_page")
        return
    current_page = "info_page";
    nav_bar();
    clear_root();

    const elem = document.createElement('p');
    root.appendChild(elem);

    const lastname = document.createElement('span');
    lastname.innerText = `${user.lastname} `;
    elem.appendChild(lastname);

    const firstname = document.createElement('span');
    firstname.innerText = `${user.firstname} `;
    elem.appendChild(firstname);

    const email = document.createElement('span');
    email.innerText = `${user.email} `;
    elem.appendChild(email);
};

function my_remove(user) {
    current_page = "remove";
    users.pop(user);
    sessionStorage.setItem('users', JSON.stringify(users));
    list_view();
};

function nav_bar() {
    while (nav.firstChild)
        nav.removeChild(nav.firstChild);

    const nav_bar = document.createElement('form');
    nav.appendChild(nav_bar);

    const create_user_button = document.createElement('button');
    create_user_button.innerText = 'Register';
    create_user_button.className = "btn btn-link";
    nav_bar.appendChild(create_user_button);

    const list_users_button = document.createElement('button');
    list_users_button.innerText = 'Home';
    list_users_button.className = "btn btn-link";
    nav_bar.appendChild(list_users_button);

    create_user_button.addEventListener('click', (e) => {
        e.preventDefault();
        register_view();
    });

    list_users_button.addEventListener('click', (e) => {
        e.preventDefault();
        list_view();
    })
};

function clear_root() {
    while (root.firstChild)
        root.removeChild(root.firstChild);
};

//list_view();
//register_view();
edit_page(users[0]);