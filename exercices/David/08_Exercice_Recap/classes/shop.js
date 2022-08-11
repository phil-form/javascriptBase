import { save } from "../script.js";
import { Item } from "./item.js";
import { basket } from "../script.js";
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