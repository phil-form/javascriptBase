document.open();
document.writeln("SUper phrase!!!");
document.write("Bonjour");
document.close();

// let donald = document.getElementById('cle1');
// console.log(donald);
console.log(document.getElementsByClassName('sub-title'));
console.log(document.getElementsByTagName('p'));
console.log(document.querySelector('p > span'));
console.log(document.querySelectorAll('h2 + p'));

console.log(document.title);
console.log(document.body);

console.log(document.createElement('p'));

document.getElementById('cle1');
document.querySelector('#cle1');
document.querySelector('ul > ul > li');
document.querySelector('ul > .title');

let donald = document.getElementById('cle1');

console.log(donald);
console.log(donald.id);

// Manipulation des class
console.log(donald.classList);
console.log(donald.className);
donald.className = "title demo"
console.log(donald.className);
console.log(donald.classList);

donald.classList.add("hello");
console.log(donald.classList);
donald.classList.remove("title");
donald.classList.replace("hello", "bonjour");
console.log(donald.classList);
console.log(donald.className);
donald.classList.toggle("title");
console.log(donald.className);
console.log(donald.classList);
donald.classList.toggle("title");
console.log(donald.className);
console.log(donald.classList);

// Attributs
console.log(donald.attributes);
console.log(donald.attributes['id']);
console.log(donald.attributes['class']);

console.log(donald.innerHTML);
console.log(donald.innerText);
console.log(donald.outerHTML);

console.log(donald.getAttribute('class'));
console.log(donald.hasAttribute('class'));
console.log("set attribute class to 'pomme'");
donald.setAttribute('class', 'pomme');
console.log(donald.getAttribute('class'));
console.log("remove attribute class");
donald.removeAttribute('class');
console.log(donald.hasAttribute('class'));
console.log(donald.getAttribute('class'));

// Attributs qui appartienne à la node
console.log(donald.firstElementChild);
console.log(donald.lastElementChild);

let ul = document.querySelector('ul');
console.log(ul.firstElementChild);
console.log(ul.lastElementChild);

console.log(ul.firstChild);
console.log(ul.lastChild);

console.log(ul.childNodes);
console.log(ul.children);

console.log(donald.firstElementChild); // <span> ...
console.log(donald.lastElementChild); // <span>
console.log(donald.firstChild); // Donald
console.log(donald.lastChild); // asdasdaf

const riri = ul.firstElementChild;
console.log(riri);
let fifi = riri.nextElementSibling;
console.log(fifi);
let loulou = fifi.nextElementSibling;
console.log(loulou);
let riri2 = fifi.previousElementSibling;
console.log(riri2);

console.log(riri.parentNode);
console.log(riri.parentElement);

// Creation d'un élément en JS
let elem = document.createElement('li');
elem.id = 'ajout';
elem.className = 'demo';
elem.innerText = "<span>Zaza</span>";

let elem2 = document.createElement('li');
elem2.id = 'ajout2';
elem2.className = 'demo';
elem2.innerHTML = "<span>Minie</span>";

ul.appendChild(elem);
ul.appendChild(elem2);

let elem3 = document.createElement('li');
elem3.id = 'ajout2';
elem3.className = 'demo';
elem3.innerHTML = "<span>Mickey</span>";

ul.insertBefore(elem3, elem);

let ulul = document.querySelector('ul > ul');

const cloneELem = donald.cloneNode();
const compleCloneELem = donald.cloneNode(true);

// !! si un child existe déjà il va juste le déplacer à sa nouvelle position.
ulul.appendChild(compleCloneELem);
ulul.appendChild(cloneELem);
ulul.appendChild(compleCloneELem);

// replacer une node.
ulul.replaceChild(compleCloneELem, cloneELem);

// retirer une node
ulul.removeChild(compleCloneELem);
