let baseEl = document.getElementById('poney');

let h1El = document.createElement('h1');
h1El.innerText = "Crenier Amaury";

let imgEl = document.createElement('img');
imgEl.setAttribute('src', "./image.png");


baseEl.append(h1El);
baseEl.append(imgEl);

let h2Titles = ["Présentation", "Compétences", "Historique"];
for (title of h2Titles) {
    let el = document.createElement('h2');
    el.innerText = title;
    baseEl.append(el);
}

let h2Els = document.querySelectorAll('h2');

let content1 = document.createElement('p');
content1.innerText = "J'aime les licornes";

let content2 = document.createElement('p');
content2.innerText = "Athanael au tableau";

h2Els[0].insertAdjacentElement('afterend', content2);
h2Els[0].insertAdjacentElement('afterend', content1);

let content3 = document.createElement('ul');
content3.innerHTML = "<li>CH</li><li>web</li>"

let content4 = document.createElement('ul');
content4.innerHTML = "<li>html</li><li>css</li><li>Javascript</li>"

content3.appendChild(content4);

h2Els[1].insertAdjacentElement('afterend', content3);

let content5 = document.createElement('p')
content5.innerHTML = "super DT sans balises! <blockquote>Un petit mot de fin!</blockquote>"

h2Els[2].insertAdjacentElement('afterend', content5);
