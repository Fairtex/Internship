"use strict";

let students = [{
        name: 'Vasya',
        class: 1,
        mark: 3
    },
    {
        name: 'Slava',
        class: 1,
        mark: 4
    },
    {
        name: 'Gena',
        class: 2,
        mark: 5
    },
    {
        name: 'Serega',
        class: 2,
        mark: 2
    },
    {
        name: 'Natasha',
        class: 1,
        mark: 5
    },
    {
        name: 'Vova',
        class: 2,
        mark: 5
    },
    {
        name: 'John',
        class: 3,
        mark: 5
    },
    {
        name: 'Petr',
        class: 3,
        mark: 3
    },
    {
        name: 'Maxim',
        class: 3,
        mark: 2
    },
    {
        name: 'Ben',
        class: 3,
        mark: 5
    }
];

function averageRating(arr) {
    arr = arr.map(elem => {
        return elem.mark;
    });
    console.log('Средняя оценка всех учащихся: ' + arr.reduce((sum, elem) => sum + elem, 0) / arr.length);
    return;
}

function averageRatingByClass(arr) {
    let classes = new Set([]);
    arr = arr.map(elem => {
        return {
            mark : elem.mark,
            class : elem.class
        };
    });
    arr.forEach(elem => {
        classes.add(elem.class);
    });

    classes.forEach(classElem => {
        let sum = 0;
        let studentsCount = 0;
        arr.forEach(elem => {
            if (classElem === elem.class) {
                sum = sum + elem.mark;
                studentsCount++;
            }
        });
        console.log(`Средняя оценка учащихся класса ${classElem} - ${sum / studentsCount}`);
    });
}

function topStudents(arr) {
    arr.sort(function sortByMark(a,b) {
         if (a.mark > b.mark) return -1;
         if (a.mark === b.mark) return 0;
         if (a.mark < b.mark) return 1;
    });
    arr = arr.slice(0, 5);
    arr.sort(function sortByName(a,b) {
        if (a.name > b.name) return 1;
        if (a.name === b.name) return 0;
        if (a.name < b.name) return -1;
   });
    console.log(arr);
}

averageRating(students);
averageRatingByClass(students);
topStudents(students);