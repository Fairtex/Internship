"use strict";

window.addEventListener('DOMContentLoaded', function () {

    //Tabs
    const togglesWrap = document.querySelector('.js-section-toggler-wrap');
    const tabToggle = togglesWrap.querySelectorAll('.js-section-toggler');
    const tabSections = document.querySelectorAll('.js-section');
    const premiumSection = document.querySelector('.js-section-premium');
    const standartSection = document.querySelector('.js-section-standart');

    const hideTabs = (a, tabArr) => {
        for (let i = a; i < tabArr.length; i++) {
            tabArr[i].classList.remove('show');
            tabArr[i].classList.add('hide');
        }
    };

    const showTabs = (a, tabArr) => {
        if (tabArr[a].classList.contains('hide')) {
            tabArr[a].classList.remove('hide');
            tabArr[a].classList.add('show');
        }
    };

    //Функция для переключения табов активной секции
    const activeArticleShow = (section) => {
        let tabNav = section.querySelector('.js-tab-toggle-wrap');
        let tabNavLinks = tabNav.querySelectorAll('.js-tab-toggle');
        let activeTabArticles = section.querySelectorAll('.js-tab');

        for (let x = 0; x < tabNavLinks.length; x++) {
            if (tabNavLinks[x].classList.contains('tab-nav__link--active')) {
                hideTabs(0, activeTabArticles);
                showTabs(x, activeTabArticles);
            }
        }

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

    hideTabs(1, tabSections);
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

    //настройка плагина js-datepicker для календаря

    const stPicker = datepicker('#st-calendar');
    const prPicker = datepicker('#pr-calendar');

    //Форма заказа

    Array.prototype.forEach.call(document.querySelectorAll('.js-order-form:not(.processed)'), form => {
        const ticketsInput = form.querySelector('.js-ticket-input');
        const inputBlocks = form.querySelectorAll('.order-form__input-block');
        const dropdownInputs = form.querySelectorAll('.js-dropdown-input');
        const buttonsPlus = form.querySelectorAll('.js-persons-plus');
        const buttonsMinus = form.querySelectorAll('.js-persons-minus');
        const buttonSubmit = form.querySelector('.js-submit-button');
        const modalPopup = document.querySelector('.modal-popup');
        const formType = form.dataset.cost; //для обращения к обьектам цен через []
        const maxTickets = 10;
        let totalTickets = 0;
        console.log(formType);

        const prices = {
            premium: {
                adult: 37,
                senior: 35,
                youth: 20,
                child: 0
            },
            standart: {
                adult: 28,
                senior: 26,
                youth: 14,
                child: 0
            }
        };

        let tickets = {
            adult: 0,
            senior: 0,
            youth: 0,
            child: 0
        };

        const updateValue = () => {
            let total = '';
            for (let key of Object.keys(tickets)) {
                if (Number(tickets[key]) > 0) {
                    total = total + `${key} X ${tickets[key]} `;
                }
            }
            ticketsInput.value = total;
        };

        const disabledPlus = () => {
            Array.prototype.forEach.call(buttonsPlus, buttonPlus => {
                buttonPlus.classList.add('js-persons-btn-disabled');
            });
        };

        const activatePlus = () => {
            Array.prototype.forEach.call(buttonsPlus, buttonPlus => {
                buttonPlus.classList.remove('js-persons-btn-disabled');
            });
        };

        const disabledMinus = () => {
            Array.prototype.forEach.call(buttonsMinus, buttonMinus => {
                buttonMinus.classList.add('js-persons-btn-disabled');
            });
        };

        const activateMinus = () => {
            Array.prototype.forEach.call(buttonsMinus, buttonMinus => {
                buttonMinus.classList.remove('js-persons-btn-disabled');
            });
        };

        Array.prototype.forEach.call(inputBlocks, inputBlock => {

            const input = inputBlock.querySelector('.order-form__input');
            const icon = inputBlock.querySelector('.order-form__icon');
            const dropdownBlock = inputBlock.querySelector('.order-form__dropdown');
            const tourInput = inputBlock.querySelector('.js-tour-input');
            const dropdownTours = inputBlock.querySelectorAll('.dropdown-tour__item');

            inputBlock.addEventListener('click', (event) => {
                let target = event.target;
                if ((target == input) || (target == icon)) {
                    if (icon.classList.contains('fa-chevron-down')) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        icon.classList.add('fa-chevron-down');
                        icon.classList.remove('fa-chevron-up');
                    }
                    dropdownBlock.classList.toggle('hide');
                }
            });

            Array.prototype.forEach.call(dropdownTours, dropdownTour => {
                const tourDescription = dropdownTour.querySelector('.js-tour-description');
                const message = tourDescription.cloneNode(true);
                message.classList.remove('hide');
                dropdownTour.addEventListener('click', (event) => {
                    if (inputBlock.children.length > 2) {
                        inputBlock.removeChild(inputBlock.lastElementChild);
                    }
                    event.preventDefault();
                    if (icon.classList.contains('fa-chevron-down')) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        icon.classList.add('fa-chevron-down');
                        icon.classList.remove('fa-chevron-up');
                    }
                    input.value = dropdownTour.text;
                    dropdownBlock.classList.add('hide');
                    inputBlock.appendChild(message);
                });
            });

        });

        Array.prototype.forEach.call(buttonsPlus, buttonPlus => {
            buttonPlus.addEventListener('click', () => {
                const input = buttonPlus.previousElementSibling;
                if (Number(input.value) >= 10) {
                    buttonPlus.classList.add('js-persons-btn-disabled');
                    return;
                }
                if (totalTickets >= maxTickets) {
                    disabledPlus();
                    return;
                }
                activateMinus();
                totalTickets++;
                console.log(totalTickets);
                input.value = Number(input.value) + 1;
                tickets[input.name]++;
                updateValue();
                //проверка на 10
            });
        });
        Array.prototype.forEach.call(buttonsMinus, buttonMinus => {
            buttonMinus.addEventListener('click', () => {
                const input = buttonMinus.nextElementSibling;
                if ((Number(input.value) == 0)  && (totalTickets == 0)) {
                    disabledMinus();
                    return;
                } else if (Number(input.value) == 0) {
                    buttonMinus.classList.add('js-persons-btn-disabled');
                    return;
                }
                activatePlus();
                totalTickets--;
                console.log(totalTickets);
                input.value = Number(input.value) - 1;
                tickets[input.name]--;
                updateValue();
                //проверка на 0
            });
        });
        form.classList.add('processed');
        buttonSubmit.addEventListener('click', event => {
            event.preventDefault();
            console.log(prices[formType].adult * tickets.adult);
            modalPopup.innerHTML = tickets.adult;
        });
    });
});