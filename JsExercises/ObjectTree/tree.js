"use strict";

let tree = {
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

function createTree(obj, prefix, deep, string) {
    let renderTree = '';
    let keys = Object.keys(obj);
    if (typeof prefix === 'undefined') {
        prefix = '';
    }
    for (let key in obj) {
        let lastElem = obj[key] == obj[keys[keys.length - 1]];
        if (typeof obj[key] == 'number' || typeof obj[key] == 'string') {
            renderTree += `${prefix} ${lastElem ? '└' : '├'} ${obj[key]} \n`;
        } else {
            renderTree += `${prefix} ${lastElem ? '└' : '├'} ${key} \n`;
        }
        if (typeof obj[key] == 'object') {
            renderTree += createTree(obj[key], `${prefix} ${lastElem ? ' ' : '│'} `);
        }
    }
    return renderTree;
}
console.log(createTree(tree));