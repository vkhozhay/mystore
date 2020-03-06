let filtersBlock = document.querySelector('.filters__container');
let filterBlocks = document.querySelectorAll('.filters__item');
let filterContainers = document.querySelectorAll('.filters__item-container');


//change filter parametrs
for (let i = 0; i < filterContainers.length; i++) {
    filterContainers[i].addEventListener('click', function (e) {
        if (e.target.classList.contains('label')) {
            if (e.target.innerHTML !== 'Not selected') {
                let valueContainer = filterContainers[i].parentNode.querySelector(
                    '.filters__item-value');
                let value = e.target.innerHTML;
                valueContainer.innerHTML = value;
                filterContainers[i].parentNode.querySelector('.filters__item-name').classList.add(
                    'filters__item-name_checked');
                valueContainer.classList.add('filters__item-value_active');
                filterBlocks[i].classList.add('filters__item_checked');
            } else if (e.target.innerHTML === 'Not selected') {
                filterContainers[i].parentNode.querySelector('.filters__item-name').classList.remove(
                    'filters__item-name_checked');
                let valueContainer = filterContainers[i].parentNode.querySelector(
                    '.filters__item-value');
                valueContainer.classList.remove('filters__item-value_active');
                valueContainer.innerHTML = filterContainers[i].parentNode.querySelector('.filters__item-name').innerHTML;
                filterBlocks[i].classList.remove('filters__item_checked');
            }
        }
    })
}

let showFilterButton = document.querySelector('.filters__mobile-head-btn');
let mobileFilterContainer = document.querySelector('.filters__items-container');

showFilterButton.addEventListener('click', function () {
    showFilterButton.classList.toggle('filters__mobile-head-btn-close');
    mobileFilterContainer.classList.toggle('filters__items-container_active');
    document.querySelector('.header-and-navigation-container').classList.toggle('header-and-navigation-container_filter_active');
})



let filterNames = document.querySelectorAll('.filters__mobile-head-item');

mobileFilterContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('label')) {
        let currentFilterNumber, currentFilterName, currentFilterValue;
        for (let i = 0; i < filterNames.length; i++) {
            let radioLabels = filterContainers[i].querySelectorAll('.label');
            for (let j = 0; j < radioLabels.length; j++) {
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
            filterNames[currentFilterNumber].classList.remove('filters__mobile-head-item_checked')
        }
    }
})



//Sort and filter of windiw.catalog
let productsSort = _.sortBy(window.catalog, "dateAdded");
productsSort = _.reverse(productsSort);
productsSort = _.filter(productsSort, {
    'category': 'women',
    'fashion': 'Casual style'
});



let newArrivalsContainer = document.querySelector('.new-arrivals__container');
let mainCatalogContainer = document.querySelector('.catalog__content');


//create catalog items
let numberOfCatalogItems;
findCurrentWidth();

let firstElem = 0;
for (let i = 0; i < 2; i++) {

    if (i === 0) {
        let newArrivalRow = createCatalogRow(firstElem);
        newArrivalsContainer.appendChild(newArrivalRow);
        firstElem += numberOfCatalogItems;
    }
    if (i === 1) {
        let numberRows;
        if (numberOfCatalogItems === 4) {
            numberRows = 2;
        } else if (numberOfCatalogItems < 4) {
            numberRows = 3;
        }

        for (let j = 0; j < numberRows; j++) {
            let newArrivalRow = createCatalogRow(firstElem);
            mainCatalogContainer.appendChild(newArrivalRow);
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
    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            let newArrivalRow = createCatalogRow(firstElem);
            newArrivalsContainer.appendChild(newArrivalRow);
            firstElem += numberOfCatalogItems;
        }
        if (i === 1) {
            let numberRows;
            if (numberOfCatalogItems === 4) {
                numberRows = 2;
            } else if (numberOfCatalogItems < 4) {
                numberRows = 3;
            }

            for (let j = 0; j < numberRows; j++) {
                let newCatalogRow = createCatalogRow(firstElem);
                mainCatalogContainer.appendChild(newCatalogRow);
                firstElem += numberOfCatalogItems;
            }
        }
    }
});



//show more button event
let showMoreBtn = document.querySelector('.catalog__show-more-btn');
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
})

mainCatalogContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__title')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);

    }
})

newArrivalsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__img-container')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);

    }
})

newArrivalsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-card__title')) {
        jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
        jsonDataObj.currentProductItem = e.target.parentNode.parentNode.getAttribute('dataid');
        jsonDataObj = JSON.stringify(jsonDataObj);
        window.localStorage.setItem('data', jsonDataObj);

    }
})



function showNewRow() {
    let newCatalogRow = createCatalogRow(firstElem);
    mainCatalogContainer.appendChild(newCatalogRow);
    firstElem += numberOfCatalogItems;

    if (firstElem >= productsSort.length) {
        showMoreBtn.classList.add('catalog__show-more-btn_no_active');
        this.removeEventListener('click', showNewRow);
    }
}



function createCatalogRow(firstElem) {
    let catalogRow = document.createElement('div');
    catalogRow.classList.add('catalog__row');

    let lastElem = firstElem + numberOfCatalogItems;
    if (lastElem > productsSort.length) {
        lastElem = productsSort.length;
    }
    for (let i = firstElem; i < lastElem; i++) {
        let productCard = document.createElement('div');
        productCard.classList.add('catalog__product-card', 'product-card');
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

        if (productPrice !== productsSort[i].price) {
            let oldPrice = productsSort[i].price;

            productCard.innerHTML = `<a href="item.html" class = "product-card__link">
        <div class="product-card__img-container"><img src="${productsSort[i].thumbnail}" alt="product img"
                class="product-card__img">
        </div>
        <h5 class="product-card__title">${productsSort[i].title}</h5>
    </a>
    <div class="product-card__price">
                    <p class="product-card__price_old">£ ${oldPrice}</p>
                    <p class="product-card__price_new">£ ${productPrice}</p>
                </div>`;
        } else {
            productCard.innerHTML = `<a href="item.html" class = "product-card__link">
            <div class="product-card__img-container"><img src="${productsSort[i].thumbnail}" alt="product img"
                    class="product-card__img">
            </div>
            <h5 class="product-card__title">${productsSort[i].title}</h5>
        </a>
        <p class="product-card__price">£ ${productPrice}</p>`;
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