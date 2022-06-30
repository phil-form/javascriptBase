let ex1 = document.getElementById('exo1');
let ex2 = document.getElementById('exo2');
let ex3 = document.getElementById('exo3');

const isLeapYear = () => {
    let today = new Date();
    let year = today.getFullYear();

    if (year % 4 !== 0) {
        ex2.innerText = "l'année " + year + " est bissextile";
    } else {
        ex2.innerText = "l'année " + year + " n'est pas bissextile";
    }
}

const formatDate = () => {
    let today = new Date();
    let week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    let year = ["Janv", "Févr", "Mars", "Avri", "Mai", "Juin", "Juil", "Aout", "Sept", "Octo", "Déce"];
    let day = today.getDate();
    let month = today.getMonth();
    let dayName = today.getDay();
    ex1.innerText += week[dayName - 1] + " " + day + " " + year[month] + ".";
}

const listOfName = () => {
    let n = prompt('Combien de noms voulez vous entrer ?');
    let names = [];
    for (let i = 1; i <= n; i++) {
        let name = prompt('Entrez un nom');
        names.push(name);
    }
    
    let list = '<ul>';
    for (el of names ) {
        list += '<li>' + el + '</li>';
    }
    list += '</ul>';

    ex3.innerHTML = list;
}

formatDate();
isLeapYear();
listOfName();