window.addEventListener('load', () =>
{
    const target = document.getElementById("target");
    const btn = document.getElementById("btn");
    const results = document.getElementById("results");

    function addElement()
    {
        const elem = document.createElement('li');
        elem.innerText = target.value;
        results.appendChild(elem);
        target.value = "";
        target.focus();
    }

    btn.addEventListener('click', addElement);

    target.addEventListener('keyup', (e) =>
    {
        if(e.keyCode === 13)
        {
            addElement();
        }
    })
})



