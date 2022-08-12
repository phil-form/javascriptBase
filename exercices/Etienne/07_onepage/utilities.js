import * as Us from "./user.js";
import * as Bk from "./basket.js";

// for sessionStorage
export const storUsr   = "opusers";
export const storPrd   = "opprods";
export const storBsk   = "opbasket";
export const storEmail = "opemail";

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// for navbar //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// create a "button" with name "navtxt", where txt is the parameter in lowercases and without any spaces
// the text on the button is txt, with cases and spaces as given
export function addMenu(txt)
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// beginning of each main function /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// clear all, then set title
// return the One Page Body balise
//   tt : not empty: title
//        empty    : no title to display
//   usr: true : add selected user, if any
//        false: don't 
export function clr(tt, usr = false)
{
    let opbody = document.getElementById("thebody");

    // clear body
    while (opbody.firstChild)
    {
        opbody.removeChild(opbody.firstChild);
    }

    // title
    if (tt == "") return opbody;

    let t = document.createElement("h1");
    t.innerText = tt;
    if (usr)
    {
        let user = getUserSelected();
        if (user)
        {
            t.innerText = `${t.innerText} (${user.firstname} ${user.lastname})`;
        }
    }
    opbody.appendChild(t);

    return opbody;

} // clr

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// items of HTML table /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// create and return table header
// 1 param:
//   titles: array of columns title
export function tbHeader(titles)
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

// create a table row with 2 cells, label in cell 1 and an input in cell 2
// return the HTML input
// 3 params:
//   tb   : table body where to add row
//   id   : HTML id of input
//   label: shown in label
export function addTrLblInput(tb, id, label)
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

    tb.appendChild(tr);

    return inp;

} // addTrLblInput

// create an array cell with read only data
// add it to given row
// 2 params:
//   tr : array row where to add new cell
//   val: data to display
export function addCell(tr, val)
{
    let td = document.createElement("td");
    td.innerText = val;
    tr.appendChild(td);

} // addCell

////////////////////////////////////////
// items to be set in a cell ///////////
////////////////////////////////////////

// create an input field in a cell
// return the new HTML input field
// 5 params:
//   tbpart: check outerHTML: begin with "<tr>""                : it's a row, add a cell, then input in the cell
//                            else (must be "<td>", not checked): it's a cell, just add input in given cell
//   tp    : type of input
//   id    : name and id of input
//   idx   : row number (will be used to addEventListener)
//   attr  : other attribute, without value, like "hidden", "disabled", default no attribute
export function addInput(tbpart, tp, id, idx = -1, attr = "")
{
    let inp = document.createElement("input");
    if (tbpart.outerHTML.substr(0, 4) == "<tr>")
    {
        // row given: create cell, add it to given row, add input field to now cell
        let ftd = document.createElement("td");
        ftd.appendChild(inp);
        tbpart.appendChild(ftd);
    }
    else
    {
        // row not given, means cell given: add input field to given cell
        tbpart.appendChild(inp);
    }

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

// create a "button" in a cell
// button id composed of: but id idx (without any spaces betwwen parts)
// return the new HTML button
// 6 params:
//   tbpart: check outerHTML: begin with "<tr>""                : it's a row, add a cell, then button in the cell
//                            else (must be "<td>", not checked): it's a cell, just add button in given cell
//   lbl   : button text
//   id    : HTML id (will be used to addEventListener)
//   idx   : row number (will be used to addEventListener)
//   cls   : class, default no class
//   attr  : other attribute, without value, like "hidden", "disabled", default no attribute
export function addButton(tbpart, lbl, id, idx, cls = "", attr = "")
{
    // create button
    let btn = document.createElement("a");

    if (tbpart.outerHTML.substr(0, 4) == "<tr>")
    {
        // row given: create cell, add it to given row, add button to now cell
        let ftd   = document.createElement("td");
        ftd.appendChild(btn);
        tbpart.appendChild(ftd);
    }
    else
    {
        // row not given, means cell given: add button to given cell
        tbpart.appendChild(btn);
    }

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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// misc ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// get row id from button name
//   btn: button name, ends with row id
export function getLitsId(btn)
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
export function getBaskItmByN(idx)
{
    let itm = ""
    let i   = 0;
    for (let it in Bk.bask)
    {
        i += 1;
        if (i == idx)
        {
            itm = Bk.bask[it];
        }
    } // for (let it in bask)

    return itm;

} // getBaskItmByN

// return null if no user selected
//        User if user selected
export function getUserSelected()
{
    let slct = sessionStorage.getItem(storEmail);
    if (!slct) return null;

    for (let usr in Us.users)
    {
        if (Us.users[usr].email == slct) return Us.users[usr];
    }

    return null;

} // getUserSelected

// called in a "if", with just a return in the "then"
// 2 params:
//   tst: bad condition, i.e. for mandatory: data == ""
//   msg: error message, default is "error ..."
// tst is true means there is an error
// returns:
//   true  if error, means tst is true
//   false if no error, means tst is false
export function notCheck(tst, msg = "error ...")
{
    if (!tst) return false; // no error

    let errBox = document.getElementById("toastBox");
    let errMsg = document.getElementById("toastText");

    errMsg.innerText = msg;

    let toast = new bootstrap.Toast(errBox);
    toast.show();

    return true;

} // notCheck
