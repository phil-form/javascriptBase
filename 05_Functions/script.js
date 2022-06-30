function printHello(name)
{
    console.log("Bonjour " + name);
}

printHello("Riri");
printHello("Fifi");
printHello("Loulou");

function demoArgs()
{
    console.log(arguments);
    for(let item of arguments)
    {
        console.log(item);
    }
}

demoArgs();
demoArgs(1, 2, 3, 4);
demoArgs("Riri", "fifi", "loulou", 5);

function demoArgs2(...args)
{
    console.log(args)
}

demoArgs2();
demoArgs2(1, 2, 3, 4);
demoArgs2("Riri", "fifi", "loulou", 5);

function demoArgs3(say, ...args)
{
    console.log(say, args);
}

demoArgs3("quelquechose", 12, 3, 4, 56);

function addNumbers(a, b)
{
    return a + b;
}

const addNbrs = function(a, b)
{
    return a + b;
}

const addNbrs2 = (a, b) =>
{
    return a + b;
}

const addNbrs3 = (a, b) => a + b;

console.log(addNbrs3(5, 10));

let tab = [10, 25, 11, 32, 64, 9, 2, 55, 32, 12, 58];

tab.sort((a, b) => a - b);
console.log(tab);

function isEven(number)
{
    return number % 2 === 0;
}

console.log(tab.filter(isEven));
console.log(tab.filter((val) => val % 2 === 0));

function demoCallback(msg, cb)
{
    if(cb && typeof(cb) === "function")
    {
        cb(msg);
    }
}

demoCallback("Bonjour", (v) => console.log(`${v} machin`));
demoCallback("Bonjour", console.log);
