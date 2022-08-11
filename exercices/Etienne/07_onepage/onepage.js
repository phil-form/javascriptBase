import * as Utl from "./utilities.js";

import * as Us  from "./user.js";
import * as Pr  from "./product.js";
import * as Bk  from "./basket.js";

// start
sessionStorage.setItem(Utl.storEmail, "");
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
    sp.appendChild(Utl.addMenu("Home"         ));
    sp.appendChild(Utl.addMenu("Create User"  ));
    sp.appendChild(Utl.addMenu("Users List"   ));
    sp.appendChild(Utl.addMenu("Products List"));
    sp.appendChild(Utl.addMenu("Basket"       ));
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

        Us.addEditUser(-1);
    })

    btl.addEventListener("click", e => {
        e.preventDefault();

        Us.usersList();
    })

    btp.addEventListener("click", e => {
        e.preventDefault();

        Pr.productsList();
    })

    btb.addEventListener("click", e => {
        e.preventDefault();

        Bk.showBasket();
    })

} // navMenu

// load all data from storage
function loadData()
{
    Us.loadUsers();
    Pr.loadProds();
    Bk.loadBasket();

} // loadData

// show list of users if any, or ask to create first one
function home()
{
    if (Us.users.length)
    {
        Us.usersList();
    }
    else
    {
        Us.addEditUser(-1);
    }

} // home
