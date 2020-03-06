'use strict';

var shoppingItems = [];
var bagItemsContainer = document.querySelector('.bag-items__container');
var fullPrice = document.querySelector('.checkout__total-price-value');
var fullPriceValue = 0;

shoppingItems = JSON.parse(window.localStorage.getItem('data')).shoppingBagItems;

if (shoppingItems.length === 0) {
    var message = document.createElement('div');
    message.classList.add('bag-items__empty-bag-message');
    message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
    bagItemsContainer.appendChild(message);
}

//create items for shopping bag page
for (var i = 0; i < shoppingItems.length; i++) {
    var bagItem = document.createElement('div');
    bagItem.classList.add('bag-items__item');
    var productCard = document.createElement('div');
    productCard.classList.add('bag-items__product-card', 'product-card');
    if (shoppingItems[i].hasNew) {
        productCard.classList.add('product-card_new');
    }
    productCard.setAttribute('bagid', i);

    var itemPrice = void 0;
    if (shoppingItems[i].discountedPrice !== null) {
        itemPrice = shoppingItems[i].discountedPrice;
    } else {
        itemPrice = shoppingItems[i].price;
    }

    fullPriceValue += itemPrice;

    productCard.innerHTML = '<a href="#">\n        <div class="product-card__img-container"><img src="' + shoppingItems[i].thumbnail + '" alt="product img"\n                class="product-card__img">\n        </div>\n    </a>\n    <div class="bag-items__product-card-discription">\n        <h5 class="product-card__title">' + shoppingItems[i].title + '</h5>\n        <p class="product-card__price">\xA3 ' + itemPrice + '</p>\n        <div class="bag-items__product-card-param">\n            <div class="bag-items__product-card-color">Color: ' + shoppingItems[i].checkedColor + '</div>\n            <div class="bag-items__product-card-size">Size: ' + shoppingItems[i].checkedSize + '</div>\n            <div class="bag-items__product-card-number">Quantity:\n                <div class="product-card-number-minus"></div>\n                <div class="product-card-number-value">' + shoppingItems[i].numberItems + '</div>\n                <div class="product-card-number-plus"></div>\n            </div>\n            <div class="bag-items__product-card-remove-btn">Remove item</div>\n        </div>\n    </div>';

    bagItem.appendChild(productCard);
    bagItemsContainer.appendChild(bagItem);
}

fullPrice.innerHTML = '\xA3 ' + calculatePrice();

var bagItems = document.querySelectorAll('.bag-items__product-card');

var _loop = function _loop(_i) {
    bagItems[_i].addEventListener('click', function (e) {
        if (e.target.classList.contains('product-card-number-minus')) {
            var numberContainer = bagItems[_i].querySelector('.product-card-number-value');
            var number = parseInt(numberContainer.innerHTML);
            if (number > 1) {
                number -= 1;
            }

            var productId = bagItems[_i].getAttribute('bagid');
            var jsonData = JSON.parse(window.localStorage.getItem('data'));
            jsonData.shoppingBagItems[productId].numberItems = number;
            jsonData = JSON.stringify(jsonData);
            window.localStorage.setItem('data', jsonData);

            numberContainer.innerHTML = number;

            fullPrice.innerHTML = '\xA3 ' + calculatePrice();

            changeHeaderBag();
        } else if (e.target.classList.contains('product-card-number-plus')) {
            var _numberContainer = bagItems[_i].querySelector('.product-card-number-value');
            var _number = parseInt(_numberContainer.innerHTML);
            _number += 1;

            var _productId = bagItems[_i].getAttribute('bagid');
            var _jsonData = JSON.parse(window.localStorage.getItem('data'));
            _jsonData.shoppingBagItems[_productId].numberItems = _number;
            _jsonData = JSON.stringify(_jsonData);
            window.localStorage.setItem('data', _jsonData);

            _numberContainer.innerHTML = _number;

            fullPrice.innerHTML = '\xA3 ' + calculatePrice();

            changeHeaderBag();
        } else if (e.target.classList.contains('bag-items__product-card-remove-btn')) {
            bagItems[_i].parentNode.remove();

            var _productId2 = bagItems[_i].getAttribute('bagid');
            var _jsonData2 = JSON.parse(window.localStorage.getItem('data'));
            // jsonData.shoppingBagItems.slice(productId, 1);
            _jsonData2.shoppingBagItems.splice(_productId2, 1);
            _jsonData2 = JSON.stringify(_jsonData2);
            window.localStorage.setItem('data', _jsonData2);

            fullPrice.innerHTML = '\xA3 ' + calculatePrice();
            changeHeaderBag();
        }
    });
};

for (var _i = 0; _i < bagItems.length; _i++) {
    _loop(_i);
}

//empty bag button event
document.querySelector('.checkout__empty-bag-btn').addEventListener('click', cleanShoppingBag);

//checkout button event
document.querySelector('.checkout__checkout-btn').addEventListener('click', cleanShoppingBag);

function cleanShoppingBag() {
    bagItemsContainer.innerHTML = '';
    var message = document.createElement('div');
    message.classList.add('bag-items__empty-bag-message');
    message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
    bagItemsContainer.appendChild(message);

    var jsonData = JSON.parse(window.localStorage.getItem('data'));
    jsonData.shoppingBagItems = [];
    jsonData = JSON.stringify(jsonData);
    window.localStorage.setItem('data', jsonData);

    fullPrice.innerHTML = '\xA3 ' + calculatePrice();
    changeHeaderBag();
}

function calculatePrice() {
    var fullPrice = 0;
    var jsonData = JSON.parse(window.localStorage.getItem('data'));

    for (var _i2 = 0; _i2 < jsonData.shoppingBagItems.length; _i2++) {
        var price = void 0;
        if (jsonData.shoppingBagItems[_i2].discountedPrice !== null) {
            price = jsonData.shoppingBagItems[_i2].discountedPrice;
        } else {
            price = jsonData.shoppingBagItems[_i2].price;
        }
        fullPrice += price * jsonData.shoppingBagItems[_i2].numberItems;
    }

    fullPrice = fullPrice.toFixed(2);
    return fullPrice;
}