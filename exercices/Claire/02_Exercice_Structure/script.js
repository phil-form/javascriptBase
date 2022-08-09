
let today = new Date()

// Exercice 1
let exo1 = document.getElementById('exo1')
const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
exo1.innerText = `${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`

// Exercice 2
let exo2 = document.getElementById('exo2')
const year = today.getFullYear()
let toBeOrNotToBe = (year % 4 == 0) ? "est" : "n'est pas"
exo2.innerText = `L'année ${year} ${toBeOrNotToBe} bissextile`

// Exercice 3
let exo3 = document.getElementById('exo3')
const response = parseInt(window.prompt("Combien de personnes voulez-vous ajouter ?"))
for (i = 1; i <= response; i++) {
    let li = document.createElement('li')
    li.innerText = window.prompt(`Entrer le nom de la personne ${i}`)
    exo3.appendChild(li)
}
