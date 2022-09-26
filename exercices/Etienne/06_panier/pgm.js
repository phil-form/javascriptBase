const tprod  = document.getElementById("tblprod");
const panier = document.getElementById("panier");

class Produit {
    constructor(desc, prix) {
        this.desc = desc;
        this.prix = prix;
    }
}

class Panier {
    constructor(prod, prix, qte) {
        this.prod = prod;
        this.prix = prix;
        this.qte  = qte ;
    } 
}
let tot = new Panier("T O T A L", 0, -1);

// chargement des produits
let produits = JSON.parse(sessionStorage.getItem("produits"));
produits = produits ? produits : {};
for (const prd in produits)
{
    produits[prd] = new Produit(produits[prd].desc, produits[prd].prix);
}

let TheIdx = 0;

// en-tête tableau du panier
let ph   = document.createElement("thead");
let trp  = document.createElement("tr");
let tdh1 = document.createElement("th");
tdh1.innerHTML = "Produit"
trp.appendChild(tdh1);
let tdh2 = document.createElement("th");
tdh2.innerHTML = "Qté"
trp.appendChild(tdh2);
let tdh3 = document.createElement("th");
tdh3.innerHTML = "Prix"
trp.appendChild(tdh3);
let tdh4 = document.createElement("th");
tdh4.innerHTML = "Retrait"
trp.appendChild(tdh4);
ph.appendChild(trp);
panier.appendChild(ph);

let pan = document.createElement("tbody");
let pf  = document.createElement("tfoot");

// chargement et affichage du panier
let achats = JSON.parse(sessionStorage.getItem("achats"));
achats = achats ? achats : {};
for (const ach in achats)
{
    achats[ach] = new Panier(achats[ach].prod, achats[ach].prix, achats[ach].qte);
}
ShowPanier();

// en-tête du tableau des produits
let thd = document.createElement("thead");

let th = document.createElement("tr");

let th0 = document.createElement("th");
th0.innerHTML = "";
th.appendChild(th0);

let th1 = document.createElement("th");
th1.innerHTML = "Produit";
th.appendChild(th1);

let th2 = document.createElement("th");
th2.innerHTML = "Prix";
th.appendChild(th2);

let th3 = document.createElement("th");
th3.innerHTML = "Quantité";
th.appendChild(th3);

thd.appendChild(th);

tprod.appendChild(thd);

let tb = document.createElement("tbody");

let idx = 0;

// bouton de l'ajout d'un produit
let btnaddprd = document.getElementById("btnaddprd");
btnaddprd.addEventListener("click", e => {
    e.preventDefault();

    let proddesc = document.getElementById("proddesc");
    let prodprix = document.getElementById("prodprix");
    let prd = new Produit(proddesc.value, parseInt(prodprix.value));
    produits[prd.desc] = prd;
    sessionStorage.setItem("produits", JSON.stringify(produits));
    ShowProds();
    proddesc.value = "";
    prodprix.value = "";
})

// affichage initial des produits
ShowProds();

// appelée chaque fois qu'on crée ou supprile un produit
function ShowProds()
{
    // tout effacer
    while (tb.firstChild) {
        tb.removeChild(tb.firstChild);
    }

    for (const prod in produits) {
        idx = idx + 1;
        let tr = document.createElement("tr");

        // colone 0: bouton de supprerssion du produit
        let td0 = document.createElement("td");
        let frd = document.createElement("form");
        frd.id     = `frmdel_${idx}`;
        frd.method = "post"

        // 0: bouton
        let brm   = document.createElement("input");
        brm.type  = "submit";
        brm.name  = `brm_${idx}`
        brm.id    = `brm_${idx}`
        brm.value = "Supprimer produit"
        brm.addEventListener("click", e => {
            e.preventDefault();
        
            delete achats  [produits[prod].desc];
            delete produits[produits[prod].desc];
            sessionStorage.setItem("produits", JSON.stringify(produits));
            sessionStorage.setItem("achats"  , JSON.stringify(achats  ));
            ShowProds();
            ShowPanier();
        })
        frd.appendChild(brm);
        td0.appendChild(frd);
        tr.appendChild(td0);

        // colone 1: description
        let td1 = document.createElement("td");
        td1.innerHTML = produits[prod].desc;
        tr.appendChild(td1);

        // colone 2: prix
        let td2 = document.createElement("td");
        td2.innerHTML = produits[prod].prix;
        tr.appendChild(td2);

        // colone 3: formulaire avec qté et bouton d'ajout
        let td3 = document.createElement("td");
        let frm = document.createElement("form");
        frm.id     = `frmprod_${idx}`;
        frm.method = "post"

        // 3: qté
        let qte  = document.createElement("input");
        qte.type = "number";
        qte.name = `qte_${idx}`
        qte.id   = `qte_${idx}`
        frm.appendChild(qte);

        // 3: bouton ajout
        let bta   = document.createElement("input");
        bta.type  = "submit";
        bta.name  = `bta_${idx}`
        bta.id    = `bta_${idx}`
        bta.value = "Ajouter"
        bta.addEventListener("click", e => {
            e.preventDefault();
        
            const prd = produits[prod];
            const qty = parseInt(qte.value);
            qte.value = "";
            if (!achats[prd.desc]) {
                achats[prd.desc] = new Panier(prd.desc, 0, 0);   
            }
            achats[prd.desc].prix += (qty * prd.prix);
            achats[prd.desc].qte  +=  qty            ;
            if (achats[prd.desc].qte <= 0) {
                delete achats[prd.desc];
            }
            sessionStorage.setItem("achats", JSON.stringify(achats));
            ShowPanier();
        })
        frm.appendChild(bta);

        td3.appendChild(frm);
        tr.appendChild(td3);

        tb.appendChild(tr);
    }

    tprod.appendChild(tb);
}

// appelée chaque fois qu'on modifie le pannier
function ShowPanier()
{
    // tout supprimer, y compris le footer
    while (pan.firstChild) {
        pan.removeChild(pan.firstChild);
    }
    if (pf.firstChild) {
        pf.removeChild(pf.firstChild);
    }

    // prix tital
    tot.prix = 0;

    // tous les achats
    let idx = 0;
    for (let itemp in achats) {
        let trp = document.createElement("tr")

        idx += 1;
    
        // colone 1: desc
        let tdp1 = document.createElement("td");
        tdp1.innerHTML = achats[itemp].prod;
        trp.appendChild(tdp1);

        // colone 2: qté
        let tdp3 = document.createElement("td");
        tdp3.innerHTML = achats[itemp].qte
        trp.appendChild(tdp3);

        // colone 3: prix
        let tdp2 = document.createElement("td");
        tdp2.innerHTML = achats[itemp].prix
        trp.appendChild(tdp2);

        // colone 4: formulaire avec qté et bouton de retrait
        let tdp4 = document.createElement("td");
        let frr = document.createElement("form");
        frr.id     = `frmretr_${idx}`;
        frr.method = "post"

        // 4: qté
        let qtr  = document.createElement("input");
        qtr.type = "number";
        qtr.name = `qtr_${idx}`
        qtr.id   = `qtr_${idx}`
        frr.appendChild(qtr);

        // 4: bouton retrait
        let btr   = document.createElement("input");
        btr.type  = "submit";
        btr.name  = `btr_${idx}`
        btr.id    = `btr_${idx}`
        btr.value = "Retirer"
        btr.addEventListener("click", e => {
            e.preventDefault();
        
            const prd = achats[itemp].prod;
            const qty = parseInt(qtr.value);
            qtr.value = "";
            achats[prd].prix -= (qty * produits[prd].prix);
            achats[prd].qte  -=  qty                      ;
            if (achats[prd].qte <= 0) {
                delete achats[prd];
            }
            sessionStorage.setItem("achats", JSON.stringify(achats));
            ShowPanier();
        })
        frr.appendChild(btr);

        tdp4.appendChild(frr);
        trp.appendChild(tdp4);

        // prix total
        tot.prix += achats[itemp].prix;
    
        pan.appendChild(trp);
    }

    panier.appendChild(pan);

    // footer: total line
    let trp = document.createElement("tr");

    // colone 1 & 2: total
    let tdt1 = document.createElement("th");
    tdt1.colSpan   = 2;
    tdt1.innerHTML = tot.prod;
    trp.appendChild(tdt1);

    // colone 3: prix
    let tdt2 = document.createElement("th");
    tdt2.innerHTML = tot.prix
    trp.appendChild(tdt2);

    pf.appendChild(trp);

    panier.appendChild(pf);
}
