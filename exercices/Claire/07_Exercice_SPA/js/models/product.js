
class Product {

    constructor(name, price) {
        this.name = name
        this.price = price
    }
}

class Catalog {

    constructor() {
        this.products = [
            new Product('Chaise', 25),
            new Product('Table', 150),
            new Product('Meuble TV', 250)
        ]
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

export const catalog = new Catalog()