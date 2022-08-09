const form1 = document.form1;
const inputLastname = form1.lastname;
const inputFirstname = form1.firstname;
const inputZipCode = form1.zipcode;

const btnSubmit = document.getElementById("btn_submit");
const btnAuto = document.getElementById("btn_auto");
const btnReset = document.getElementById("btn_reset");

const tableData = document.getElementById("table_data");

class Person
{
    constructor(lastName, firstName, ZipCode) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.zipCode = ZipCode;
    }

    getAsHtmlRow()
    {
        const tr = document.createElement('tr');
        const cellLn = tr.insertCell();
        const cellFn = tr.insertCell();
        const cellZc = tr.insertCell();
        cellLn.innerHTML = this.lastName;
        cellFn.innerHTML = this.firstName;
        cellZc.innerHTML = this.zipCode;

        return tr;
    }
}

function createRow(item)
{
    let tr = document.createElement('tr');

    for(const index in item)
    {
        let td = tr.insertCell();
        td.innerHTML = item[index];
    }

    tableData.appendChild(tr);
}

function validForm()
{
    const zc = inputZipCode.value;

    let isValid = (zc >= 1000 && zc <= 9999);

    let index = 0;
    while(isValid && index < form1.elements.length)
    {
        if(form1.elements[index].value.trim().length === 0)
        {
            isValid = false;
        }
        index++;
    }

    return isValid;
}

inputLastname.addEventListener('keyup', (e) =>
{
    btnSubmit.disabled = !validForm();
});

inputFirstname.addEventListener('keyup', (e) =>
{
    btnSubmit.disabled = !validForm();
});

inputZipCode.addEventListener('keyup', (e) =>
{
    btnSubmit.disabled = !validForm();
});

btnAuto.addEventListener('click', (e) =>
{
    e.preventDefault();

    inputLastname.value = "Duck";
    inputFirstname.value = "Riri";
    inputZipCode.value = 1234;
});

btnSubmit.addEventListener('click', (e) =>
{
    e.preventDefault();

    let item = {
        lastName: inputLastname.value,
        firstName: inputFirstname.value,
        zipCode: inputZipCode.value
    };

    createRow(item);
})

btnReset.addEventListener('click', (e) =>
{
    e.preventDefault();

    form1.reset();
})
