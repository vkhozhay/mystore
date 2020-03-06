'use strict';

var photoGallery = document.querySelector('.item__photo-gallery');

var mainPhoto = document.querySelector('.item__main-photo img');

//Change main photo 
photoGallery.addEventListener('click', function (e) {
    var photosOfGallery = photoGallery.querySelectorAll('.item__photo-galery-item');
    for (var i = 0; i < photosOfGallery.length; i++) {
        photosOfGallery[i].classList.remove('item__photo-galery-item_active');
    }
    var photoSrc = e.target.querySelector('img').getAttribute('src');
    e.target.classList.add('item__photo-galery-item_active');
    mainPhoto.setAttribute('src', photoSrc);
});

var currentItemId = void 0;
var currentItemObj = void 0;

var itemName = document.querySelector('.item__discription-name');
var itemPrice = document.querySelector('.item__discription-price');
var itemSizeContainer = document.querySelector('.item__discription-size');
var itemColorContainer = document.querySelector('.item__discription-color');

//Change item data
if (JSON.parse(window.localStorage.getItem('data'))) {
    jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
    currentItemId = jsonDataObj.currentProductItem;
    currentItemObj = _.find(window.catalog, function (o) {
        return o.id === currentItemId;
    });

    mainPhoto.setAttribute('src', currentItemObj.thumbnail);

    photoGallery.innerHTML = '';

    for (var i = 0; i < currentItemObj.preview.length; i++) {
        var photo = document.createElement('div');
        photo.classList.add('item__photo-galery-item');
        if (i === 0) {
            photo.classList.add('item__photo-galery-item_active');
        }

        photo.innerHTML = '<img src="' + currentItemObj.preview[i] + '" alt="item photo">';
        photoGallery.appendChild(photo);
    }

    itemName.innerHTML = currentItemObj.title;
    var itemDiscription = document.querySelector('.item__discription-text');
    if (currentItemObj.discription) {
        itemDiscription.innerHTML = currentItemObj.discription;
    } else {
        itemDiscription.innerHTML = '';
    }

    if (currentItemObj.discountedPrice !== null) {
        itemPrice.innerHTML = '\xA3 ' + currentItemObj.discountedPrice;
    } else {
        itemPrice.innerHTML = '\xA3 ' + currentItemObj.price;
    }

    itemSizeContainer.innerHTML = '<div class="item__discription-size-title">Size:</div>';

    for (var _i = 0; _i < currentItemObj.sizes.length; _i++) {
        var sizeItem = document.createElement('div');
        sizeItem.classList.add('item__discription-size-item');
        sizeItem.innerHTML = '<input type="radio" name="size" id="' + currentItemObj.sizes[_i].replace(/\s+/g, '') + '"><label\n        class="item__label" for="' + currentItemObj.sizes[_i].replace(/\s+/g, '') + '">' + currentItemObj.sizes[_i] + '</label>';

        itemSizeContainer.appendChild(sizeItem);
    }

    itemColorContainer.innerHTML = '<div class="item__discription-color-title">Color:</div>';

    for (var _i2 = 0; _i2 < currentItemObj.colors.length; _i2++) {
        var colorItem = document.createElement('div');
        colorItem.classList.add('item__discription-color-item');
        colorItem.innerHTML = '<input type="radio" name="color" id="' + currentItemObj.colors[_i2] + '"><label\n        class="item__label" for="' + currentItemObj.colors[_i2] + '">' + currentItemObj.colors[_i2] + '</label>';

        itemColorContainer.appendChild(colorItem);
    }
}

var addToBagBtn = document.querySelector('.item__discription-btn');

// Add to bag button event
addToBagBtn.addEventListener('click', function () {
    var itemSize = void 0;
    var allSizes = itemSizeContainer.querySelectorAll('input');
    var allLabelsSize = itemSizeContainer.querySelectorAll('label');
    for (var _i3 = 0; _i3 < allSizes.length; _i3++) {
        if (allSizes[_i3].checked) {
            itemSize = allLabelsSize[_i3].innerHTML;
        }
    }

    currentItemObj.checkedSize = itemSize;

    var itemColor = void 0;
    var allColors = itemColorContainer.querySelectorAll('input');
    var allLabelsColor = itemColorContainer.querySelectorAll('label');
    for (var _i4 = 0; _i4 < allColors.length; _i4++) {
        if (allColors[_i4].checked) {
            itemColor = allLabelsColor[_i4].innerHTML;
        }
    }

    currentItemObj.checkedColor = itemColor;

    currentItemObj.numberItems = 1;

    jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
    jsonDataObj.shoppingBagItems.push(currentItemObj);
    jsonDataObj = JSON.stringify(jsonDataObj);
    window.localStorage.setItem('data', jsonDataObj);

    changeHeaderBag();
});