"use strict";

window.addEventListener('DOMContentLoaded', function () {

//Tabs
let togglesWrap = document.querySelector('.js-section-toggler-wrap');
let tabToggle = togglesWrap.querySelectorAll('.js-section-toggler');
let tabSections = document.querySelectorAll('.js-section');
let premiumSection = document.querySelector('.js-section-premium');
let standartSection = document.querySelector('.js-section-standart');

let hideTabs = (a, tabArr) => {
    for (let i = a; i < tabArr.length; i++) {
        tabArr[i].classList.remove('show');
        tabArr[i].classList.add('hide');
    }
};

let showTabs = (a, tabArr) => {
    if (tabArr[a].classList.contains('hide')) {
        tabArr[a].classList.remove('hide');
        tabArr[a].classList.add('show');
    }
};

//Функция для переключения табов активной секции
let activeArticleShow = (section) => {
    let tabNav = section.querySelector('.js-tab-toggle-wrap');
    let tabNavLinks = tabNav.querySelectorAll('.js-tab-toggle');
    let activeTabArticles = section.querySelectorAll('.js-tab');

    hideTabs(1, activeTabArticles);

    tabNav.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('js-tab-toggle')) {
            event.preventDefault();
            for (let i = 0; i < tabNavLinks.length; i++) {
                tabNavLinks[i].classList.remove('tab-nav__link--active');
                if (target == tabNavLinks[i]) {
                    tabNavLinks[i].classList.add('tab-nav__link--active');
                    hideTabs(0, activeTabArticles);
                    showTabs(i, activeTabArticles);
                }
            }
        }
    });
};

hideTabs(1,tabSections);
activeArticleShow(standartSection); //Секция стандартного тура по-умолчанию открыта, вызываем для нее функцию

//Переключение секций
togglesWrap.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.closest('.js-section-toggler')) {
        event.preventDefault();
        for (let i = 0; i < tabToggle.length; i++) {
            tabToggle[i].classList.add('cost-toggle--active');
            if ((target == tabToggle[i]) || (target.parentNode == tabToggle[i])) {
                tabToggle[i].classList.remove('cost-toggle--active');
                hideTabs(0, tabSections);
                showTabs(i, tabSections);
                //При переключении секции подключаем функцию для переключения табов активной секции
                if (tabSections[i].classList.contains('js-section-premium')) {
                    activeArticleShow(premiumSection);
                } else {
                    activeArticleShow(standartSection);
                }
            }
        }
    }
});
});