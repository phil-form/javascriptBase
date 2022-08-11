export class User {
    lastname = "";
    firstname = "";
    email = "";
    constructor(lastname, firstname, email) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
    };
    
    /**
     * 
     * @param {Item} item 
     */
    add_item(item) {
        const index = this.basket.findIndex((e) => e.name === item.name);
        if (index === -1)
            this.basket.push(item);
        else
            this.basket[index].qty += parseInt(item.qty);
        save();
    }
};