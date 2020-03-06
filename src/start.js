let bestOfferObj = {};
bestOfferObj.discount = window.bestOffer.discount;
bestOfferObj.left = [];
bestOfferObj.right = [];

//create new object for best offer block
for (let i = 0; i < window.bestOffer.left.length; i++) {
    for (let j = 0; j < window.catalog.length; j++) {
        if (window.bestOffer.left[i] === window.catalog[j].id) {
            bestOfferObj.left.push(window.catalog[j]);
        }
    }
}

for (let i = 0; i < window.bestOffer.right.length; i++) {
    for (let j = 0; j < window.catalog.length; j++) {
        if (window.bestOffer.right[i] === window.catalog[j].id) {
            bestOfferObj.right.push(window.catalog[j]);
        }
    }
}


let bestOfferContainer = document.querySelector('.best-offer__content');
let bestOfferLeftContainer = bestOfferContainer.querySelector('.best-offer__first-item');
let bestOfferRightContainer = bestOfferContainer.querySelector('.best-offer__second-item');
let bestOfferOldPrice = bestOfferContainer.querySelector('.best-offer__old-price');
let bestOfferNewPrice = bestOfferContainer.querySelector('.best-offer__new-price-value');


//Create elements for best offer block
for (let i = 0; i < bestOfferObj.left.length; i++) {
    let productCard = document.createElement('div');
    productCard.classList.add('best-offer__product-card', 'product-card');
    if (i === 0) {
        productCard.classList.add('best-offer__product-card_active');
    }
    if (bestOfferObj.left[i].hasNew === true) {
        productCard.classList.add('product-card_new');
    }

    productCard.setAttribute('dataid', bestOfferObj.left[i].id);

    let productPrice;
    if (bestOfferObj.left[i].discountedPrice !== null) {
        productPrice = bestOfferObj.left[i].discountedPrice;
    } else {
        productPrice = bestOfferObj.left[i].price;
    }

    productCard.innerHTML = `<a href="item.html">
    <div class="product-card__img-container"><img src="${bestOfferObj.left[i].thumbnail}" alt="product img"
            class="product-card__img">
    </div>
    <h5 class="product-card__title">${bestOfferObj.left[i].title}</h5>
</a>
<p class="product-card__price">£${productPrice}</p>`;

    bestOfferLeftContainer.insertBefore(productCard, bestOfferLeftContainer.querySelector('.best-offer__first-item-button-down'));
}

//Create elements for best offer block
for (let i = 0; i < bestOfferObj.right.length; i++) {
    let productCard = document.createElement('div');
    productCard.classList.add('best-offer__product-card', 'product-card');
    if (i === 0) {
        productCard.classList.add('best-offer__product-card_active');
    }
    if (bestOfferObj.right[i].hasNew === true) {
        productCard.classList.add('product-card_new');
    }

    productCard.setAttribute('dataid', bestOfferObj.right[i].id);

    let productPrice;
    if (bestOfferObj.right[i].discountedPrice !== null) {
        productPrice = bestOfferObj.right[i].discountedPrice;
    } else {
        productPrice = bestOfferObj.right[i].price;
    }

    productCard.innerHTML = `<a href="item.html">
    <div class="product-card__img-container"><img src="${bestOfferObj.right[i].thumbnail}" alt="product img"
            class="product-card__img">
    </div>
    <h5 class="product-card__title">${bestOfferObj.right[i].title}</h5>
</a>
<p class="product-card__price">£${productPrice}</p>`;

    bestOfferRightContainer.insertBefore(productCard, bestOfferRightContainer.querySelector('.best-offer__second-item-button-down'));
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
let productsSort = _.sortBy(window.catalog, "dateAdded");
productsSort = _.reverse(productsSort);



let newArrivalsContainer = document.querySelector('.new-arrivals__content');
let numberOfNewArrivalsItems;

findCurrentWidth();

//create elements for new arrivals section
window.addEventListener('resize', function () {
    findCurrentWidth();

    newArrivalsContainer.innerHTML = '';

    for (let i = 0; i < numberOfNewArrivalsItems; i++) {
        let productCard = document.createElement('div');
        productCard.classList.add('new-arrivals__product-card', 'product-card');
        if (productsSort[i].hasNew === true) {
            productCard.classList.add('product-card_new');
        }

        productCard.setAttribute('dataid', productsSort[i].id);

        let productPrice;
        if (productsSort[i].discountedPrice !== null) {
            productPrice = productsSort[i].discountedPrice;
        } else {
            productPrice = productsSort[i].price;
        }

        productCard.innerHTML = `<a href="item.html">
        <div class="product-card__img-container"><img src="${productsSort[i].thumbnail}" alt="product img"
                class="product-card__img">
        </div>
        <h5 class="product-card__title">${productsSort[i].title}</h5>
    </a>
    <p class="product-card__price">£ ${productPrice}</p>`;

        newArrivalsContainer.appendChild(productCard);
    }
});

//create elements for new arrivals section
for (let i = 0; i < numberOfNewArrivalsItems; i++) {
    let productCard = document.createElement('div');
    productCard.classList.add('new-arrivals__product-card', 'product-card');
    if (productsSort[i].hasNew === true) {
        productCard.classList.add('product-card_new');
    }

    productCard.setAttribute('dataid', productsSort[i].id);

    let productPrice;
    if (productsSort[i].discountedPrice !== null) {
        productPrice = productsSort[i].discountedPrice;
    } else {
        productPrice = productsSort[i].price;
    }

    productCard.innerHTML = `<a href="item.html">
    <div class="product-card__img-container"><img src="${productsSort[i].thumbnail}" alt="product img"
            class="product-card__img">
    </div>
    <h5 class="product-card__title">${productsSort[i].title}</h5>
</a>
<p class="product-card__price">£${productPrice}</p>`;

    newArrivalsContainer.appendChild(productCard);
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
    let sum = 0;
    let activeProducts = bestOfferContainer.querySelectorAll('.best-offer__product-card_active');
    for (let i = 0; i < activeProducts.length; i++) {
        let productId = activeProducts[i].getAttribute('dataid');
        for (let j = 0; j < window.catalog.length; j++) {
            if (window.catalog[j].id === productId) {
                if (window.catalog[j].discountedPrice !== null) {
                    sum += window.catalog[j].discountedPrice;
                } else {
                    sum += window.catalog[j].price;
                }

            }
        }
    }
    return sum;
}

function changePrice() {
    bestOfferOldPrice.innerHTML = `£${findPrice()}`;
    bestOfferNewPrice.innerHTML = `£${findPrice() - bestOfferObj.discount}`;
}


function flippingDown(sliderCntainer) {
    let productCards = sliderCntainer.querySelectorAll('.best-offer__product-card');
    let activeElemNumber;
    for (let i = 0; i < productCards.length; i++) {
        if (productCards[i].classList.contains('best-offer__product-card_active')) {
            activeElemNumber = i;
        }
        productCards[i].classList.remove('best-offer__product-card_active');
    }

    if (activeElemNumber === productCards.length - 1) {
        productCards[0].classList.add('best-offer__product-card_active');
    } else if (activeElemNumber < productCards.length - 1) {
        productCards[activeElemNumber + 1].classList.add('best-offer__product-card_active');
    }
}


function flippingUp(sliderCntainer) {
    let productCards = sliderCntainer.querySelectorAll('.best-offer__product-card');
    let activeElemNumber;
    for (let i = 0; i < productCards.length; i++) {
        if (productCards[i].classList.contains('best-offer__product-card_active')) {
            activeElemNumber = i;
        }
        productCards[i].classList.remove('best-offer__product-card_active');
    }

    if (activeElemNumber === 0) {
        productCards[productCards.length - 1].classList.add('best-offer__product-card_active');
    } else if (activeElemNumber > 0) {
        productCards[activeElemNumber - 1].classList.add('best-offer__product-card_active');
    }
}