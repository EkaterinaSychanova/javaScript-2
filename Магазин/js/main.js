"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor() {
        this.goods = []; 
        this.init();
    }

    init() {
        this._getProducts();
        this.cart = new CartList(); 
    }

    _getProducts() {  
        fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data];
                this.goods.forEach(elem => elem.quantity = 1);
                this.render();
                this.addEvent();
            })
    }

    addEvent() { 
        document.querySelectorAll('.btn').forEach(elem => {
            elem.addEventListener('click', event => this.eventHandler(event))
        })
    }

    eventHandler(event) {
        if (event.target.dataset.id === 'cart') {
            this.eventHandlerCart(); 
            return;
        }
        this.cart.eventHandlerAddToCart(this.goods, event); // добавление товара
    }

    eventHandlerCart() { 
        this.cart.logicCart();
    }

    render() { // рендер каталога.
        const block = document.querySelector('.products');
        this.goods.forEach(product => {
            const prod = new Product(product);
            block.insertAdjacentHTML('beforeend', prod.render())
        })
    }
}

class Product { 
    constructor(product) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = 'img/stub.jpg'
    }

    render() {
        return `<div class="product-item">
                    <img class="product-item__img" src="${this.img}" alt="${this.product_name}">
                    <h3 class="product-item__title">${this.product_name}</h3>
                    <p class="product-item__price">Цена ${this.price} руб.</p>
                    <button class="btn product-item__btn_add-to-cart" data-id="${this.id_product}">Добавить в корзину</button>
                </div>`
    }
}

class CartList {
    constructor() {
        this.frontElemsInCart = []; // массив для отоборажения корзины.
        this.backElemsInCart = []; // массив для хранения всех элеметнов в корзине.
        this.init()
    }

    init() {
        this._getProductInCart();
    }

    _getProductInCart() { // получаем данные с сервера.
        fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.backElemsInCart = {...data};
                this._initElemsInCart();
            });
    }

    _initElemsInCart() { 
        this.frontElemsInCart = [];
        this.backElemsInCart.contents.forEach(elem => {
            if (this.frontElemsInCart.length === 0) {
                this.frontElemsInCart.push({...elem});
                return;
            }
            let count = 0;
            for (let i = 0; i < this.frontElemsInCart.length; i++){
                if (elem.id_product === this.frontElemsInCart[i].id_product) {
                    this.frontElemsInCart[i].quantity++;
                    count++
                }
            }

            if (count === 0) {
                this.frontElemsInCart.push({...elem});
            }
        });
        this.totalAmountEltms(); // подсчет суммы
        this.sumPriceEltms();    // и колличеста.
    }

    addEventForDelFromCart() {  
        document.querySelector('.cart')
            .addEventListener('click', event => this.eventHandlerDelFromCart(event));
    }

    eventHandlerAddToCart(goods, event) { 
        fetch(`${API}/addToBasket.json`)
            .then(result => result.json())
            .then(data => {
                if (data.result) {
                    this.addElemToCart(goods, event)
                }
            });
    }

    eventHandlerDelFromCart(event) { // удаления из корзины.
        if (event.target.tagName !== 'BUTTON') {
            return;
        }
        fetch(`${API}/deleteFromBasket.json`)
            .then(result => result.json())
            .then(data => {
                if (data.result) {
                    this.remElemFromCart(event);
                }
            })
    }

    addElemToCart(goods, event) { // добавление в корзину
        goods.find((elem) => {
            if (elem.id_product === +event.target.dataset.id) {
                this.backElemsInCart.contents.push({...elem});
            }
        });
        this._initElemsInCart();
        this.renderClick();
    }

    remElemFromCart(event) { // удаление из корзины
        this.backElemsInCart.contents.find((elem, idx) => {
            if (elem.id_product === +event.target.dataset.id) {
                this.backElemsInCart.contents.splice(idx, 1);
                return true;
            }
        });
        this._initElemsInCart();
        this.renderClick();
    }

    sumPriceEltms() { 
        this.backElemsInCart.amount = 0;
        this.backElemsInCart.contents.forEach(elem => this.backElemsInCart.amount += elem.price);
    }

    totalAmountEltms() { // колличество товаров 
        this.backElemsInCart.countGoods = this.backElemsInCart.contents.length;
    }

    logicCart() { 
        if (this.closeCart()) {
            this.openCart();
        }
    }

    closeCart() { 
        let elem = document.querySelector('.cart');
        if (elem) {
            elem.parentElement.removeChild(elem);
            return false;
        }
        return true;
    }

    openCart() { 
        this.renderAll();
        this.addEventForDelFromCart();
    }

    renderClick() { 
        let elem = document.querySelector('.cart');
        if (elem) {
            this.closeCart();
            this.openCart();
        }
    }

    renderAll() { 
        document.querySelector('.cart-container')
            .insertAdjacentHTML('beforeend', this.render(this.backElemsInCart));
        this.frontElemsInCart.forEach(elem => {
            const cartElem = new CartElem(elem);
            document.querySelector('.cart').insertAdjacentHTML('beforeend', cartElem.render());
        });
    }

    render(product) { 
        return `<div class="cart">
                    <p class="">Общая стоимость ${product.amount} руб.</p>
                    <p class="">Товаров в карзине ${product.countGoods}.</p>
                </div>`
    }
}

class CartElem { 
    constructor(element) {
        this.img = 'img/stub.jpg';
        this.product_name = element.product_name;
        this.price = element.price;
        this.id_product = element.id_product;
        this.quantity = element.quantity
    }

    render() {
        return `<div class="cart__product " data-id="${this.id_product}">
                    <img class="cart__product_img" src="${this.img}" alt="${this.product_name}">
                    <div class="cart__product_text-box">
                        <h3 class="cart__product_title">${this.product_name}</h3>
                        <p class="cart__product_price">Цена ${this.price} руб.</p>
                        <p class="cart__product_quantity">Колличество ${this.quantity}.</p>
                        <button class="btn cart__product_btn btn_del-from-cart" data-id="${this.id_product}">Удалить</button>
                    </div>
                </div>`
    }
}

new ProductsList();

