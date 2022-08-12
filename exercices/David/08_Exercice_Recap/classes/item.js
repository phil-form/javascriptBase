import { shop } from "../script.js";
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