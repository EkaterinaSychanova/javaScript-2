'use strict';

class GoodItem {
	/**
	 @param {Наименование товара с проверкой} title 
	 @param {Цена товара с проверкой} price 
	 */
	constructor(title = 'no title', price = 'no price', id) {
	  this.title = title;
		this.price = price;
		this.id = id;
	}
	render() {
		return `<div class="goods-item" id="${this.id}">
	  <img src="" alt="">
	  <h3>${this.title}</h3>
	  <p>Цена: ${this.price}</p>
	  <button onclick="document.getElementById(${this.id}).remove();">Удалить</button>
	  </div>`;
	}
  }

class GoodsList {
	constructor() {
	  this.goods = []
	}
	fetchGoods() {
	  this.goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Hat', price: 30},
    { title: 'Socks', price: 50 },
    { title: 'Jeans', price: 80 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    ]
	}
	
	countTotalPrice() {
		let sum = 0;
		for (let i = 0; i < this.goods.length; i++) {
			if (this.goods[i].price == undefined) {
				this.goods[i].price = 0;
				alert('На товар '+ this.goods[i].title + ' не назначена цена');
			}
		  sum += this.goods[i].price;
		}
		return `<div class="countTotalPrice">Общее количество: ${this.goods.length}</div>
		<div class="countTotalPrice">Общая цена: ${sum}</div>`;
		}

	render() {
	  let listHtml = '';
	  this.goods.forEach((good) => {
		const goodItem = new GoodItem(good.title, good.price)
		listHtml += goodItem.render()
	  })
	  document.querySelector('.goods-list').innerHTML = listHtml;
	  document.querySelector('.cart-sum').innerHTML = this.countTotalPrice(); //вывожу ячейки со стоимостью и количеством товара корзины
	}
  }
  
/**
 * Создть экземпляр класса GoodsList, вызваю для него метод fetchGoods
 */
const list = new GoodsList();
list.fetchGoods();

/**
 * вызов render() метода fetchGoods
 */
window.onload = () => {
  list.render()
};

