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