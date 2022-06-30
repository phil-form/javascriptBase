function sayHello()
{
    console.log("HELLO!!!!");
}

setTimeout(sayHello, 2000);

let idTimer = setTimeout(sayHello, 2000);
clearTimeout(idTimer);

let i = 0;

function sayBye()
{
    if(i > 3)
    {
        clearInterval(interVal);
    }
    console.log("Bye!!!!", i);
    i++;
}

let interVal = setInterval(sayBye, 2000);
// console.log(interVal);
// clearInterval(3);
