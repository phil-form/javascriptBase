import * as Utl from "./utilities.js";

export class Panier {
    constructor(email, prod, prix, qte) {
        this.email = email; // unique
        this.prod  = prod;  // = desc from Produit
        this.prix  = prix;  // unit price
        this.qte   = qte ;
    } 
}

export let bask  = {};

// load basket from storage, or reset basket array
export function loadBasket()
{
    bask = JSON.parse(sessionStorage.getItem(Utl.storBsk));
    if (!bask)
    {
        // not yet any item in basket
        bask = {};
        return;
    }

    // already some items in basket
    for (let bsk in bask)
    {
        bask[bsk] = new Panier(bask[bsk].email, bask[bsk].prod, bask[bsk].prix, bask[bsk].qte);
    }

} // loadBasket

export function showBasket()
{
    let opbody = Utl.clr("Basket", true);

    let slctUsr = Utl.getUserSelected();

    // table & header
    let tbask = document.createElement("table");
    tbask.className = "table";
    opbody.appendChild(tbask);
    tbask.appendChild(Utl.tbHeader(["Product", "Qantity", "Unit Price", "Remove"]));

    // body
    let tbbask = document.createElement("tbody");
    tbask.appendChild(tbbask);

    let idx = 0;
    let tot = 0;
    for (let item in bask)
    {
        // process only basket items for selected user
        if (bask[item].email == slctUsr.email)
        {
            idx += 1;
            let tr = document.createElement("tr");
            tbbask.appendChild(tr);

            // col 1-3: data from bask
            tr.appendChild(Utl.addCell(bask[item].prod));
            tr.appendChild(Utl.addCell(bask[item].qte));
            tr.appendChild(Utl.addCell(bask[item].prix));

            // col 4: qty to remove & button
            let td4 = document.createElement("td");
            tr.appendChild(td4);
            td4.appendChild(Utl.addInput ("number", "qtyrem", idx));
            td4.appendChild(Utl.addButton("Remove", "rem"   , idx, "btn btn-danger"));

            // compute total
            tot += (bask[item].qte * bask[item].prix);

            // button remove
            let btnrem = document.getElementById(`btnrem${idx}`)
            btnrem.addEventListener("click", e => {
                e.preventDefault();

                // get list row number
                let idx = Utl.getLitsId(btnrem);
                // get item from array
                let itm = Utl.getBaskItmByN(idx);
                // get qty from screen
                let qty = document.getElementById(`qtyrem${idx}`);
                // check
                if (Utl.notCheck(qty.value.trim()    ==  "" , 'Field on the left must be filled'  )) return;
                if (Utl.notCheck(parseInt(qty.value) === NaN, 'Field on the left must be a number')) return;
                if (Utl.notCheck(parseInt(qty.value) <=   0 , 'Field on the left must be positive')) return;
                // update item in array
                itm.qte -= parseInt(qty.value);
                // no more ? remove !
                if (itm.qte <= 0)
                {
                    delete bask[itm.prod];
                }
                // update storage
                sessionStorage.setItem(Utl.storBsk, JSON.stringify(bask));
                // refresh page
                showBasket();

            }) // btnrem.addEventListener("click",

        } // if (bask[item].email == slctUsr.email)

    } // for (let item in bask)

    // footer, for total price
    let tfbask = document.createElement("tfoot");
    tbask.appendChild(tfbask);
    let tr = document.createElement("tr");
    tfbask.appendChild(tr);
    let tf1 = document.createElement("th");
    tr.appendChild(tf1);
    tf1.colSpan = 2;
    tf1.innerText = "TOTAL PRICE"
    let tf3 = document.createElement("th");
    tr.appendChild(tf3);
    tf3.innerText = tot;

} // showBasket
