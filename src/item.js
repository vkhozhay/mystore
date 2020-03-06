let photoGallery = document.querySelector('.item__photo-gallery');

let mainPhoto = document.querySelector('.item__main-photo img');

//Change main photo 
photoGallery.addEventListener('click', function (e) {
    let photosOfGallery = photoGallery.querySelectorAll('.item__photo-galery-item');
    for (let i = 0; i < photosOfGallery.length; i++) {
        photosOfGallery[i].classList.remove('item__photo-galery-item_active');
    }
    let photoSrc = e.target.querySelector('img').getAttribute('src');
    e.target.classList.add('item__photo-galery-item_active');
    mainPhoto.setAttribute('src', photoSrc);
})



let currentItemId;
let currentItemObj;

let itemName = document.querySelector('.item__discription-name');
let itemPrice = document.querySelector('.item__discription-price');
let itemSizeContainer = document.querySelector('.item__discription-size');
let itemColorContainer = document.querySelector('.item__discription-color');

//Change item data
if (JSON.parse(window.localStorage.getItem('data'))) {
    jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
    currentItemId = jsonDataObj.currentProductItem;
    currentItemObj = _.find(window.catalog, function (o) {
        return o.id === currentItemId;
    });


    mainPhoto.setAttribute('src', currentItemObj.thumbnail);


    photoGallery.innerHTML = '';

    for (let i = 0; i < currentItemObj.preview.length; i++) {
        let photo = document.createElement('div');
        photo.classList.add('item__photo-galery-item');
        if (i === 0) {
            photo.classList.add('item__photo-galery-item_active');
        }

        photo.innerHTML = `<img src="${currentItemObj.preview[i]}" alt="item photo">`;
        photoGallery.appendChild(photo);
    }


    itemName.innerHTML = currentItemObj.title;
    let itemDiscription = document.querySelector('.item__discription-text');
    if (currentItemObj.discription) {
        itemDiscription.innerHTML = currentItemObj.discription;
    } else {
        itemDiscription.innerHTML = '';
    }


    if (currentItemObj.discountedPrice !== null) {
        itemPrice.innerHTML = `£ ${currentItemObj.discountedPrice}`;
    } else {
        itemPrice.innerHTML = `£ ${currentItemObj.price}`;
    }



    itemSizeContainer.innerHTML = '<div class="item__discription-size-title">Size:</div>';

    for (let i = 0; i < currentItemObj.sizes.length; i++) {
        let sizeItem = document.createElement('div');
        sizeItem.classList.add('item__discription-size-item');
        sizeItem.innerHTML = `<input type="radio" name="size" id="${currentItemObj.sizes[i].replace(/\s+/g, '')}"><label
        class="item__label" for="${currentItemObj.sizes[i].replace(/\s+/g, '')}">${currentItemObj.sizes[i]}</label>`;

        itemSizeContainer.appendChild(sizeItem);
    }


    itemColorContainer.innerHTML = '<div class="item__discription-color-title">Color:</div>';

    for (let i = 0; i < currentItemObj.colors.length; i++) {
        let colorItem = document.createElement('div');
        colorItem.classList.add('item__discription-color-item');
        colorItem.innerHTML = `<input type="radio" name="color" id="${currentItemObj.colors[i]}"><label
        class="item__label" for="${currentItemObj.colors[i]}">${currentItemObj.colors[i]}</label>`;

        itemColorContainer.appendChild(colorItem);
    }

}


let addToBagBtn = document.querySelector('.item__discription-btn');

// Add to bag button event
addToBagBtn.addEventListener('click', function () {
    let itemSize;
    let allSizes = itemSizeContainer.querySelectorAll('input');
    let allLabelsSize = itemSizeContainer.querySelectorAll('label');
    for (let i = 0; i < allSizes.length; i++) {
        if (allSizes[i].checked) {
            itemSize = allLabelsSize[i].innerHTML;
        }
    }


    currentItemObj.checkedSize = itemSize;

    let itemColor;
    let allColors = itemColorContainer.querySelectorAll('input');
    let allLabelsColor = itemColorContainer.querySelectorAll('label');
    for (let i = 0; i < allColors.length; i++) {
        if (allColors[i].checked) {
            itemColor = allLabelsColor[i].innerHTML;
        }
    }


    currentItemObj.checkedColor = itemColor;

    currentItemObj.numberItems = 1;

    jsonDataObj = JSON.parse(window.localStorage.getItem('data'));
    jsonDataObj.shoppingBagItems.push(currentItemObj);
    jsonDataObj = JSON.stringify(jsonDataObj);
    window.localStorage.setItem('data', jsonDataObj);

    changeHeaderBag();
})