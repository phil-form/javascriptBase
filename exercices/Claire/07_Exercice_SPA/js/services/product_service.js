import { BaseService } from "./base_service.js";
import { Product } from "../models/product.js"

export class ProductService extends BaseService {

    constructor() {
        let config = {};
        super(config);
        this.products = [
            new Product('Chaise', 25),
            new Product('Table', 150),
            new Product('Meuble TV', 250)
        ];
    }

    addOrUpdate(name, price) {
        let found = false
        let product = null
        for(let i in this.products) {
            if(this.products[i].name == name) {
                this.products[i].price = price
                product = this.products[i]
                found = true
            }
        }
        if(!found) {
            product = new Product(name, price)
            this.products.push(product)
        }
        return product
    }

    delete(product) {
        for(let i in this.products) {
            if(this.products[i].name == product.name) {
                this.products.splice(i, 1)
            }
        }
    }

}