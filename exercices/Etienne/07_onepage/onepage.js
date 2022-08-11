let opbody = document.getElementById("thebody")

class User {
    constructor(first, last, email) {
        this.firstname = first;
        this.lastname  = last;
        this.email     = email; // unique
    }
}

class Produit {
    constructor(desc, prix) {
        this.desc = desc;
        this.prix = prix;
    }
}

class Panier {
    constructor(email, prod, prix, qte) {
        this.email = email; // unique
        this.prod  = prod;  // = desc from Produit
        this.prix  = prix;  // unit price
        this.qte   = qte ;
    } 
}

// for sessionStorage
let storUsr   = "opusers";
let storPrd   = "opprods";
let storBsk   = "opbasket";
let storSlct  = "opselected";
let storEmail = "opemail";

// global data
let users = [];
let prods = {};
let bask  = {};

// start
sessionStorage.setItem(storSlct , "");
sessionStorage.setItem(storEmail, "");
navMenu();
loadData();
home();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// start functions /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// called only once ...
function navMenu()
{
    let nm  = document.getElementById("navmenu");
    let sp  = document.createElement ("span"   );
    sp.appendChild(addMenu("Home"         ));
    sp.appendChild(addMenu("Create User"  ));
    sp.appendChild(addMenu("Users List"   ));
    sp.appendChild(addMenu("Products List"));
    sp.appendChild(addMenu("Basket"       ));
    nm.appendChild(sp);

    let bth = document.getElementById("navhome"        );
    let btc = document.getElementById("navcreateuser"  );
    let btl = document.getElementById("navuserslist"   );
    let btp = document.getElementById("navproductslist");
    let btb = document.getElementById("navbasket"      );

    bth.addEventListener("click", e => {
        e.preventDefault();

        home();
    })

    btc.addEventListener("click", e => {
        e.preventDefault();

        addEditUser(-1);
    })

    btl.addEventListener("click", e => {
        e.preventDefault();

        usersList();
    })

    btp.addEventListener("click", e => {
        e.preventDefault();

        productsList();
    })

    btb.addEventListener("click", e => {
        e.preventDefault();

        showBasket();
    })

} // navMenu

// load all data from storage
function loadData()
{
    loadUsers();
    loadProds();
    loadBasket();

} // loadData

// load users from storage, or reste users array
function loadUsers()
{
    users = JSON.parse(sessionStorage.getItem(storUsr));
    if (!users)
    {
        // not yet any user
        users = [];
        return;
    }

    // already some users
    for (let usr in users)
    {
        users[usr] = new User(users[usr].firstname, users[usr].lastname, users[usr].email);
    }

} // loadUsers

// load products from storage, or reset products array
function loadProds()
{
    prods = JSON.parse(sessionStorage.getItem(storPrd));
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

// load basket from storage, or reset basket array
function loadBasket()
{
    bask = JSON.parse(sessionStorage.getItem(storBsk));
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// main functions, from menu ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// show list of users if any, or ask to create first one
function home()
{
    if (users.length)
    {
        usersList();
    }
    else
    {
        addEditUser(-1);
    }

} // home

// create a new user or edit an existing one
//   idx: -1  : create a new one
//        >= 0: edit existing one, idx is the index in array users: [0 - (n-1)]
function addEditUser(idx)
{
    clr((idx == -1) ? "Create user" : "Update user");

    let frnew = document.createElement("form");
    let tb    = document.createElement("table");

    // input fields
    tb.appendChild(addTrLblInput("frstnm", "Firstname: "));
    tb.appendChild(addTrLblInput("lastnm", "Lastname: " ));
    tb.appendChild(addTrLblInput("email" , "E-mail: "   ));

    // button
    let rbtn = document.createElement("tr");
    let cbtn = document.createElement("td");
    cbtn.colSpan = 2;
    let ibtn = addButton((idx == -1) ? "Create" : "Update", "newusr", -1, "btn btn-warning"  );
    let iccl = addButton(              "Cancel"           , "cancel", -1, "btn btn-secondary");
    cbtn.appendChild(ibtn);
    cbtn.appendChild(iccl);
    rbtn.appendChild(cbtn);
    tb.appendChild(rbtn);
    frnew.appendChild(tb);

    opbody.appendChild(frnew);

    if (idx > -1) // edit mode: set values to input fields
    {
        let usr  = users[idx];
        let fn   = document.getElementById("frstnm");
        fn.value = usr.firstname;
        let ln   = document.getElementById("lastnm");
        ln.value = usr.lastname;
        let em   = document.getElementById("email");
        em.value = usr.email;

    } // if (idx > -1)

    ibtn.addEventListener("click", e => {
        e.preventDefault();

        // get list of existing e-mails, to check unicity of new one
        let emls = {};
        for (let usr in users)
        {
            emls[users[usr].email] = users[usr];
        }

        // get values from screen
        let fnm = document.getElementById("frstnm").value;
        let lnm = document.getElementById("lastnm").value;
        let eml = document.getElementById("email" ).value;
    
        // check
        if (fnm.trim() == "") return;
        if (lnm.trim() == "") return;
        if (eml.trim() == "") return;
        if (eml.match("[A-Za-z]+[A-Za-z0-9_\-]*@[A-Za-z0-9]+\.[a-z]{2,3}") === null) return;
        if (emls[eml]) return;

        // va bene !
        if (idx == -1)
        {
            // create
            let usr = new User(fnm, lnm, eml);
            users.push(usr);
        }
        else
        {
            // update
            let usr = users[idx];
            usr.firstname = fnm;
            usr.lastname  = lnm;
            usr.email     = eml;
        }
        // save data
        sessionStorage.setItem(storUsr, JSON.stringify(users));
        // display all users
        usersList();

    }) // ibtn.addEventListener("click", e

    iccl.addEventListener("click", e => {
        e.preventDefault();

        // back to users list
        usersList();

    }) // ibtn.addEventListener("click", e

} // addEditUser

// display list of users in a array:
//   for each user buttons for info, edit, remove
//   below  button to add
function usersList()
{
    clr("Users list", true);

    // table
    let tbl = document.createElement("table");
    tbl.className = "table";
    tbl.id        = "tblusers"
    tbl.appendChild(tbHeader(["", "#", "Firstname", "Lastname", "Email", "Actions"]));

    // body
    let tbb = document.createElement("tbody");

    let idx = 0;
    for (let usr in users)
    {
        idx += 1;
        let tr = document.createElement("tr");
        tr.id = idx.toString();
    
        // col 0: select
        let td0 = document.createElement("td");
        let btselect = addButton("Select =>", "select", idx, "btn btn-success");
        td0.appendChild(btselect);
        tr.appendChild(td0);
    
        // cols 1 to 4: fields
        tr.appendChild(addCell(idx.toString()      ));
        tr.appendChild(addCell(users[usr].firstname));
        tr.appendChild(addCell(users[usr].lastname ));
        tr.appendChild(addCell(users[usr].email    ));

        // col 5: buttons
        let td5 = document.createElement("td");

        let btinfo = addButton("Info"  , "info", idx, "btn btn-info");
        let btedit = addButton("Edit"  , "edit", idx, "btn btn-warning");
        let btdel  = addButton("Remove", "rem" , idx, "btn btn-danger");

        td5.appendChild(btinfo);
        td5.appendChild(btedit);
        td5.appendChild(btdel );

        tr.appendChild(td5);

        // add row to body
        tbb.appendChild(tr);

        btselect.addEventListener("click", e => {
            e.preventDefault();

            let id  = getLitsId(btinfo);
            let usr = users[id - 1];
            sessionStorage.setItem(storSlct , `${usr.firstname} ${usr.lastname}`);
            sessionStorage.setItem(storEmail, usr.email);
            // refresh
            usersList();
        })
    
        btinfo.addEventListener("click", e => {
            e.preventDefault();

            let id = getLitsId(btinfo);
            show1user(id);
        })
    
        btedit.addEventListener("click", e => {
            e.preventDefault();
            
            let id = getLitsId(btinfo);
            editUser(id);
        })
    
        btdel.addEventListener("click", e => {
            e.preventDefault();
            
            let id = getLitsId(btinfo);
            delUser(id);
        })

    } // for (let usr in users)

    // add body to table
    tbl.appendChild(tbb);

    // footer
    let tbf = document.createElement("tfoot");
    let tfr = document.createElement("tr");

    // cols 0-4: niks
    let tfd1 = document.createElement("th");
    tfd1.colSpan = 5;
    tfr.appendChild(tfd1);

    // col 5: button
    let tfd5 = document.createElement("th");
    let btad = addButton("Add", "add", 0, "btn btn-primary");
    tfd5.appendChild(btad);

    // cell to row, row to footer, footer to table
    tfr.appendChild(tfd5);
    tbf.appendChild(tfr);
    tbl.appendChild(tbf);

    // table to page
    opbody.appendChild(tbl);

    btad.addEventListener("click", e => {
        e.preventDefault();

        addEditUser(-1);
    })

} // usersList

function show1user(idx)
// idx is the row number from list on page: [1 - n] 
// the index in users is [0 - (n-1)]
{
    clr("This User");

    let usr = users[idx - 1];
    let h3 = document.createElement("h3");
    h3.innerText = `${idx} ${usr.firstname} ${usr.lastname} ${usr.email}`;
    opbody.appendChild(h3);

} // show1user

function productsList()
{
    clr("Products List", true);

    let slctUsr = getUserSelected();

    // table and its header
    let tbprd       = document.createElement("table");
    opbody.appendChild(tbprd);
    tbprd.className = "table";
    tbprd.appendChild(tbHeader(["", "Description", "Price", "Quantity"]));

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
        td0.appendChild(addButton("Delete", "prem", idx, "btn btn-danger"));
        tr.appendChild(td0);

        // col 1-2: description & price
        tr.appendChild(addCell(prods[prd].desc));
        tr.appendChild(addCell(prods[prd].prix));

        // col 3: qty & add button
        let td3  = document.createElement("td");
        let iqty = addInput("number", "pqty_", idx);
        td3.appendChild(iqty);
        td3.appendChild(addButton("Add", "padd", idx, "btn btn-primary", slctUsr ? "enabled" : "hidden"));
        tr.appendChild(td3);

        // add row to table body
        tbbprd.appendChild(tr);

        // button remove product from products array
        let btprem = document.getElementById(`btnprem${idx}`);
        btprem.addEventListener("click", e => {
            e.preventDefault();

            // delete product: also delete from basket, if any
            delete bask [prods[prd].desc];
            delete prods[prods[prd].desc];
            // both modified, both saved
            sessionStorage.setItem(storPrd, JSON.stringify(prods));
            sessionStorage.setItem(storBsk, JSON.stringify(bask ));
            // refresh page
            productsList();

        }) // btprem.addEventListener("click",
    
        // button add qty of product to basket
        let btpadd = document.getElementById(`btnpadd${idx}`);
        btpadd.addEventListener("click", e => {
            e.preventDefault();

            // check
            if (iqty.value.trim()    ==  "" ) return;
            if (parseInt(iqty.value) === NaN) return;
            if (parseInt(iqty.value) <=   0 ) return;

            // get product and qty
            let pr  = prods[prd];
            let qty = parseInt(iqty.value);
            iqty.value = "";    // reset qty on screen for next use
            // already in basket ?
            if (!bask[pr.desc])
            {
                // create empty
                bask[pr.desc] = new Panier(slctUsr.email, pr.desc, 0, 0)
            }
            // update
            bask[pr.desc].qte  +=    qty ;
            bask[pr.desc].prix  = pr.prix;
            // no more ? (means qty < 0)
            if (bask[pr.desc].qte <= 0)
            {
                // remove
                delete bask[pr.desc];
            }
            // update basket
            sessionStorage.setItem(storBsk, JSON.stringify(bask));
            // refresh page
            productsList();

        }) // btpadd.addEventListener("click",
    
    } // for (prd in prods)

    // footer: to create new product
    let tbfprd = document.createElement("tfoot");
    let tfr    = document.createElement("tr");

    // col 0: button create product
    let tf0 = document.createElement("td");
    tf0.appendChild(addButton("New Product", "nprod", -1, "btn btn-primary"));
    tfr.appendChild(tf0);

    // col 1 & 2: desc & price, hidden !
    let tf1 = document.createElement("td");
    tf1.appendChild(addInput("text", "prddesc", -1, "hidden"));
    tfr.appendChild(tf1);

    let tf2 = document.createElement("td");
    tf2.appendChild(addInput("number", "prdprix", -1, "hidden"));
    tfr.appendChild(tf2);

    // col 3: buttons submit & cancel, hidden !
    let tf3 = document.createElement("td");
    tf3.appendChild(addButton("Create", "cprod" , -1, "btn btn-primary"  , "hidden"));
    tf3.appendChild(addButton("Cancel", "cancel", -1, "btn btn-secondary", "hidden"));
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
        if (inpdesc.value.trim()    ==  "" ) return;
        if (inpprix.value.trim()    ==  "" ) return;
        if (parseInt(inpprix.value) === NaN) return;
        if (parseInt(inpprix.value) <=   0 ) return;
        // create product
        let prd = new Produit(inpdesc.value, parseInt(inpprix.value));
        // add to array and storage
        prods[prd.desc] = prd;
        sessionStorage.setItem(storPrd, JSON.stringify(prods));
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

function showBasket()
{
    clr("Basket", true);

    let slctUsr = getUserSelected();

    // table & header
    let tbask = document.createElement("table");
    tbask.className = "table";
    opbody.appendChild(tbask);
    tbask.appendChild(tbHeader(["Product", "Qantity", "Unit Price", "Remove"]));

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
            tr.appendChild(addCell(bask[item].prod));
            tr.appendChild(addCell(bask[item].qte));
            tr.appendChild(addCell(bask[item].prix));

            // col 4: qty to remove & button
            let td4 = document.createElement("td");
            tr.appendChild(td4);
            td4.appendChild(addInput ("number", "qtyrem", idx));
            td4.appendChild(addButton("Remove", "rem"   , idx, "btn btn-danger"));

            // compute total
            tot += (bask[item].qte * bask[item].prix);

            // button remove
            let btnrem = document.getElementById(`btnrem${idx}`)
            btnrem.addEventListener("click", e => {
                e.preventDefault();

                // get list row number
                let idx = getLitsId(btnrem);
                // get item from array
                let itm = getBaskItmByN(idx);
                // get qty from screen
                let qty = document.getElementById(`qtyrem${idx}`);
                // check
                if (qty.value.trim()    ==  "" ) return;
                if (parseInt(qty.value) === NaN) return;
                if (parseInt(qty.value) <=   0 ) return;
                // update item in array
                itm.qte -= parseInt(qty.value);
                // no more ? remove !
                if (itm.qte <= 0)
                {
                    delete bask[itm.prod];
                }
                // update storage
                sessionStorage.setItem(storBsk, JSON.stringify(bask));
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

function editUser(idx)
// idx is the row number: [1 - n] 
// the index in users is [0 - (n-1)]
{
    addEditUser(idx - 1);
}

function delUser(idx)
// idx is the row number: [1 - n] 
// the index in users is [0 - (n-1)]
{
    delete users[idx - 1];
    sessionStorage.setItem(storUsr, JSON.stringify(users));
    usersList();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// utilities ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// clear all, then set title
//   tt : not empty: title
//        empty    : no title to display
//   usr: true : add selected user, if any
//        false: don't 
function clr(tt, usr = false)
{
    // clear body
    while (opbody.firstChild)
    {
        opbody.removeChild(opbody.firstChild);
    }

    // title
    if (tt == "") return;

    let t = document.createElement("h1");
    t.innerText = tt;
    if (usr)
    {
        let user = sessionStorage.getItem(storSlct);
        if (user != "")
        {
            t.innerText = `${t.innerText} (${user})`;
        }
    }
    opbody.appendChild(t);

} // clr

// create a "button" with name "navtxt", where txt is the parameter in lowercases and without any spaces
// the text on the button is txt, with cases and spaces as given
function addMenu(txt)
{
    let btn = txt.toLowerCase().replace(" ", "");
    btn = `nav${btn}`;

    let a    = document.createElement("a");
    a.href   = "#";
    let bt   = document.createElement("input");
    bt.type  = "submit";
    bt.id    = btn;
    bt.value = txt;
    bt.className = "btn btn-link"
    a.appendChild(bt);

    return a;

} // addMenu

// create and return table header
//   titles: array of columns title
function tbHeader(titles)
{
    // header
    let tbh = document.createElement("thead");
    let trh = document.createElement("tr");
    for (let tit in titles)
    {
        let th = document.createElement("th");
        th.innerText = titles[tit];
        trh.appendChild(th);
    }
    tbh.appendChild(trh);

    return tbh;

} // tbHeader

// create and return an array cell with data
function addCell(val)
{
    let td = document.createElement("td");
    td.innerText = val;

    return td;

} // addCell

// create and return an input field
//   tp  : type of input
//   id  : name and id of input
//   idx : row number (will be used to addEventListener)
//   attr: other attribute, without value, like "hidden", "disabled", default no attribute
function addInput(tp, id, idx = -1, attr = "")
{
    let inp = document.createElement("input");
    inp.type = tp;
    inp.name = id;
    inp.id   = id;
    if (idx > -1)
    {
        inp.id = `${inp.id}${idx}`;
    }
    if (attr != "")
    {
        inp.setAttribute(attr, "");
    }
    
    return inp;

} // addInput

// create and return "button", with button id composed of: but id idx (without any spaces betwwen parts)
//   lbl : button text
//   id  : HTML id (will be used to addEventListener)
//   idx : row number (will be used to addEventListener)
//   cls : class, default no class
//   attr: other attribute, without value, like "hidden", "disabled", default no attribute
function addButton(lbl, id, idx, cls = "", attr = "")
{
    let btn       = document.createElement("a");
    btn.type      = "submit";
    btn.innerText = lbl;
    btn.id        = `btn${id}`;
    if (idx > -1)
    {
        btn.id = `${btn.id}${idx}`;
    }
    if (cls != "")
    {
        btn.className = cls;
    }
    if (attr != "")
    {
        btn.setAttribute(attr, "");
    }

    return btn;

} // addButton

// create and return a table row with a label and an input
//   id   : HTML id of input
//   label: shown in label
function addTrLblInput(id, label)
{
    let tr = document.createElement("tr");

    // label
    let td1 = document.createElement("td");
    let lbl = document.createElement("label");
    lbl.for       = id;
    lbl.innerText = label;
    td1.appendChild(lbl);
    tr.appendChild(td1);

    // input
    let td2 = document.createElement("td");
    let inp = document.createElement("input");
    inp.type        = "text";
    inp.name        = id;
    inp.id          = id;
    td2.appendChild(inp);
    tr.appendChild(td2);

    return tr;

} // addTrLblInput

// get row id from button name
//   btn: button name, ends with row id
function getLitsId(btn)
{
    let idbt = btn.id;
    let i = idbt.length;    // 8 chars: from 0 to 7
    while (("0" <= idbt.substr(i - 1)) && (idbt.substr(i - 1) <= "9"))
    {
        i -= 1;
    }
    idbt = idbt.substr(i);

    return parseInt(idbt);

} // getLitsId

// get item idx from bask, by browsing dictionary
//   idx: number
function getBaskItmByN(idx)
{
    let itm = ""
    let i   = 0;
    for (let it in bask)
    {
        i += 1;
        if (i == idx)
        {
            itm = bask[it];
        }
    } // for (let it in bask)

    return itm;

} // getBaskItmByN

// return null if no user selected
//        User if user selected
function getUserSelected()
{
    let slct = sessionStorage.getItem(storEmail);
    if (!slct) return null;

    for (let usr in users)
    {
        if (users[usr].email == slct) return users[usr];
    }

    return null;

} // getUserSelected
