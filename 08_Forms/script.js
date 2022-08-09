console.log(document.forms);
console.log(document.forms[0]);
console.log(document.forms['form1']);
console.log(document.form1);

const frm = document.forms['form1'];

console.log(frm);
console.log(frm.elements);
console.log(frm.elements[0]);
console.log(frm.elements['lastname']);
console.log(frm.elements.lastname);

console.log(frm.elements.lastname.value);

frm.elements.lastname.value = "test";

frm.reset();

// frm.submit();


const btn = document.getElementById('send');

btn.addEventListener('click', (e) =>
{
    e.preventDefault();

    console.log(typeof(frm.date.value));
    console.log(frm.date.value);

    frm.date.value = '2022-08-30';
});

frm.lastname.addEventListener('change', (e) =>
{
    console.log(e);
    console.log(frm.lastname.value);
});
