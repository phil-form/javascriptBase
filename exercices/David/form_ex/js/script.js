const send = document.getElementById('send')
const comp = document.getElementById('comp')
const erase = document.getElementById('erase')
const form = document.forms['register_form'];;

send.addEventListener('click', (e) => {
    e.preventDefault();
    const table = document.getElementById('table');
    const new_row = table.insertRow();
    const lastname = new_row.insertCell()
    const firstname = new_row.insertCell()
    const zip = new_row.insertCell()

    lastname.innerText = form.elements['lastname'].value
    firstname.innerText = form.elements['firstname'].value
    zip.innerText = form.elements['zip'].value
    
    local_save(new_row);
})

comp.addEventListener('click', (e) => {
    e.preventDefault();
    form.elements['lastname'].value = 'Duck'
    form.elements['firstname'].value = 'Riri'
    form.elements['zip'].value = '1234'
})

erase.addEventListener('click', (e) => {
    e.preventDefault();
    form.elements['lastname'].value = ''
    form.elements['firstname'].value = ''
    form.elements['zip'].value = ''
})

function local_save(row) {
    let nbr_rows = localStorage.getItem('nbr_rows')
    if (!nbr_rows) {
        nbr_rows = 0;
        localStorage.clear();
        localStorage.setItem('nbr_rows', '0');
    }
    localStorage.setItem(`${nbr_rows}_lastname`, `${row.children[0].innerText}`)
    localStorage.setItem(`${nbr_rows}_firstname`, `${row.children[1].innerText}`)
    localStorage.setItem(`${nbr_rows}_zip`, `${row.children[2].innerText}`)
    localStorage.setItem('nbr_rows', `${++nbr_rows}`);
}

function local_get() {
    const table1 = document.createElement('table');
    const table = document.createElement('tbody');
    const nbr_rows = localStorage.getItem('nbr_rows');
    if (!nbr_rows || nbr_rows === 0)
        return table;
    console.log('OK');

    let row = document.createElement('tr') 
    lastname = document.createElement('th') 
    firstname = document.createElement('th')
    zip = document.createElement('th') 

    lastname.innerText = 'lastname';
    firstname.innerText = 'firstname';
    zip.innerText = 'zip';

    row.appendChild(lastname);
    row.appendChild(firstname);
    row.appendChild(zip);

    table.appendChild(row);
    for (let i = 0; i < nbr_rows; i++) {
        const row = table.insertRow();
        const lastname = row.insertCell();
        const firstname = row.insertCell();
        const zip = row.insertCell();
        
        lastname.innerText = localStorage.getItem(`${i}_lastname`);
        firstname.innerText = localStorage.getItem(`${i}_firstname`);
        zip.innerText = localStorage.getItem(`${i}_zip`);
    }
    return table;

}

function clear_children(elem) {
    let tmp = elem.firstChild;
    while (tmp) {
        elem.removeChild(tmp);
        tmp = elem.firstChild;
    }
};

function init_table() {
    let table = document.getElementById('table');
    clear_children(table);
    let tmp = local_get();
    table.appendChild(tmp);
}

init_table();