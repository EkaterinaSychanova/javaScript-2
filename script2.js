const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Hat', price: 30},
    { title: 'Socks', price: 50 },
    { title: 'Jeans', price: 80 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


function renderGoodsItem(title, price) {
    var title = title || 'title';
    var price = price || 0;
    return '<div class="goods-item"><h3> ' + title + '</h3><p>' + price + '</p></div>';
}

function renderGoodsList(list) {
    var list = (list.length > 0) ? list : [];
    var divClass = '.goods-list';

    var divForItems = document.querySelector(divClass);

    var divForItemsConent = list.map(function (item) {
        return renderGoodsItem(item.title, item.price);
    });

    divForItems.innerHTML = divForItemsConent.join("");

}

renderGoodsList(GOODS);
