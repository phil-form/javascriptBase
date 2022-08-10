let opbody = document.getElementById("thebody")

class User {
    constructor(first, last, email) {
        this.firstname = first;
        this.lastname  = last;
        this.email     = email;
    }
}

let sesstor = "opusers";

// load data from storage
let users = JSON.parse(sessionStorage.getItem(sesstor));
if (users)
{
    // already some data: list
    for (let usr in users)
    {
        users[usr] = new User(users[usr].firstname, users[usr].lastname, users[usr].email);
    }
    showList();
}
else
{
    // not yet any data: create
    users = [];
    addEditUser(-1);
}

// create a new user or edit an existing one
//   idx: -1  : create a new one
//        >= 0: edit existing one, idx is the index in array users: [0 - (n-1)]
function addEditUser(idx)
{
    clr();

    let frnew = document.createElement("form");

    // input fields
    frnew.appendChild(addDivLblInput("frstnm", "Firstname"));
    frnew.appendChild(addDivLblInput("lastnm", "Lastname" ));
    frnew.appendChild(addDivLblInput("email" , "E-mail"   ));

    // button
    let dbtn = document.createElement("div");
    let ibtn = document.createElement("input");
    ibtn.type  = "submit";
    ibtn.name  = "newusr";
    ibtn.id    = "newusr";
    ibtn.value = (idx == -1) ? "Create" : "Update";
    dbtn.appendChild(ibtn);
    frnew.appendChild(dbtn);

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
    }

    ibtn.addEventListener("click", e => {
        e.preventDefault();

        let fnm = document.getElementById("frstnm").value;
        let lnm = document.getElementById("lastnm").value;
        let eml = document.getElementById("email" ).value;
    
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
        sessionStorage.setItem(sesstor, JSON.stringify(users));
        showList();

    }) // ibtn.addEventListener("click", e

} // addEditUser

function showList()
{
    clr();

    // table
    let tbl = document.createElement("table");
    tbl.id  = "tblusers"

    // header
    let tbh    = document.createElement("thead");
    let trh    = document.createElement("tr");
    let titles = ["#", "Firstname", "Lastname", "Email", "Actions"]
    for (let tit in titles)
    {
        let th = document.createElement("th");
        th.innerText = titles[tit];
        trh.appendChild(th);
    }
    tbh.appendChild(trh);
    tbl.appendChild(tbh);

    // body
    let tbb = document.createElement("tbody");

    let idx = 0;
    for (let usr in users)
    {
        idx += 1;
        let tr = document.createElement("tr");
        tr.id = idx.toString();
    
        // fields, cols 1 to 4
        tr.appendChild(addCell(idx.toString()      ));
        tr.appendChild(addCell(users[usr].firstname));
        tr.appendChild(addCell(users[usr].lastname ));
        tr.appendChild(addCell(users[usr].email    ));

        // buttons, col 5
        let td5 = document.createElement("td");
        let act = document.createElement("form");

        let btinfo = addButton("Info"  , "info", idx);
        let btedit = addButton("Edit"  , "edit", idx);
        let btdel  = addButton("Remove", "rem" , idx);

        act.appendChild(btinfo);
        act.appendChild(btedit);
        act.appendChild(btdel );

        td5.appendChild(act);
        tr.appendChild(td5);

        // add row to body
        tbb.appendChild(tr);

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

    // cols 1-4: niks
    let tfd1 = document.createElement("th");
    tfd1.colSpan = 4;
    tfr.appendChild(tfd1);

    // col 5: button
    let tfd5 = document.createElement("th");
    let frad = document.createElement("form");
    let btad = addButton("Add", "add", 0);

    frad.appendChild(btad);
    tfd5.appendChild(frad);

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

} // showList

function show1user(idx)
// idx is the row number from list on page: [1 - n] 
// the index in users is [0 - (n-1)]
{
    clr();

    let usr = users[idx - 1];
    let h3 = document.createElement("h3");
    h3.innerText = `${idx} ${usr.firstname} ${usr.lastname} ${usr.email}`;
    opbody.appendChild(h3);

} // show1user

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
    sessionStorage.setItem(sesstor, JSON.stringify(users));
    showList();
}

// clear all
function clr()
{
    while (opbody.firstChild)
    {
        opbody.removeChild(opbody.firstChild);
    }
}

// called to build main list (all cells, but cell 5 with buttons)
function addCell(val)
{
    let td = document.createElement("td");
    td.innerText = val;

    return td;
}

// called to build main list (all buttons, included "add")
function addButton(lbl, id, idx)
{
    let btn   = document.createElement("input");
    btn.type  = "submit"
    btn.id    = `btn${id}${idx}`;
    btn.value = lbl;

    return btn;
}

// create and return a div with a label and an input
// called for create / update form
//   id   : id of input
//   label: shown in label and placeholder
function addDivLblInput(id, label)
{
    let dv = document.createElement("div");

    let lbl = document.createElement("label");
    lbl.for       = id;
    lbl.innerText = label;
    dv.appendChild(lbl);

    let inp = document.createElement("input");
    inp.type        = "text";
    inp.name        = id;
    inp.id          = id;
    inp.placeholder = label;
    dv.appendChild(inp);

    return dv;

} // addDivLblInput

// get row id from button name
//   btn: button name
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
