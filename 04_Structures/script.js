// Conditionnelle

let a = "Riri"

if (typeof(a) === "number")
{
    console.log("C'est un nombre!");
} else if(typeof(a) === "string")
{
    console.log("C'est une string!");
} else
{
    console.log("C'est autre chose");
}

let b = 42;

switch (b)
{
    case 42:
        console.log("La réponse universelle!");
        break;
    case "42":
        console.log("Une autre réponse!");
        break;
    default:
        console.log("DEFAULT OUTPUT");
        break;
}

// Itérative
let i = 0;

while(i < 10)
{
    console.log(i);
    i++;
}

i = 0;

do {
    console.log(i);
    i++;
} while(i < 10);

for(let i = 0; i < 10; i++)
{
    console.log(i);
}

const tab = ["Riri", "Fifi", "Loulou", "Zaza", "Donald"]

console.log("FOR IN");
for(const index in tab)
{
    console.log(index);
}

console.log("FOR OF");
for(const item of tab)
{
    console.log(item);
}

const obj1 = { nom: "Picsou", prenom: "Balthazar" };
for(const key in obj1)
{
    console.log(`${key} (${typeof(key)}) => ${obj1[key]}`);
}

// Ne fonctionne pas en JS.
// for(const val of obj1)
// {
//     console.log(`${val} (${typeof(val)}) => ${val}`);
// }
