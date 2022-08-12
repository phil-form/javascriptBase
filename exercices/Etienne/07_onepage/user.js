import * as Utl from "./utilities.js";

export class User {
    constructor(first, last, email) {
        this.firstname = first;
        this.lastname  = last;
        this.email     = email; // unique
    }
}

export let users = [];

// load users from storage, or reste users array
export function loadUsers()
{
    users = JSON.parse(sessionStorage.getItem(Utl.storUsr));
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

// create a new user or edit an existing one
//   idx: -1  : create a new one
//        >= 0: edit existing one, idx is the index in array users: [0 - (n-1)]
export function addEditUser(idx)
{
    let opbody = Utl.clr((idx == -1) ? "Create user" : "Update user");

    let frnew = document.createElement("form" );
    let tb    = document.createElement("table");

    // input fields
    let fn = Utl.addTrLblInput(tb, "frstnm", "Firstname: ");
    let ln = Utl.addTrLblInput(tb, "lastnm", "Lastname: " );
    let em = Utl.addTrLblInput(tb, "email" , "E-mail: "   );

    // button
    let rbtn = document.createElement("tr");
    let cbtn = document.createElement("td");
    cbtn.colSpan = 2;
    let ibtn = Utl.addButton(cbtn, (idx == -1) ? "Create" : "Update", "newusr", -1, "btn btn-warning"  );
    let iccl = Utl.addButton(cbtn,               "Cancel"           , "cancel", -1, "btn btn-secondary");
    rbtn.appendChild(cbtn);
    tb.appendChild(rbtn);
    frnew.appendChild(tb);

    opbody.appendChild(frnew);

    if (idx > -1) // edit mode: set values to input fields
    {
        let usr  = users[idx];
        fn.value = usr.firstname;
        ln.value = usr.lastname;
        em.value = usr.email;
    }

    ibtn.addEventListener("click", e => {
        e.preventDefault();

        // get values from screen
        let fnm = document.getElementById("frstnm").value;
        let lnm = document.getElementById("lastnm").value;
        let eml = document.getElementById("email" ).value;

        // validate data
        if (!checkFields(fnm, lnm, eml)) return;

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
        sessionStorage.setItem(Utl.storUsr, JSON.stringify(users));
        // display all users
        usersList();

    }) // ibtn.addEventListener("click", e ...)

    iccl.addEventListener("click", e => {
        e.preventDefault();

        // back to users list
        usersList();

    }) // ibtn.addEventListener("click", e ...)

} // addEditUser

// display list of users in a array:
//   for each user buttons for info, edit, remove
//   below  button to add
export function usersList()
{
    let opbody = Utl.clr("Users list", true);

    // table & header
    let tbl = document.createElement("table");
    tbl.className = "table";
    tbl.id        = "tblusers"
    tbl.appendChild(Utl.tbHeader(["", "#", "Firstname", "Lastname", "Email", "Actions"]));

    // body
    let tbb = document.createElement("tbody");

    let idx = 0;
    for (let usr in users)
    {
        idx += 1;
        let tr = document.createElement("tr");
        tbb.appendChild(tr);

        // col 0: select
        let btselect = Utl.addButton(tr, "Select =>", "select", idx, "btn btn-success");
    
        // cols 1 to 4: fields
        Utl.addCell(tr, idx.toString()      );
        Utl.addCell(tr, users[usr].firstname);
        Utl.addCell(tr, users[usr].lastname );
        Utl.addCell(tr, users[usr].email    );

        // col 5: buttons
        let td5 = document.createElement("td");
        tr.appendChild(td5);

        let btinfo = Utl.addButton(td5, "Info"  , "info", idx, "btn btn-info"   );
        let btedit = Utl.addButton(td5, "Edit"  , "edit", idx, "btn btn-warning");
        let btdel  = Utl.addButton(td5, "Remove", "rem" , idx, "btn btn-danger" );

        btselect.addEventListener("click", e => {
            e.preventDefault();

            let id  = Utl.getLitsId(btselect);
            let usr = users[id - 1];
            sessionStorage.setItem(Utl.storEmail, usr.email);
            // refresh
            usersList();
        })
    
        btinfo.addEventListener("click", e => {
            e.preventDefault();

            let id = Utl.getLitsId(btinfo);
            show1user(id);
        })
    
        btedit.addEventListener("click", e => {
            e.preventDefault();
            
            let id = Utl.getLitsId(btedit);
            addEditUser(id);
        })
    
        btdel.addEventListener("click", e => {
            e.preventDefault();
            
            let id = Utl.getLitsId(btdel);
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
    let btad = Utl.addButton(tfr, "Add", "add", 0, "btn btn-primary");

    // row to footer, footer to table
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
    let opbody = Utl.clr("This User");

    let usr = users[idx - 1];
    let h3 = document.createElement("h3");
    h3.innerText = `${idx} ${usr.firstname} ${usr.lastname} ${usr.email}`;
    opbody.appendChild(h3);

} // show1user

export function delUser(idx)
// idx is the row number: [1 - n] 
// the index in users is [0 - (n-1)]
{
    delete users[idx - 1];
    sessionStorage.setItem(Utl.storUsr, JSON.stringify(users));
    usersList();
}

// check all fields
// return true if no error
//        false if any error
// display message error if any
// 3 params:
//   fnm: value of firstname field
//   lnm: value of lastname field
//   eml: value of email field
function checkFields(fnm, lnm, eml)
{
    // to check e-mail syntax
    const grep = /[A-Za-z]+[A-Za-z0-9_\-\.]*@[A-Za-z0-9]+\.[a-z]{2,3}/;

    // get list of existing e-mails, to check unicity of new one
    let emls = {};
    for (let usr in users)
    {
        emls[users[usr].email] = users[usr];
    }

    if (Utl.notCheck(fnm.trim()      == ""   , 'Field "Firstname" must be filled'           )) return false;
    if (Utl.notCheck(lnm.trim()      == ""   , 'Field "Lastname" must be filled'            )) return false;
    if (Utl.notCheck(eml.trim()      == ""   , 'Field "E-mail" must be filled'              )) return false;
    if (Utl.notCheck(eml.match(grep) === null, 'Field "E-mail" is not a valid e-mail adress')) return false;
    if (Utl.notCheck(emls[eml]               , 'E-mail in field "E-mail" already exists'    )) return false;

    return true;

} // function checkFields(fnm, lnm, eml)
