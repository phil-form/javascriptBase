const date = new Date();

const dayOfMnth = date.getDate();

let dayOfWeek = "";

// switch (date.getDay())
// {
//     case 1:
//         dayOfWeek = "Lundi";
//         break;
//     case 2:
//         dayOfWeek = "Mardi";
//         break;
//     case 3:
//         dayOfWeek = "Mercredi";
//         break;
//     case 4:
//         dayOfWeek = "Jeudi";
//         break;
//     case 5:
//         dayOfWeek = "Vendredi";
//         break;
//     case 6:
//         dayOfWeek = "Samedi";
//         break;
//     default:
//         dayOfWeek = "Dimanche";
//         break;
// }

days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
dayOfWeek = days[date.getDay()];

months = ["Jan.", "Fev.", "Mars", "Avr.", "Mai", "Jui.", "Jll.", "Aout", "Sep.", "Oct.", "Nov.", "Dec."];
let mnth = months[date.getMonth()];

const exo1 = document.getElementById('exo1');
exo1.innerText = `${dayOfWeek} ${dayOfMnth} ${mnth}`;

const year = date.getFullYear();
const exo2 = document.getElementById('exo2');

let resB = "n'est pas";

if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
{
    // exo2.innerText = `${year} est bissextile`;
    resB = "est";
}
// else
// {
//     exo2.innerText = `${year} n'est pas bissextile`;
// }

exo2.innerText = `${year} ${resB} bissextile`;

const nb = parseInt(prompt("Nombre de personnes : ", 5));

const listPerson = document.querySelector('#exo3');
for(let i = 0; i < nb; i++)
{
    const val = prompt(`Nom de la personne ${i + 1} : `);
    const li = document.createElement('li');
    li.innerText = val;
    listPerson.appendChild(li);
}

