import { shop, save, basket} from "./view.js";
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

export class Item {
    id = -1;
    name = "";
    price = "";
    
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        if (id)
            this.id = id;
        else
            this.id = shop.get_existing_or_new_id(this.name);
    }
}

export class Shop {
    items = {};
    
    constructor() {
        this.items = sessionStorage.getItem('shop') ? JSON.parse(sessionStorage.getItem('shop')) : {};
    }
    
    add_item(item) {
        const index = Object.keys(this.items).indexOf(item.id);
        if (index === -1)
            this.items[item.id] = item;
        else
            this.items[item.id].qty += parseInt(item.qty);
        save();
    }

    buy_item(item_id, qty) {
        const item     = this.items[item_id];
        const new_item = new Item(item.name, item.price);
        new_item.qty = qty;
        item.stock -= parseInt(qty);
        basket.add_item(new_item);
    }

    get_existing_or_new_id(item_name) {
        if (Object.keys(this.items).length === 0)
            return 1;

        let max = -1;
        for (let key in this.items) {
            if (this.items[key].name === item_name)
                return key;
            if (key > max)
                max = key;
        }
        return max === -1 ? 1 : ++max;
    }
}

export class Basket {
    items = {}
    
    constructor() {
        this.items = sessionStorage.getItem('basket') ? JSON.parse(sessionStorage.getItem('basket')) : {};
    }

    add_item(item) {
        const index = Object.keys(this.items).indexOf(item.id);
        if (index === -1)
            this.items[item.id] = item;
        else
            this.items[item.id].qty += parseInt(item.qty);
        save();
    }

    compute_total() {
        let total = 0;
        for (let item in this.items)
            total += (this.items[item].qty * this.items[item].price);
        return total;
    }
}