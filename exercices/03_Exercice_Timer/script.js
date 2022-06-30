// Solution interval :
function updateClock1()
{
    const clock1 = document.getElementById('clock1');
    const date = new Date();

    clock1.innerText = date.toLocaleTimeString();
}

setInterval(updateClock1, 100);

// solution timeout
function updateClock2()
{
    const clock2 = document.getElementById('clock2');
    const date = new Date();

    clock2.innerText = date.toLocaleTimeString();

    setTimeout(updateClock2, 100);
}

setTimeout(updateClock2, 100);
