let menu = document.querySelector('.header__mobile-menu-button');
let navContainer = document.querySelector('.navigation__container');
let navBlock = document.querySelector('.navigation');

let searchIcon = document.querySelector('.navigation__search-icon');
let searchBlock = document.querySelector('.navigation__search');
let searchInput = document.querySelector('.navigation__search-input');

//Show mobile menu
menu.addEventListener('click', function () {
    menu.classList.toggle('header__mobile-menu-button_active');
    navContainer.classList.toggle('navigation__container_mobile_active');
    navBlock.classList.toggle('navigation_mobile_active');
})

//Show mobile search input
searchIcon.addEventListener('click', function () {
    searchInput.classList.toggle('navigation__search-input_mobile_active');
    searchBlock.classList.toggle('navigation__search_mobile_active');
})






//Create object for local storage
if (!JSON.parse(window.localStorage.getItem('data'))) {
    let jsonDataObj = {};
    jsonDataObj.currentPageNumber = -1;
    jsonDataObj.currentProductItem = '';
    jsonDataObj.shoppingBagItems = [];

    jsonDataObj = JSON.stringify(jsonDataObj);
    window.localStorage.setItem('data', jsonDataObj);
}

let currentPageNumber;


let navigationList = document.querySelectorAll('.navigation__list-item');

//find number of current page (for header navigation)
for (let i = 0; i < navigationList.length; i++) {
    navigationList[i].addEventListener('click', function () {
        currentPageNumber = i;
        let jsonData = JSON.parse(window.localStorage.getItem('data'));
        jsonData.currentPageNumber = i;
        jsonData = JSON.stringify(jsonData);
        window.localStorage.setItem('data', jsonData);
    })
}

changeHeaderBag();

addActiveNavLink();



//show active menu item
function addActiveNavLink() {
    for (let i = 0; i < navigationList.length; i++) {
        navigationList[i].classList.remove('navigation__list-item_active');
    }
    let jsonData = JSON.parse(window.localStorage.getItem('data'));
    let currentPageNumber = jsonData.currentPageNumber
    if (currentPageNumber >= 0) {
        navigationList[currentPageNumber].classList.add('navigation__list-item_active');


        jsonData.currentPageNumber = -1;
        jsonData = JSON.stringify(jsonData);
        window.localStorage.setItem('data', jsonData);
    }
}


function changeHeaderBag() {
    let shoppingBagData = JSON.parse(window.localStorage.getItem('data')).shoppingBagItems;
    let fullPrice = 0;
    let numberItems = 0;
    for (let i = 0; i < shoppingBagData.length; i++) {
        let price;
        if (shoppingBagData[i].discountedPrice !== null) {
            price = shoppingBagData[i].discountedPrice;
        } else {
            price = shoppingBagData[i].price;
        }
        fullPrice += price * shoppingBagData[i].numberItems;
        numberItems += shoppingBagData[i].numberItems;
    }

    fullPrice = fullPrice.toFixed(2);

    document.querySelector('.header__bag-title').innerHTML = `Bag £${fullPrice}(${numberItems})`

}