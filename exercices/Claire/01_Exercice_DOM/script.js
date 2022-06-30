
let mainDiv = document.getElementById('poney')

// insert h1
let h1 = document.createElement('h1')
h1.innerHTML = "Balthazar Picsou"
mainDiv.appendChild(h1)

// insert img
let img = document.createElement('img')
img.src = "images/licorne.jpg"
mainDiv.appendChild(img)

// section presentation
let divPresentation = document.createElement('div')
divPresentation.id = "presentation"
mainDiv.appendChild(divPresentation)
let h2Presentation = document.createElement('h2')
h2Presentation.innerHTML = "Présentation"
divPresentation.appendChild(h2Presentation)
let pPresentation1 = document.createElement('p')
pPresentation1.innerHTML = "J'aime les licornes"
divPresentation.appendChild(pPresentation1)
let pPresentation2 = document.createElement('p')
pPresentation2.innerHTML = "Athanaël au tableau"
divPresentation.appendChild(pPresentation2)

// section compétences
let divCompetences = document.createElement('div')
divCompetences.id = "competences"
mainDiv.appendChild(divCompetences)
let h2Comp = document.createElement('h2')
h2Comp.innerHTML = "Compétences"
divCompetences.appendChild(h2Comp)
let firstList = document.createElement('ul')
divCompetences.appendChild(firstList)
let li1 = document.createElement('li')
li1.innerHTML = "CH"
firstList.appendChild(li1)
let li2 = document.createElement('li')
li2.innerHTML = "web"
firstList.appendChild(li2)
let secondList = document.createElement('ul')
firstList.appendChild(secondList)
let li3 = document.createElement('li')
li3.innerHTML = "html"
secondList.appendChild(li3)
let li4 = document.createElement('li')
li4.innerHTML = "css"
secondList.appendChild(li4)
let li5 = document.createElement('li')
li5.innerHTML = "javascript"
secondList.appendChild(li5)

// section historique
let divHistorique = document.createElement('div')
divHistorique.id = "historique"
mainDiv.appendChild(divHistorique)
let h2Histo = document.createElement('h2')
h2Histo.innerHTML = "Historique"
divHistorique.appendChild(h2Histo)
let pHisto = document.createElement('p')
pHisto.innerHTML = "Super DT sans balises!"
divHistorique.appendChild(pHisto)
let pHisto2 = document.createElement('p')
pHisto2.innerHTML = "&emsp;Un petit texte de bientôt la fin!"
divHistorique.appendChild(pHisto2)

