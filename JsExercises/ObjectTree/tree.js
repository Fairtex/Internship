"use strict";

const tree = {
    firstLevelFirstField: {
        secondLevelFirstField: 1,
        secondLevelSecondField: {
            thirdLevelFirstField: 'a2',
            thirdLevelSecondField: {
                fourthLevelFirstField: {
                    fifthLevelFirstField: 'a2',
                    fifthLevelSecondField: 5,
                    fifthLevelThirdField: 'School'
                }
            },
            thirdLevelThirdField: {},
            thirdLevelFourthField: 500
        },
        secondLevelThirdField: {},
        secondLevelFourthField: {
            thirdLevelFirstField: 'JavaScript',
            thirdLevelSecondField: 'margin auto',
            thirdLevelThirdField: '!important is evel'
        },
        secondLevelFifthField: 'Async'
    },
    firstLevelSecondField: 'easy',
    firstLevelThirdField: 123,
    firstLevelFourthField: {
        secondLevelFirstField: 'React.js',
        secondLevelSecondField: {
            thirdLevelFirstField: 42
        }
    }
};

function createTree(obj, prefix, deepLvl = Infinity) {
    if (deepLvl <= 0) {
        return '';
    }
    let renderTree = '';
    let keys = Object.keys(obj);
    if (typeof prefix === 'undefined') {
        prefix = '';
    }
    for (let key in obj) {
        let lastElem = obj[key] == obj[keys[keys.length - 1]];
        if (typeof obj[key] === 'number' || typeof obj[key] === 'string') {
            renderTree += `${prefix} ${lastElem ? '└' : '├'} ${obj[key]} \n`;
        } else {
            renderTree += `${prefix} ${lastElem ? '└' : '├'} ${key} \n`;
        }
        if (typeof obj[key] === 'object') {
            renderTree += createTree(obj[key], `${prefix} ${lastElem ? ' ' : '│'} `, deepLvl - 1);
        }
    }
    return renderTree;
}

function getDeepByUser() {
    let deepByUser = parseInt(prompt('Укажите уровень вложенности файла'));
    while(Number.isNaN(deepByUser) || deepByUser == '' || deepByUser <= 0) {
        alert('Ошибка! Введите уровень в формате положительного числа!');
        deepByUser = parseInt(prompt('Укажите уровень вложенности файла'));
    }
    return deepByUser;
}

function getStringByUser() {
    let searchString = prompt('Введите искомую строку');
    while (typeof searchString != 'string' || searchString == '' || searchString.length > 50) {
        alert('Ошибка! Укажите корректную строку!');
        searchString = prompt('Введите искомую строку');
    }
    return searchString;
}

function searchOnFile(obj, string) {
    let searchResult = '';
    for (let key in obj) {
        if (key.includes(string) || String(obj[key]).includes(string)){
            searchResult += `${key} : ${obj[key]} \n`;
        }
        if (typeof obj[key] === 'object') {
            searchResult += searchOnFile(obj[key], string);
        }
    }
    return searchResult;
}

console.log(createTree(tree));
console.log(createTree(tree, '', getDeepByUser()));
console.log(searchOnFile(tree, getStringByUser()));

