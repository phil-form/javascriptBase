import * as Utl from "./utilities.js";

import * as Bk  from "./basket.js";

export class Produit {
    constructor(desc, prix) {
        this.desc = desc;
        this.prix = prix;
    }
}

export let prods = {};

// load products from storage, or reset products array
export function loadProds()
{
    prods = JSON.parse(sessionStorage.getItem(Utl.storPrd));
    if (!prods)
    {
        // not yet any product
        prods = {};
        return;
    }

    // already some products
    for (let prd in prods)
    {
        prods[prd] = new Produit(prods[prd].desc, prods[prd].prix);
    }

} // loadProds

export function productsList()
{
    let opbody = Utl.clr("Products List", true);

    let slctUsr = Utl.getUserSelected();

    // table and its header
    let tbprd       = document.createElement("table");
    opbody.appendChild(tbprd);
    tbprd.className = "table";
    tbprd.appendChild(Utl.tbHeader(["", "Description", "Price", "Quantity"]));

    // table body
    let tbbprd = document.createElement("tbody");
    tbprd.appendChild(tbbprd);

    let idx = 0;
    for (let prd in prods)
    {
        idx += 1;
        let tr = document.createElement("tr");

        // col 0: button to remove product
        let td0   = document.createElement("td");
        td0.appendChild(Utl.addButton("Delete", "prem", idx, "btn btn-danger"));
        tr.appendChild(td0);

        // col 1-2: description & price
        tr.appendChild(Utl.addCell(prods[prd].desc));
        tr.appendChild(Utl.addCell(prods[prd].prix));

        // col 3: qty & add button
        let td3  = document.createElement("td");
        let iqty = Utl.addInput("number", "pqty_", idx);
        td3.appendChild(iqty);
        td3.appendChild(Utl.addButton("Add", "padd", idx, "btn btn-primary", slctUsr ? "enabled" : "hidden"));
        tr.appendChild(td3);

        // add row to table body
        tbbprd.appendChild(tr);

        // button remove product from products array
        let btprem = document.getElementById(`btnprem${idx}`);
        btprem.addEventListener("click", e => {
            e.preventDefault();

            // delete product: also delete from basket, if any
            delete Bk.bask[prods[prd].desc];
            delete prods  [prods[prd].desc];
            // both modified, both saved
            sessionStorage.setItem(Utl.storPrd, JSON.stringify(prods  ));
            sessionStorage.setItem(Utl.storBsk, JSON.stringify(Bk.bask));
            // refresh page
            productsList();

        }) // btprem.addEventListener("click",
    
        // button add qty of product to basket
        let btpadd = document.getElementById(`btnpadd${idx}`);
        btpadd.addEventListener("click", e => {
            e.preventDefault();

            // check
            if (Utl.notCheck(iqty.value.trim()    ==  "" , 'Field "Quantity" must be filled'           )) return;
            if (Utl.notCheck(parseInt(iqty.value) === NaN, 'Field "Quantity" must be is not a number'  )) return;
            if (Utl.notCheck(parseInt(iqty.value) <=   0 , 'Field "Quantity" must be a positive number')) return;

            // get product and qty
            let pr  = prods[prd];
            let qty = parseInt(iqty.value);
            iqty.value = "";    // reset qty on screen for next use
            // already in basket ?
            if (!Bk.bask[pr.desc])
            {
                // create empty
                Bk.bask[pr.desc] = new Panier(slctUsr.email, pr.desc, 0, 0)
            }
            // update
            Bk.bask[pr.desc].qte  +=    qty ;
            Bk.bask[pr.desc].prix  = pr.prix;
            // no more ? (means qty < 0)
            if (Bk.bask[pr.desc].qte <= 0)
            {
                // remove
                delete Bk.bask[pr.desc];
            }
            // update basket
            sessionStorage.setItem(Utl.storBsk, JSON.stringify(Bk.bask));
            // refresh page
            productsList();

        }) // btpadd.addEventListener("click",
    
    } // for (prd in prods)

    // footer: to create new product
    let tbfprd = document.createElement("tfoot");
    let tfr    = document.createElement("tr");

    // col 0: button create product
    let tf0 = document.createElement("td");
    tf0.appendChild(Utl.addButton("New Product", "nprod", -1, "btn btn-primary"));
    tfr.appendChild(tf0);

    // col 1 & 2: desc & price, hidden !
    let tf1 = document.createElement("td");
    tf1.appendChild(Utl.addInput("text", "prddesc", -1, "hidden"));
    tfr.appendChild(tf1);

    let tf2 = document.createElement("td");
    tf2.appendChild(Utl.addInput("number", "prdprix", -1, "hidden"));
    tfr.appendChild(tf2);

    // col 3: buttons submit & cancel, hidden !
    let tf3 = document.createElement("td");
    tf3.appendChild(Utl.addButton("Create", "cprod" , -1, "btn btn-primary"  , "hidden"));
    tf3.appendChild(Utl.addButton("Cancel", "cancel", -1, "btn btn-secondary", "hidden"));
    tfr.appendChild(tf3);

    tbfprd.appendChild(tfr);
    tbprd.appendChild(tbfprd);

    // button new product (left): show fields to fill them
    let btnnprod = document.getElementById("btnnprod");
    btnnprod.addEventListener("click", e => {
        e.preventDefault();

        // hide "New Product", show other fields & button
        let btnnprod  = document.getElementById("btnnprod" );
        let inpdesc   = document.getElementById("prddesc"  );
        let inpprix   = document.getElementById("prdprix"  );
        let btncprod  = document.getElementById("btncprod" );
        let btncancel = document.getElementById("btncancel");
        btnnprod.removeAttribute ("enabled"    );
        btnnprod.setAttribute    ("hidden" , "");
        inpdesc.removeAttribute  ("hidden"     );
        inpdesc.setAttribute     ("enabled", "");
        inpprix.removeAttribute  ("hidden"     );
        inpprix.setAttribute     ("enabled", "");
        btncprod.removeAttribute ("hidden"     );
        btncprod.setAttribute    ("enabled", "");
        btncancel.removeAttribute("hidden"     );
        btncancel.setAttribute   ("enabled", "");

    }) // btnnprod.addEventListener("click",

    // button create product (right 1): fields filled, create
    let btncprod = document.getElementById("btncprod");
    btncprod.addEventListener("click", e => {
        e.preventDefault();

        // get values
        let inpdesc = document.getElementById("prddesc");
        let inpprix = document.getElementById("prdprix");
        // check
        if (Utl.notCheck(inpdesc.value.trim()    ==  "" , 'The field "Description" must be filled'     )) return;
        if (Utl.notCheck(inpprix.value.trim()    ==  "" , 'The field "Price" must be filled'           )) return;
        if (Utl.notCheck(parseInt(inpprix.value) === NaN, 'The field "Price" must be a number'         )) return;
        if (Utl.notCheck(parseInt(inpprix.value) <=   0 , 'The field "Price" must be a positive number')) return;
        // create product
        let prd = new Produit(inpdesc.value, parseInt(inpprix.value));
        // add to array and storage
        prods[prd.desc] = prd;
        sessionStorage.setItem(Utl.storPrd, JSON.stringify(prods));
        // refresh page
        productsList();

    }) // btncprod.addEventListener("click",

    // button cancel product (right 1): fields filled, create
    let btncancel = document.getElementById("btncancel");
    btncancel.addEventListener("click", e => {
        e.preventDefault();

        // refresh page
        productsList();

    }) // btncancel.addEventListener("click",

} // productsList
