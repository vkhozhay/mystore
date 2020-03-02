let filtersBlock = document.querySelector('.filters__container');
let filterBlocks = document.querySelectorAll('.filters__item');
let filterContainers = document.querySelectorAll('.filters__item-container');


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

let filterLabels = mobileFilterContainer.querySelectorAll('.label')


mobileFilterContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('label')) {
        for (let i = 0; i < filterNames.length; i++) {
            // let radioBtns = filterContainers[i].querySelectorAll('input');
            let radioLabels = filterContainers[i].querySelectorAll('label');
            for (let j = 0; j < radioLabels.length; j++) {
                if (e.target.innerHTML === radioLabels[j].innerHTML && e.target.innerHTML !== 'Not selected') {
                    filterNames[i].innerHTML = radioLabels[j].innerHTML;
                    filterNames[i].classList.add('filters__mobile-head-item_checked');
                } else if (e.target.innerHTML === 'Not selected') {
                    filterNames[i].innerHTML = filterContainers[i].parentNode.querySelector('.filters__item-name').innerHTML;
                    filterNames[i].classList.remove('filters__mobile-head-item_checked')
                }
            }
        }
    }
})