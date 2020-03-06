let shoppingItems = [];
let bagItemsContainer = document.querySelector('.bag-items__container');
let fullPrice = document.querySelector('.checkout__total-price-value');
let fullPriceValue = 0;






shoppingItems = JSON.parse(window.localStorage.getItem('data')).shoppingBagItems;


if (shoppingItems.length === 0) {
    let message = document.createElement('div');
    message.classList.add('bag-items__empty-bag-message');
    message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
    bagItemsContainer.appendChild(message);
}

//create items for shopping bag page
for (let i = 0; i < shoppingItems.length; i++) {
    let bagItem = document.createElement('div');
    bagItem.classList.add('bag-items__item');
    let productCard = document.createElement('div');
    productCard.classList.add('bag-items__product-card', 'product-card');
    if (shoppingItems[i].hasNew) {
        productCard.classList.add('product-card_new');
    }
    productCard.setAttribute('bagid', i);

    let itemPrice;
    if (shoppingItems[i].discountedPrice !== null) {
        itemPrice = shoppingItems[i].discountedPrice;
    } else {
        itemPrice = shoppingItems[i].price;
    }

    fullPriceValue += itemPrice;


    productCard.innerHTML = `<a href="#">
        <div class="product-card__img-container"><img src="${shoppingItems[i].thumbnail}" alt="product img"
                class="product-card__img">
        </div>
    </a>
    <div class="bag-items__product-card-discription">
        <h5 class="product-card__title">${shoppingItems[i].title}</h5>
        <p class="product-card__price">£ ${itemPrice}</p>
        <div class="bag-items__product-card-param">
            <div class="bag-items__product-card-color">Color: ${shoppingItems[i].checkedColor}</div>
            <div class="bag-items__product-card-size">Size: ${shoppingItems[i].checkedSize}</div>
            <div class="bag-items__product-card-number">Quantity:
                <div class="product-card-number-minus"></div>
                <div class="product-card-number-value">${shoppingItems[i].numberItems}</div>
                <div class="product-card-number-plus"></div>
            </div>
            <div class="bag-items__product-card-remove-btn">Remove item</div>
        </div>
    </div>`;

    bagItem.appendChild(productCard);
    bagItemsContainer.appendChild(bagItem);
}

fullPrice.innerHTML = `£ ${calculatePrice()}`;





let bagItems = document.querySelectorAll('.bag-items__product-card');



for (let i = 0; i < bagItems.length; i++) {
    bagItems[i].addEventListener('click', function (e) {
        if (e.target.classList.contains('product-card-number-minus')) {
            let numberContainer = bagItems[i].querySelector('.product-card-number-value');
            let number = parseInt(numberContainer.innerHTML);
            if (number > 1) {
                number -= 1;
            }

            let productId = bagItems[i].getAttribute('bagid');
            let jsonData = JSON.parse(window.localStorage.getItem('data'));
            jsonData.shoppingBagItems[productId].numberItems = number;
            jsonData = JSON.stringify(jsonData);
            window.localStorage.setItem('data', jsonData);

            numberContainer.innerHTML = number;

            fullPrice.innerHTML = `£ ${calculatePrice()}`;

            changeHeaderBag()

        } else if (e.target.classList.contains('product-card-number-plus')) {
            let numberContainer = bagItems[i].querySelector('.product-card-number-value');
            let number = parseInt(numberContainer.innerHTML);
            number += 1;

            let productId = bagItems[i].getAttribute('bagid');
            let jsonData = JSON.parse(window.localStorage.getItem('data'));
            jsonData.shoppingBagItems[productId].numberItems = number;
            jsonData = JSON.stringify(jsonData);
            window.localStorage.setItem('data', jsonData);

            numberContainer.innerHTML = number;

            fullPrice.innerHTML = `£ ${calculatePrice()}`;

            changeHeaderBag()

        } else if (e.target.classList.contains('bag-items__product-card-remove-btn')) {
            bagItems[i].parentNode.remove();


            let productId = bagItems[i].getAttribute('bagid');
            let jsonData = JSON.parse(window.localStorage.getItem('data'));
            // jsonData.shoppingBagItems.slice(productId, 1);
            jsonData.shoppingBagItems.splice(productId, 1);
            jsonData = JSON.stringify(jsonData);
            window.localStorage.setItem('data', jsonData);

            fullPrice.innerHTML = `£ ${calculatePrice()}`;
            changeHeaderBag()
        }


    })
}

//empty bag button event
document.querySelector('.checkout__empty-bag-btn').addEventListener('click', cleanShoppingBag);

//checkout button event
document.querySelector('.checkout__checkout-btn').addEventListener('click', cleanShoppingBag);







function cleanShoppingBag() {
    bagItemsContainer.innerHTML = '';
    let message = document.createElement('div');
    message.classList.add('bag-items__empty-bag-message');
    message.innerHTML = 'Your shopping bag is empty. Use Catalog to add new items';
    bagItemsContainer.appendChild(message);

    let jsonData = JSON.parse(window.localStorage.getItem('data'));
    jsonData.shoppingBagItems = [];
    jsonData = JSON.stringify(jsonData);
    window.localStorage.setItem('data', jsonData);

    fullPrice.innerHTML = `£ ${calculatePrice()}`;
    changeHeaderBag();
}

function calculatePrice() {
    let fullPrice = 0;
    let jsonData = JSON.parse(window.localStorage.getItem('data'));

    for (let i = 0; i < jsonData.shoppingBagItems.length; i++) {
        let price;
        if (jsonData.shoppingBagItems[i].discountedPrice !== null) {
            price = jsonData.shoppingBagItems[i].discountedPrice;
        } else {
            price = jsonData.shoppingBagItems[i].price;
        }
        fullPrice += price * jsonData.shoppingBagItems[i].numberItems;

    }

    fullPrice = fullPrice.toFixed(2);
    return fullPrice;
}