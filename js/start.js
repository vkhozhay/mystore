'use strict';

var bestOfferObj = {};
bestOfferObj.discount = window.bestOffer.discount;
bestOfferObj.left = [];
bestOfferObj.right = [];

//create new object for best offer block
for (var i = 0; i < window.bestOffer.left.length; i++) {
    for (var j = 0; j < window.catalog.length; j++) {
        if (window.bestOffer.left[i] === window.catalog[j].id) {
            bestOfferObj.left.push(window.catalog[j]);
        }
    }
}

for (var _i = 0; _i < window.bestOffer.right.length; _i++) {
    for (var _j = 0; _j < window.catalog.length; _j++) {
        if (window.bestOffer.right[_i] === window.catalog[_j].id) {
            bestOfferObj.right.push(window.catalog[_j]);
        }
    }
}

var bestOfferContainer = document.querySelector('.best-offer__content');
var bestOfferLeftContainer = bestOfferContainer.querySelector('.best-offer__first-item');
var bestOfferRightContainer = bestOfferContainer.querySelector('.best-offer__second-item');
var bestOfferOldPrice = bestOfferContainer.querySelector('.best-offer__old-price');
var bestOfferNewPrice = bestOfferContainer.querySelector('.best-offer__new-price-value');

//Create elements for best offer block
for (var _i2 = 0; _i2 < bestOfferObj.left.length; _i2++) {
    var productCard = document.createElement('div');
    productCard.classList.add('best-offer__product-card', 'product-card');
    if (_i2 === 0) {
        productCard.classList.add('best-offer__product-card_active');
    }
    if (bestOfferObj.left[_i2].hasNew === true) {
        productCard.classList.add('product-card_new');
    }

    productCard.setAttribute('dataid', bestOfferObj.left[_i2].id);

    var productPrice = void 0;
    if (bestOfferObj.left[_i2].discountedPrice !== null) {
        productPrice = bestOfferObj.left[_i2].discountedPrice;
    } else {
        productPrice = bestOfferObj.left[_i2].price;
    }

    productCard.innerHTML = '<a href="item.html">\n    <div class="product-card__img-container"><img src="' + bestOfferObj.left[_i2].thumbnail + '" alt="product img"\n            class="product-card__img">\n    </div>\n    <h5 class="product-card__title">' + bestOfferObj.left[_i2].title + '</h5>\n</a>\n<p class="product-card__price">\xA3' + productPrice + '</p>';

    bestOfferLeftContainer.insertBefore(productCard, bestOfferLeftContainer.querySelector('.best-offer__first-item-button-down'));
}

//Create elements for best offer block
for (var _i3 = 0; _i3 < bestOfferObj.right.length; _i3++) {
    var _productCard = document.createElement('div');
    _productCard.classList.add('best-offer__product-card', 'product-card');
    if (_i3 === 0) {
        _productCard.classList.add('best-offer__product-card_active');
    }
    if (bestOfferObj.right[_i3].hasNew === true) {
        _productCard.classList.add('product-card_new');
    }

    _productCard.setAttribute('dataid', bestOfferObj.right[_i3].id);

    var _productPrice = void 0;
    if (bestOfferObj.right[_i3].discountedPrice !== null) {
        _productPrice = bestOfferObj.right[_i3].discountedPrice;
    } else {
        _productPrice = bestOfferObj.right[_i3].price;
    }

    _productCard.innerHTML = '<a href="item.html">\n    <div class="product-card__img-container"><img src="' + bestOfferObj.right[_i3].thumbnail + '" alt="product img"\n            class="product-card__img">\n    </div>\n    <h5 class="product-card__title">' + bestOfferObj.right[_i3].title + '</h5>\n</a>\n<p class="product-card__price">\xA3' + _productPrice + '</p>';

    bestOfferRightContainer.insertBefore(_productCard, bestOfferRightContainer.querySelector('.best-offer__second-item-button-down'));
}

changePrice();

//events for sliders buttons
bestOfferLeftContainer.querySelector('.best-offer__first-item-button-down').addEventListener('click', function () {
    flippingDown(bestOfferLeftContainer);
    changePrice();
});

bestOfferLeftContainer.querySelector('.best-offer__first-item-button-up').addEventListener('click', function () {
    flippingUp(bestOfferLeftContainer);
    changePrice();
});

bestOfferRightContainer.querySelector('.best-offer__second-item-button-down').addEventListener('click', function () {
    flippingDown(bestOfferRightContainer);
    changePrice();
});

bestOfferRightContainer.querySelector('.best-offer__second-item-button-up').addEventListener('click', function () {
    flippingUp(bestOfferRightContainer);
    changePrice();
});

//sort window.catalog
var productsSort = _.sortBy(window.catalog, "dateAdded");
productsSort = _.reverse(productsSort);

var newArrivalsContainer = document.querySelector('.new-arrivals__content');
var numberOfNewArrivalsItems = void 0;

findCurrentWidth();

//create elements for new arrivals section
window.addEventListener('resize', function () {
    findCurrentWidth();

    newArrivalsContainer.innerHTML = '';

    for (var _i4 = 0; _i4 < numberOfNewArrivalsItems; _i4++) {
        var _productCard2 = document.createElement('div');
        _productCard2.classList.add('new-arrivals__product-card', 'product-card');
        if (productsSort[_i4].hasNew === true) {
            _productCard2.classList.add('product-card_new');
        }

        _productCard2.setAttribute('dataid', productsSort[_i4].id);

        var _productPrice2 = void 0;
        if (productsSort[_i4].discountedPrice !== null) {
            _productPrice2 = productsSort[_i4].discountedPrice;
        } else {
            _productPrice2 = productsSort[_i4].price;
        }

        _productCard2.innerHTML = '<a href="item.html">\n        <div class="product-card__img-container"><img src="' + productsSort[_i4].thumbnail + '" alt="product img"\n                class="product-card__img">\n        </div>\n        <h5 class="product-card__title">' + productsSort[_i4].title + '</h5>\n    </a>\n    <p class="product-card__price">\xA3 ' + _productPrice2 + '</p>';

        newArrivalsContainer.appendChild(_productCard2);
    }
});

//create elements for new arrivals section
for (var _i5 = 0; _i5 < numberOfNewArrivalsItems; _i5++) {
    var _productCard3 = document.createElement('div');
    _productCard3.classList.add('new-arrivals__product-card', 'product-card');
    if (productsSort[_i5].hasNew === true) {
        _productCard3.classList.add('product-card_new');
    }

    _productCard3.setAttribute('dataid', productsSort[_i5].id);

    var _productPrice3 = void 0;
    if (productsSort[_i5].discountedPrice !== null) {
        _productPrice3 = productsSort[_i5].discountedPrice;
    } else {
        _productPrice3 = productsSort[_i5].price;
    }

    _productCard3.innerHTML = '<a href="item.html">\n    <div class="product-card__img-container"><img src="' + productsSort[_i5].thumbnail + '" alt="product img"\n            class="product-card__img">\n    </div>\n    <h5 class="product-card__title">' + productsSort[_i5].title + '</h5>\n</a>\n<p class="product-card__price">\xA3' + _productPrice3 + '</p>';

    newArrivalsContainer.appendChild(_productCard3);
}

function findCurrentWidth() {
    if (window.innerWidth > 768 && window.innerWidth < 1025) {
        numberOfNewArrivalsItems = 3;
    } else if (window.innerWidth < 769) {
        numberOfNewArrivalsItems = 2;
    } else if (window.innerWidth > 1024) {
        numberOfNewArrivalsItems = 4;
    }
    // console.log(window.innerWidth);
    // console.log(numberOfNewArrivalsItems);
    return numberOfNewArrivalsItems;
}

function findPrice() {
    var sum = 0;
    var activeProducts = bestOfferContainer.querySelectorAll('.best-offer__product-card_active');
    for (var _i6 = 0; _i6 < activeProducts.length; _i6++) {
        var productId = activeProducts[_i6].getAttribute('dataid');
        for (var _j2 = 0; _j2 < window.catalog.length; _j2++) {
            if (window.catalog[_j2].id === productId) {
                if (window.catalog[_j2].discountedPrice !== null) {
                    sum += window.catalog[_j2].discountedPrice;
                } else {
                    sum += window.catalog[_j2].price;
                }
            }
        }
    }
    return sum;
}

function changePrice() {
    bestOfferOldPrice.innerHTML = '\xA3' + findPrice();
    bestOfferNewPrice.innerHTML = '\xA3' + (findPrice() - bestOfferObj.discount);
}

function flippingDown(sliderCntainer) {
    var productCards = sliderCntainer.querySelectorAll('.best-offer__product-card');
    var activeElemNumber = void 0;
    for (var _i7 = 0; _i7 < productCards.length; _i7++) {
        if (productCards[_i7].classList.contains('best-offer__product-card_active')) {
            activeElemNumber = _i7;
        }
        productCards[_i7].classList.remove('best-offer__product-card_active');
    }

    if (activeElemNumber === productCards.length - 1) {
        productCards[0].classList.add('best-offer__product-card_active');
    } else if (activeElemNumber < productCards.length - 1) {
        productCards[activeElemNumber + 1].classList.add('best-offer__product-card_active');
    }
}

function flippingUp(sliderCntainer) {
    var productCards = sliderCntainer.querySelectorAll('.best-offer__product-card');
    var activeElemNumber = void 0;
    for (var _i8 = 0; _i8 < productCards.length; _i8++) {
        if (productCards[_i8].classList.contains('best-offer__product-card_active')) {
            activeElemNumber = _i8;
        }
        productCards[_i8].classList.remove('best-offer__product-card_active');
    }

    if (activeElemNumber === 0) {
        productCards[productCards.length - 1].classList.add('best-offer__product-card_active');
    } else if (activeElemNumber > 0) {
        productCards[activeElemNumber - 1].classList.add('best-offer__product-card_active');
    }
}