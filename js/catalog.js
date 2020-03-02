'use strict';

var filtersBlock = document.querySelector('.filters__container');
var filterBlocks = document.querySelectorAll('.filters__item');
var filterContainers = document.querySelectorAll('.filters__item-container');

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

var filterLabels = mobileFilterContainer.querySelectorAll('.label');

mobileFilterContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('label')) {
        for (var i = 0; i < filterNames.length; i++) {
            // let radioBtns = filterContainers[i].querySelectorAll('input');
            var radioLabels = filterContainers[i].querySelectorAll('label');
            for (var j = 0; j < radioLabels.length; j++) {
                if (e.target.innerHTML === radioLabels[j].innerHTML && e.target.innerHTML !== 'Not selected') {
                    filterNames[i].innerHTML = radioLabels[j].innerHTML;
                    filterNames[i].classList.add('filters__mobile-head-item_checked');
                } else if (e.target.innerHTML === 'Not selected') {
                    filterNames[i].innerHTML = filterContainers[i].parentNode.querySelector('.filters__item-name').innerHTML;
                    filterNames[i].classList.remove('filters__mobile-head-item_checked');
                }
            }
        }
    }
});