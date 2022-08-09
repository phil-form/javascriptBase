const productsSample = [
    {name: 'Chair', price: 25},
    {name: 'Table', price: 250},
    {name: 'Cupboard', price: 130}
];

document.addEventListener('DOMContentLoaded', () => {
    const basketTable = document.querySelector('table#basket-table-id tbody');
    const totalPriceSpan = document.querySelector('span#total-price-id');
    const productsTable = document.querySelector('table#product-table-id tbody');
    const newProductFrm = document.forms['add-product-form'];

    const resetStorageBtn = document.querySelector('button#reset-storage-id');
    resetStorageBtn.addEventListener('click', (e) => {
        e.preventDefault();

        resetStorage();
        refreshBasket(basketTable, totalPriceSpan);
        listProducts(productsTable, totalPriceSpan, basketTable);
    });

    const resetBasketBtn = document.querySelector('button#reset-basket-id');
    resetBasketBtn.addEventListener('click', (e) => {
        e.preventDefault();

        resetBasket();
        refreshBasket(basketTable, totalPriceSpan);
    });

    const resetProductsBtn = document.querySelector('button#reset-products-id');
    resetProductsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        resetProducts();
        refreshBasket(basketTable, totalPriceSpan);
        listProducts(productsTable, totalPriceSpan, basketTable);
    });

    const addNewProductBtn = newProductFrm.elements['new-product-submit'];
    addNewProductBtn.addEventListener('click', (e) => {
        e.preventDefault();

        
        let name = newProductFrm.elements['new-product-name-input'].value;
        let price = newProductFrm.elements['new-product-price-input'].value;

        let newProduct = {
            name: name,
            price: price
        };
        
        let products = getProducts();
        products.push(newProduct);
        setProducts(products);

        listProducts(productsTable, totalPriceSpan, basketTable);
    });

    const addSampleBtn = document.querySelector('button#add-sample-id');
    addSampleBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let products = getProducts();
        productsSample.forEach((productSample) => {
            products.push(productSample);
        });
        setProducts(products);

        refreshBasket(basketTable, totalPriceSpan);
        listProducts(productsTable, totalPriceSpan, basketTable);
    });
    
    listProducts(productsTable, totalPriceSpan, basketTable);
    refreshBasket(basketTable, totalPriceSpan);
});

const listProducts = (productsTable, totalPriceSpan, basketTable) => {
    productsTable.innerHTML = '';

    let products = getProducts();

    products.forEach((product, index) => {
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 0;

        const addToBasketBtn = document.createElement('button');
        addToBasketBtn.innerHTML = 'Add to basket';
        addToBasketBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let quantity = parseInt(quantityInput.value);
            addToBasket(index, quantity);
            refreshBasket(basketTable, totalPriceSpan);
        });

        const newRow = productsTable.insertRow();

        const nameCell = newRow.insertCell();
        nameCell.innerHTML = product.name;
        const priceCell = newRow.insertCell();
        priceCell.innerHTML = product.price;
        const quantityCell = newRow.insertCell();
        quantityCell.appendChild(quantityInput);
        const actionCell = newRow.insertCell();
        actionCell.appendChild(addToBasketBtn);

        refreshBasket(basketTable, totalPriceSpan);
    });
};

const getProducts = () => {
    let products = localStorage.getItem('products');
    return products != null ? JSON.parse(products) : [];
};

const setProducts = (data) => {
    localStorage.setItem('products', JSON.stringify(data));
};

const getBasket = () => {
    let basket = localStorage.getItem('basket');
    return basket != null ? JSON.parse(basket) : [];
};

const setBasket = (data) => {
    localStorage.setItem('basket', JSON.stringify(data));
};

const addToBasket = (index, quantity) => {
    let basket = getBasket();

    let products = getProducts();
    let product = products[index];
    let price = quantity * product.price;

    let basketItem = {
        name: product.name,
        quantity: quantity,
        price: price
    };

    basket.push(basketItem);

    setBasket(basket);
};

const removeFromBasket = (index) => {
    let basket = getBasket();
    basket.splice(index, 1);

    setBasket(basket);
};

const refreshBasket = (basketTable, totalPriceSpan) => {
    basketTable.innerHTML = '';

    let basket = getBasket();
    
    let totalPrice = 0;

    basket.forEach((item, index) => {
        const removeFromBasketBtn = document.createElement('button');
        removeFromBasketBtn.innerHTML = 'Remove';
        removeFromBasketBtn.addEventListener('click', (e) => {
            e.preventDefault();

            removeFromBasket(index);
            refreshBasket(basketTable, totalPriceSpan);
        });

        const newRow = basketTable.insertRow();

        const nameCell = newRow.insertCell();
        nameCell.innerHTML = item.name;
        const quantityCell = newRow.insertCell();
        quantityCell.innerHTML = item.price;
        const priceCell = newRow.insertCell();
        priceCell.innerHTML = item.price;
        const actionCell = newRow.insertCell();
        actionCell.appendChild(removeFromBasketBtn);

        totalPrice += parseInt(item.price);
    });

    totalPriceSpan.innerHTML = totalPrice;
};

const resetStorage = () => {
    localStorage.clear();
};

const resetBasket = () => {
    setBasket([]);
};

const resetProducts = () => {
    setProducts([]);
};