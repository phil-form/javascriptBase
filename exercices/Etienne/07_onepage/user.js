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

    let frnew = document.createElement("form");
    let tb    = document.createElement("table");

    // input fields
    tb.appendChild(Utl.addTrLblInput("frstnm", "Firstname: "));
    tb.appendChild(Utl.addTrLblInput("lastnm", "Lastname: " ));
    tb.appendChild(Utl.addTrLblInput("email" , "E-mail: "   ));

    // button
    let rbtn = document.createElement("tr");
    let cbtn = document.createElement("td");
    cbtn.colSpan = 2;
    let ibtn = Utl.addButton((idx == -1) ? "Create" : "Update", "newusr", -1, "btn btn-warning"  );
    let iccl = Utl.addButton(              "Cancel"           , "cancel", -1, "btn btn-secondary");
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
        if (Utl.notCheck(fnm.trim() == "", 'Field "Firstname" must be filled')) return;
        if (Utl.notCheck(lnm.trim() == "", 'Field "Lastname" must be filled' )) return;
        if (Utl.notCheck(eml.trim() == "", 'Field "E-mail" must be filled'   )) return;
        if (Utl.notCheck(eml.match(/[A-Za-z]+[A-Za-z0-9_\-\.]*@[A-Za-z0-9]+\.[a-z]{2,3}/) === null, 'Field "E-mail" is not a valid e-mail adress')) return;
        if (Utl.notCheck(emls[eml], 'E-mail in field "E-mail" already exists')) return;

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
export function usersList()
{
    let opbody = Utl.clr("Users list", true);

    // table
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
        tr.id = idx.toString();
    
        // col 0: select
        let td0 = document.createElement("td");
        let btselect = Utl.addButton("Select =>", "select", idx, "btn btn-success");
        td0.appendChild(btselect);
        tr.appendChild(td0);
    
        // cols 1 to 4: fields
        tr.appendChild(Utl.addCell(idx.toString()      ));
        tr.appendChild(Utl.addCell(users[usr].firstname));
        tr.appendChild(Utl.addCell(users[usr].lastname ));
        tr.appendChild(Utl.addCell(users[usr].email    ));

        // col 5: buttons
        let td5 = document.createElement("td");

        let btinfo = Utl.addButton("Info"  , "info", idx, "btn btn-info");
        let btedit = Utl.addButton("Edit"  , "edit", idx, "btn btn-warning");
        let btdel  = Utl.addButton("Remove", "rem" , idx, "btn btn-danger");

        td5.appendChild(btinfo);
        td5.appendChild(btedit);
        td5.appendChild(btdel );

        tr.appendChild(td5);

        // add row to body
        tbb.appendChild(tr);

        btselect.addEventListener("click", e => {
            e.preventDefault();

            let id  = Utl.getLitsId(btinfo);
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
            
            let id = Utl.getLitsId(btinfo);
            editUser(id);
        })
    
        btdel.addEventListener("click", e => {
            e.preventDefault();
            
            let id = Utl.getLitsId(btinfo);
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
    let btad = Utl.addButton("Add", "add", 0, "btn btn-primary");
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
    let opbody = clr("This User");

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
