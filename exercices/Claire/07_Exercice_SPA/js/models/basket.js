class BasketItem {

    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

}

export class Basket {

    constructor() {
        this.load();
    }


    load() {
        const basket = JSON.parse(localStorage.getItem('basket'));
        this.items = basket ? basket : [];
        for(let i in this.items) {
            this.items[i] = Object.assign(new BasketItem(), this.items[i]);
        }
        console.log('basket loaded from localstorage')
    }

    /**
     * 
     * @param {Product} product 
     * @param {number} quantity 
     */
    add(product, quantity) {
        let found = false;
        for(let item of this.items) {
            if(item.product.name == product.name) {
                item.quantity += quantity;
                found = true;
            }
        }
        if(!found) {
            this.items.push(new BasketItem(product, quantity));
        }
        localStorage.setItem('basket', JSON.stringify(this.items))
    }

    delete(product) {
        for(let i in this.items) {
            if(product.name == this.items[i].product.name) {
                this.items.splice(i, 1)
            }
        }
        localStorage.setItem('basket', JSON.stringify(this.items))
    }

    total() {
        let total = 0;
        for (let item of this.items) {
            total += item.product.price * item.quantity;
        }
        return total;
    }

    empty() {
        localStorage.removeItem('basket');
        this.items = [];
    }

}

export const basket = new Basket()


