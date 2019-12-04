"use strict";
window.addEventListener('DOMContentLoaded', function () {

    //Mobile menu

    var navToggle = document.querySelector('.js-header-toggle');
    var mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', function () {
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

    var mainSection = document.querySelector('.js-main');
    var showListBtn = document.getElementById('toggle-list');
    var showMapBtn = document.getElementById('toggle-map');
    var museumsList = mainSection.querySelector('.js-museums');
    var map = mainSection.querySelector('.js-map');

    showMapBtn.addEventListener('click', function (event) {
        event.preventDefault();
        showListBtn.classList.toggle('js-hidden');
        showMapBtn.classList.toggle('js-hidden');
        museumsList.classList.toggle('js-hidden');
        map.classList.toggle('js-hidden');

    });

    showListBtn.addEventListener('click', function (event) {
        event.preventDefault();
        showListBtn.classList.toggle('js-hidden');
        showMapBtn.classList.toggle('js-hidden');
        museumsList.classList.toggle('js-hidden');
        map.classList.toggle('js-hidden');
    });

    //SLider

    var slideIndex = 1;
    var slides = document.querySelectorAll('.js-slide');
    var nextBtn = document.getElementById('js-next-btn');
    var prevBtn = document.getElementById('js-prev-btn');
    var autoplay = setInterval(slideSwitch, 3000, 1);

    showSlide(slideIndex);

    function showSlide(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        [].forEach.call(slides, function (item) {
            item.style.display = 'none';
        });
        slides[slideIndex - 1].style.display = 'block';
    }

    function slideSwitch(n) {
        showSlide(slideIndex += n);
    }

    nextBtn.addEventListener('click', function (event) {
        event.preventDefault();
        clearInterval(autoplay);
        slideSwitch(1);
    });
    prevBtn.addEventListener('click', function (event) {
        event.preventDefault();
        clearInterval(autoplay);
        slideSwitch(-1);
    });

    //Fixed filters and map

    var mainFilter = mainSection.querySelector('.js-main-filters');
    var mapWrapper = mainSection.querySelector('.js-map-wrapper');

    window.addEventListener('scroll', function () {
        if (window.innerWidth >= 768) {
            var scrollOffset = window.pageYOffset;
            if (scrollOffset >= mainSection.offsetTop) {
                mainSection.classList.add('page-main-scrolled');
                map.classList.add('js-map-fixed');
                mapWrapper.classList.add('js-map-wrapper-height');
                mainFilter.classList.add('js-main-filters-fixed');
                return;
            }
            mainSection.classList.remove('page-main-scrolled');
            map.classList.remove('js-map-fixed');
            mapWrapper.classList.remove('js-map-wrapper-height');
            mainFilter.classList.remove('js-main-filters-fixed');
        }
    });

    //Mobile filters show/hide

    var showMobFilterBtn = document.getElementById('js-show-mob-filter-btn');
    var mobileFilter = document.getElementById('js-mobile-filter');
    var closeMobFilterBtn = document.getElementById('js-close-mob-filter-btn');
    var overlay = document.getElementById('js-overlay');

    showMobFilterBtn.addEventListener('click', function (event) {
        event.preventDefault();
        mobileFilter.classList.add('js-mobile-filter-show');
        overlay.style.display = 'block';
    });

    closeMobFilterBtn.addEventListener('click', function () {
        mobileFilter.classList.remove('js-mobile-filter-show');
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function () {
        mobileFilter.classList.remove('js-mobile-filter-show');
        overlay.style.display = 'none';
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            overlay.style.display = 'none';
        }
    });
});