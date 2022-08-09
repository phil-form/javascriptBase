window.addEventListener('load', () =>
{
    const btn = document.getElementById('btn');
    const cpt = document.getElementById('cpt');
    const content = document.getElementById('content');

    function increaseCpt()
    {
        const val = parseInt(cpt.innerText) + 1;
        cpt.innerText = val;
    }

    btn.addEventListener("click", increaseCpt);

    content.addEventListener('mouseover', () => content.classList.add('rouge'))
    content.addEventListener('mouseout', () => content.classList.remove('rouge'))
})

window.addEventListener('beforeunload', (e) =>
{
    e.returnValue = "BOOM!!!!";
})
