'use strict';

var filtersBlock = document.querySelector('.filters__container');
var filterBlocks = document.querySelectorAll('.filters__item');
var filterContainers = document.querySelectorAll('.filters__item-container');

//change filter parametrs

var _loop = function _loop(i) {
    filterContainers[i].addEventListener('click', function (e) {
        if (e.target.classList.contains('label')) {
            if (e.target.innerHTML !== 'Not selected') {
                var valueContainer = filterContainers[i].parentNode.querySelector('.filters__item-value');
                var value = e.target.innerHTML;
                valueContainer.innerHTML = value;
                filterContainers[i].parentNode.querySelector('.filters__item-name').classList.add('filters__item-name_checked');
                valueContainer.classList.add('filters__item-value_active');
                filterBlocks[i].classList.add('filters__item_checked');
            } else if (e.target.innerHTML === 'Not selected') {
                filterContainers[i].parentNode.querySelector('.filters__item-name').classList.remove('filters__item-name_checked');
                var _valueContainer = filterContainers[i].parentNode.querySelector('.filters__item-value');
                _valueContainer.classList.remove('filters__item-value_active');
                _valueContainer.innerHTML = filterContainers[i].parentNode.querySelector('.filters__item-name').innerHTML;
                filterBlocks[i].classList.remove('filters__item_checked');
            }
        }
    });
};

for (var i = 0; i < filterContainers.length; i++) {
    _loop(i);
}

var showFilterButton = document.querySelector('.filters__mobile-head-btn');
var mobileFilterContainer = document.querySelector('.filters__items-container');

showFilterButton.addEventListener('click', function () {
    showFilterButton.classList.toggle('filters__mobile-head-btn-close');
    mobileFilterContainer.classList.toggle('filters__items-container_active');
    document.querySelector('.header-and-navigation-container').classList.toggle('header-and-navigation-container_filter_active');
});

var filterNames = document.querySelectorAll('.filters__mobile-head-item');

mobileFilterContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('label')) {
        var currentFilterNumber = void 0,
            currentFilterName = void 0,
            currentFilterValue = void 0;
        for (var i = 0; i < filterNames.length; i++) {
            var radioLabels = filterContainers[i].querySelectorAll('.label');
            for (var j = 0; j < radioLabels.length; j++) {
                if (e.target === radioLabels[j]) {
                    currentFilterName = filterBlocks[i].querySelector('.filters__item-name').innerHTML;
                    currentFilterNumber = i;
                    currentFilterValue = radioLabels[j].innerHTML;
                }
            }
        }
        if (currentFilterValue !== 'Not selected') {
            filterNames[currentFilterNumber].innerHTML = currentFilterValue;
            filterNames[currentFilterNumber].classList.add('filters__mobile-head-item_checked');
        } else {
            filterNames[currentFilterNumber].innerHTML = currentFilterName;
            filterNames[currentFilterNumber].classList.remove('filters__mobile-head-item_checked');
        }
    }
});

//Sort and filter of windiw.catalog
var productsSort = _.sortBy(window.catalog, "dateAdded");
productsSort = _.reverse(productsSort);
productsSort = _.filter(productsSort, {
    'category': 'women',
    'fashion': 'Casual style'
});

var newArrivalsContainer = document.querySelector('.new-arrivals__container');
var mainCatalogContainer = document.querySelector('.catalog__content');

//create catalog items
var numberOfCatalogItems = void 0;
findCurrentWidth();

var firstElem = 0;
for (var i = 0; i < 2; i++) {

    if (i === 0) {
        var newArrivalRow = createCatalogRow(firstElem);
        newArrivalsContainer.appendChild(newArrivalRow);
        firstElem += numberOfCatalogItems;
    }
    if (i === 1) {
        var numberRows = void 0;
        if (numberOfCatalogItems === 4) {
            numberRows = 2;
        } else if (numberOfCatalogItems < 4) {
            numberRows = 3;
        }

        for (var j = 0; j < numberRows; j++) {
            var _newArrivalRow = createCatalogRow(firstElem);
            mainCatalogContainer.appendChild(_newArrivalRow);
            firstElem += numberOfCatalogItems;
        }
    }
}

//create catalog items if window will resize
window.addEventListener('resize', function () {
    findCurrentWidth();

    newArrivalsContainer.innerHTML = '';
    mainCatalogContainer.innerHTML = '';

    firstElem = 0;
    for (var _i = 0; _i < 2; _i++) {

        if (_i === 0) {
            var _newArrivalRow2 = createCatalogRow(firstElem);
            newArrivalsContainer.appendChild(_newArrivalRow2);
            firstElem += numberOfCatalogItems;
        }
        if (_i === 1) {
            var _numberRows = void 0;
            if (numberOfCatalogItems === 4) {
                _numberRows = 2;
            } else if (numberOfCatalogItems < 4) {
                _numberRows = 3;
            }

            for (var _j = 0; _j < _numberRows; _j++) {
                var newCatalogRow = createCatalogRow(firstElem);
                mainCatalogContainer.appendChild(newCatalogRow);
                firstElem += numberOfCatalogItems;
            }
        }
    }
});

//show more button event
var showMoreBtn = document.querySelector('.catalog__show-more-btn');
showMoreBtn.addEventListener('click', showNewRow);
if (firstElem >= productsSort.length) {
    showMoreBtn.classList.add('catalog__show-more-btn_no_active');
    showMoreBtn.removeEventListener('click', showNewRow);
}

//events for product cards
mainCatalogContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__img-container')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);
    }
});

mainCatalogContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__title')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);
    }
});

newArrivalsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__img-container')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);
    }
});

newArrivalsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__title')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);
    }
});

function showNewRow() {
    var newCatalogRow = createCatalogRow(firstElem);
    mainCatalogContainer.appendChild(newCatalogRow);
    firstElem += numberOfCatalogItems;

    if (firstElem >= productsSort.length) {
        showMoreBtn.classList.add('catalog__show-more-btn_no_active');
        this.removeEventListener('click', showNewRow);
    }
}

function createCatalogRow(firstElem) {
    var catalogRow = document.createElement('div');
    catalogRow.classList.add('catalog__row');

    var lastElem = firstElem + numberOfCatalogItems;
    if (lastElem > productsSort.length) {
        lastElem = productsSort.length;
    }
    for (var _i2 = firstElem; _i2 < lastElem; _i2++) {
        var productCard = document.createElement('div');
        productCard.classList.add('catalog__product-card', 'product-card');
        if (productsSort[_i2].hasNew === true) {
            productCard.classList.add('product-card_new');
        }

        productCard.setAttribute('dataid', productsSort[_i2].id);

        var productPrice = void 0;
        if (productsSort[_i2].discountedPrice !== null) {
            productPrice = productsSort[_i2].discountedPrice;
        } else {
            productPrice = productsSort[_i2].price;
        }

        if (productPrice !== productsSort[_i2].price) {
            var oldPrice = productsSort[_i2].price;

            productCard.innerHTML = '<a href="item.html" class = "product-card__link">\n        <div class="product-card__img-container"><img src="' + productsSort[_i2].thumbnail + '" alt="product img"\n                class="product-card__img">\n        </div>\n        <h5 class="product-card__title">' + productsSort[_i2].title + '</h5>\n    </a>\n    <div class="product-card__price">\n                    <p class="product-card__price_old">\xA3 ' + oldPrice + '</p>\n                    <p class="product-card__price_new">\xA3 ' + productPrice + '</p>\n                </div>';
        } else {
            productCard.innerHTML = '<a href="item.html" class = "product-card__link">\n            <div class="product-card__img-container"><img src="' + productsSort[_i2].thumbnail + '" alt="product img"\n                    class="product-card__img">\n            </div>\n            <h5 class="product-card__title">' + productsSort[_i2].title + '</h5>\n        </a>\n        <p class="product-card__price">\xA3 ' + productPrice + '</p>';
        }

        catalogRow.appendChild(productCard);
    }
    return catalogRow;
}

function findCurrentWidth() {
    if (window.innerWidth > 768 && window.innerWidth < 1025) {
        numberOfCatalogItems = 3;
    } else if (window.innerWidth < 769) {
        numberOfCatalogItems = 2;
    } else if (window.innerWidth > 1024) {
        numberOfCatalogItems = 4;
    }
    // console.log(window.innerWidth);
    // console.log(numberOfNewArrivalsItems);
    return numberOfCatalogItems;
}