const title = "Balthazar Picsou"
const subTitle = ["Présentation", "Compétances", "Historique"]

const container = document.getElementById('poney');

const h1 = document.createElement('h1');
pTitle = container.appendChild(h1);
pTitle.innerHTML = title;

const subTitle1 = document.createElement('h2');
const subTitle2 = document.createElement('h2');
const subTitle3 = document.createElement('h2');

subTitle1.innerText = subTitle[0];
subTitle2.innerText = subTitle[1];
subTitle3.innerText = subTitle[2];

container.appendChild(subTitle1);
container.appendChild(subTitle2);
container.appendChild(subTitle3);

const p1 = document.createElement('p');
const p2 = document.createElement('p');

p1.innerText = "J'aime les licornes";
p2.innerText = "Formation Odoo!"

container.insertBefore(p1, subTitle2);
container.insertBefore(p2, subTitle2);

const ul1 = document.createElement('ul');
const ul2 = document.createElement('ul');
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
const li4 = document.createElement('li');
const li5 = document.createElement('li');

li1.innerText = "CH"
li2.innerText = "Web"
li3.innerText = "html"
li4.innerText = "css"
li5.innerText = "javascript"

container.insertBefore(ul1, subTitle3);
ul1.appendChild(li1);
ul1.appendChild(li2);
ul1.appendChild(ul2);
ul2.appendChild(li3);
ul2.appendChild(li4);
ul2.appendChild(li5);

const def1 = document.createElement('dl');
container.appendChild(def1);

const defTitle = document.createElement('dt');
defTitle.innerText = "Super DT sans balises!"
def1.appendChild(defTitle);

const defText = document.createElement('dd');
defText.innerText = "C'est bientôt fini!!"
def1.appendChild(defText);

const img = document.createElement('img');
img.src = "images/licorne.jpg"
img.setAttribute("alt", "C'est une licorne");
container.insertBefore(img, subTitle1);
