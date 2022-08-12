import { save } from "../script.js";
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