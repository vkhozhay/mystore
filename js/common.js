'use strict';

var menu = document.querySelector('.header__mobile-menu-button');
var navContainer = document.querySelector('.navigation__container');
var navBlock = document.querySelector('.navigation');

var searchIcon = document.querySelector('.navigation__search-icon');
var searchBlock = document.querySelector('.navigation__search');
var searchInput = document.querySelector('.navigation__search-input');

//Show mobile menu
menu.addEventListener('click', function () {
    menu.classList.toggle('header__mobile-menu-button_active');
    navContainer.classList.toggle('navigation__container_mobile_active');
    navBlock.classList.toggle('navigation_mobile_active');
});

//Show mobile search input
searchIcon.addEventListener('click', function () {
    searchInput.classList.toggle('navigation__search-input_mobile_active');
    searchBlock.classList.toggle('navigation__search_mobile_active');
});

//Create object for local storage
if (!JSON.parse(window.localStorage.getItem('data'))) {
    var jsonDataObj = {};
    jsonDataObj.currentPageNumber = -1;
    jsonDataObj.currentProductItem = '';
    jsonDataObj.shoppingBagItems = [];

    jsonDataObj = JSON.stringify(jsonDataObj);
    window.localStorage.setItem('data', jsonDataObj);
}

var currentPageNumber = void 0;

var navigationList = document.querySelectorAll('.navigation__list-item');

//find number of current page (for header navigation)

var _loop = function _loop(i) {
    navigationList[i].addEventListener('click', function () {
        currentPageNumber = i;
        var jsonData = JSON.parse(window.localStorage.getItem('data'));
        jsonData.currentPageNumber = i;
        jsonData = JSON.stringify(jsonData);
        window.localStorage.setItem('data', jsonData);
    });
};

for (var i = 0; i < navigationList.length; i++) {
    _loop(i);
}

changeHeaderBag();

addActiveNavLink();

//show active menu item
function addActiveNavLink() {
    for (var i = 0; i < navigationList.length; i++) {
        navigationList[i].classList.remove('navigation__list-item_active');
    }
    var jsonData = JSON.parse(window.localStorage.getItem('data'));
    var currentPageNumber = jsonData.currentPageNumber;
    if (currentPageNumber >= 0) {
        navigationList[currentPageNumber].classList.add('navigation__list-item_active');

        jsonData.currentPageNumber = -1;
        jsonData = JSON.stringify(jsonData);
        window.localStorage.setItem('data', jsonData);
    }
}

function changeHeaderBag() {
    var shoppingBagData = JSON.parse(window.localStorage.getItem('data')).shoppingBagItems;
    var fullPrice = 0;
    var numberItems = 0;
    for (var i = 0; i < shoppingBagData.length; i++) {
        var price = void 0;
        if (shoppingBagData[i].discountedPrice !== null) {
            price = shoppingBagData[i].discountedPrice;
        } else {
            price = shoppingBagData[i].price;
        }
        fullPrice += price * shoppingBagData[i].numberItems;
        numberItems += shoppingBagData[i].numberItems;
    }

    fullPrice = fullPrice.toFixed(2);

    document.querySelector('.header__bag-title').innerHTML = 'Bag \xA3' + fullPrice + '(' + numberItems + ')';
}