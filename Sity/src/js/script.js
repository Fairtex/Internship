"use strict";
window.addEventListener('DOMContentLoaded', function () {
    //Mobile menu

    let navToggle = document.querySelector('.page-header__toggle');
    let mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', () => {
        if (navToggle.classList.contains('page-header__toggle--closed')) {
            navToggle.classList.remove('page-header__toggle--closed');
            navToggle.classList.add('page-header__toggle--opened');
            mainNav.classList.add('main-nav--opened');
        } else {
            navToggle.classList.add('page-header__toggle--closed');
            navToggle.classList.remove('page-header__toggle--opened');
            mainNav.classList.remove('main-nav--opened');
        }
    });

    //show Map or List

    let showListBtn = document.getElementById('toggle-list');
    let showMapBtn = document.getElementById('toggle-map');
    let museumsList = document.querySelector('.museums');
    let map = document.querySelector('.map');

    showMapBtn.addEventListener('click', function (event) {
        event.preventDefault();
        showListBtn.classList.toggle('hidden');
        showMapBtn.classList.toggle('hidden');
        museumsList.classList.toggle('hidden');
        map.classList.toggle('hidden');

    });
    
    showListBtn.addEventListener('click', function (event) {
        event.preventDefault();
        showListBtn.classList.toggle('hidden');
        showMapBtn.classList.toggle('hidden');
        museumsList.classList.toggle('hidden');
        map.classList.toggle('hidden');
    });
});