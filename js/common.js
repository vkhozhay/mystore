'use strict';

var menu = document.querySelector('.header__mobile-menu-button');
var navContainer = document.querySelector('.navigation__container');
var navBlock = document.querySelector('.navigation');

var searchIcon = document.querySelector('.navigation__search-icon');
var searchBlock = document.querySelector('.navigation__search');
var searchInput = document.querySelector('.navigation__search-input');
menu.addEventListener('click', function () {
    menu.classList.toggle('header__mobile-menu-button_active');
    navContainer.classList.toggle('navigation__container_mobile_active');
    navBlock.classList.toggle('navigation_mobile_active');
});

searchIcon.addEventListener('click', function () {
    searchInput.classList.toggle('navigation__search-input_mobile_active');
    searchBlock.classList.toggle('navigation__search_mobile_active');
});

// let navList = document.querySelector('.navigation__list');

// navList.addEventListener('click', function (e) {
//     if (e.target.classList.contain('nav-li')) {
//         e.target.querySelector('.navigation__list-item').classList.add('navigation__list-item_active');
//     }
// })