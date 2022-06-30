// Numbers
const responseAbsolue = 42;
// responseAbsolue = 54;

const pi = 3.1415;

console.log(parseInt(window.prompt("Entrer un nombre : ")));

let nbr = parseInt(window.prompt("Entrer un nombre : "));

if(!isNaN(nbr))
{
    console.log(nbr, "is a number");
} else
{
    console.log(nbr, "is not a number");
}

// String values
const str1 = "Riri"
const str2 = 'Fifi'
const str3 = `Loulou`

const concat1 = str1 + " " + str2 + " Duck, " + str3 + " lalalalalalal";
console.log(concat1);
const concat2 = `${str1} ${str2} Duck, ${str3} laallalalalalal`;
console.log(concat2);

// Boolean
const b1 = true;
const b2 = false;

// Absence de donnée.
const a1 = null;
const a2 = undefined;

console.log(a1 === a2);

// Operateurs 
/*
    + - / *  % 
    exposant **
*/
let a = 4
let b = 3;

const r = a++ + (b-- + --a) - a;
console.log(r);

// Tableau
let tab1 = ["Riri", "Fifi", "Loulou"]
tab1[3] = "Donald"
tab1[10] = "Zaza"

tab1[7] = undefined
tab1[8] = undefined
console.log(tab1.length);

console.log(tab1);

// Dictionaire | Tableau associatif
let dico = []
dico["zaza"] = "Vanderquack"
dico["riri"] = "Duck"
console.log(dico.length, dico);

const names = ["Riri", "Fifi", "Loulou", "Zaza", "Donald"]

console.log(names.toString());
console.log(names.join("<=>"));

console.log(names);
console.log(names.pop());
console.log(names);

console.log(names);
console.log(names.push("Daisy", "Donald"));
console.log(names);

console.log(names);
console.log(names.shift());
console.log(names);
console.log(names.unshift("Riri", "Mickey"));
console.log(names);

console.log(names.splice(1, 1));
console.log(names);

console.log(names.splice(1, 1, "Geo", "Math"));
console.log(names);

console.log(names.slice(1, 5));
console.log(names);

console.log(names.concat(["Loulou", "Picsou"]));
console.log(names);

console.log(names.reverse());
console.log(names);

console.log(names.sort());
console.log(names);

let numbers = [5, 7, 32, 32, 5, 64, 74, 12, 11, 111, 21, 16, 15]

console.log(numbers.sort(function (a, b) { return a - b}));
console.log(numbers.sort((a, b) => b - a));

console.log(numbers.filter((a) => !(a % 2)));

let d = new Date();

console.log(d.getDate());
console.log(d.getMonth());
console.log(d.getFullYear());
console.log(d.getDay());
console.log(d.toString());
console.log(d.toDateString());
console.log(d.toTimeString());
console.log(d.toLocaleString());
console.log(d.toLocaleDateString());
console.log(d.toLocaleTimeString());
console.log(d.getTime());
console.log(Date.now());