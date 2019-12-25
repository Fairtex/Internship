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

    const stPicker = datepicker('#st-calendar', {
        customDays: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
        dateSelected: new Date(2018, 2, 29),
        showAllDates: true
    });
    const prPicker = datepicker('#pr-calendar', {
        customDays: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
        dateSelected: new Date(2018, 2, 29),
        showAllDates: true
    });

    //Форма заказа

    Array.prototype.forEach.call(document.querySelectorAll('.js-order-form:not(.processed)'), form => {
        const ticketsInput = form.querySelector('.js-ticket-input');
        const calendarInput = form.querySelector('.js-calendar');
        const inputBlocks = form.querySelectorAll('.order-form__input-block');
        const buttonsPlus = form.querySelectorAll('.js-persons-plus');
        const buttonsMinus = form.querySelectorAll('.js-persons-minus');
        const buttonSubmit = form.querySelector('.js-submit-button');
        const modalPopup = document.querySelector('.modal-popup');
        const closeModalBtn = modalPopup.querySelector('.js-close-popup');
        const submitModal = modalPopup.querySelector('.js-modal-popup-submit');
        const overlay = document.querySelector('.overlay');
        const telInput = modalPopup.querySelector('.js-modal-tel');
        const formType = form.dataset.cost; //для обращения к обьектам цен через []
        const maxTickets = 10;
        let totalTickets = 0;
        let order = {};

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
            let string = '';
            for (let key of Object.keys(tickets)) {
                if (Number(tickets[key]) > 0) {
                    string = string + `${key} X ${tickets[key]} `;
                }
            }
            ticketsInput.value = string;
        };

        const showTotalPrice = () => {
            let totalPrice = 0;
            const totalPriceBlock = form.querySelector('.js-total-price');
            for (let key of Object.keys(tickets)) {
                if (Number(tickets[key]) > 0) {
                    totalPrice = totalPrice + (prices[formType][key] * tickets[key]);
                }
            }
            if (totalPrice > 0) {
                if (totalPriceBlock.classList.contains('hide')) {
                    totalPriceBlock.classList.remove('hide');
                }
                totalPriceBlock.textContent = `Subtotal: $${totalPrice}`;
            } else {
                if (!totalPriceBlock.classList.contains('hide')) {
                    totalPriceBlock.classList.add('hide');
                }
            }
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

        const showPopup = (obj) => {
            let confirmedOrder = obj;
            const ticketBlock = modalPopup.querySelector('.js-modal-popup-ticket');
            ticketBlock.innerText = '';
            modalPopup.classList.remove('hide');
            overlay.classList.remove('hide');
            document.body.style.overflow = "hidden";
            for (let key of Object.keys(confirmedOrder)) {
                if (key == 'subtotal') {
                    ticketBlock.insertAdjacentHTML('beforeend', `<div class="modal-popup__ticket-item"><span class="name">${key}</span>: $${confirmedOrder[key]}</div>`);
                } else {
                    ticketBlock.insertAdjacentHTML('beforeend', `<div class="modal-popup__ticket-item"><span class="name">${key}</span>: ${confirmedOrder[key]} person</div>`);
                }
            }
        };

        const hideModal = (popup) => {
            overlay.classList.add('hide');
            popup.classList.add('hide');
            document.body.style.overflow = "auto";
        };

        Array.prototype.forEach.call(inputBlocks, inputBlock => {
            const input = inputBlock.querySelector('.js-dropdown-input');
            const icon = inputBlock.querySelector('.js-dropdown-icon');
            const dropdownBlock = inputBlock.querySelector('.order-form__dropdown');
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
                    if (input.classList.contains('js-empty-input')) {
                        input.classList.remove('js-empty-input');
                        input.parentNode.classList.remove('js-input-error');
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

        calendarInput.addEventListener('click', () => {
            if (calendarInput.classList.contains('js-empty-input')) {
                calendarInput.classList.remove('js-empty-input');
                calendarInput.parentNode.classList.remove('js-input-error');
            }
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
                showTotalPrice();
                console.log(tickets);
            });
        });
        Array.prototype.forEach.call(buttonsMinus, buttonMinus => {
            buttonMinus.addEventListener('click', () => {
                const input = buttonMinus.nextElementSibling;
                if ((Number(input.value) == 0) && (totalTickets == 0)) {
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
                showTotalPrice();
            });
        });
        form.classList.add('processed');
        buttonSubmit.addEventListener('click', event => {
            const formInputs = form.querySelectorAll('.order-form__input');
            const calendarInput = form.querySelector('.js-calendar');
            const tourInput = form.querySelector('.js-tour-input');
            const totalPrice = form.querySelector('.js-total-price');
            event.preventDefault();
            if ((ticketsInput.value !== '') && (calendarInput.value !== '') && (tourInput.value !== '')) {
                console.log('Все поля заполнены');
                for (let key in tickets) {
                    if (tickets[key] > 0) {
                        order[key] = tickets[key];
                    }
                }
                order.subtotal = Number(totalPrice.textContent.replace(/\D+/g, ""));
                for (let i = 0; i < formInputs.length; i++) {
                    formInputs[i].value = '';
                }
                totalPrice.innerText = '';
                showPopup(order);
            } else {
                Array.prototype.forEach.call(formInputs, formInput => {
                    if (formInput.value == '') {
                        formInput.classList.add('js-empty-input');
                        formInput.parentNode.classList.add('js-input-error');
                    }
                });
            }
        });

        closeModalBtn.addEventListener('click', () => {
            hideModal(modalPopup);
        });

        overlay.addEventListener('click', () => {
            hideModal(modalPopup);
        });

        submitModal.addEventListener('click', (event) => {
            const successPopup = document.querySelector('.success-popup');
            event.preventDefault();
            if (telInput.value !== '') {
                successPopup.classList.remove('hide');
                let closeSuccess = () => {
                    successPopup.classList.add('hide');
                };
                console.log(order);
                setTimeout(closeSuccess, 1500);
                setTimeout(hideModal, 1500, modalPopup);
            } else {
                telInput.classList.add('js-empty-input');
                telInput.parentNode.classList.add('js-input-error');
            }
        });

        telInput.addEventListener('click', () => {
            if (telInput.classList.contains('js-empty-input')) {
                telInput.classList.remove('js-empty-input');
                telInput.parentNode.classList.remove('js-input-error');
            }
        });
    });
});