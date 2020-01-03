"use strict";

function isObjectsEqual(objA, objB) {
    if (objA === objB) return true;

    if ((objA == null) || (typeof objA != "object") ||
        (objB == null) || (typeof objB != "object")) return false;

    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);

    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
        if ((!keysB.includes(key)) || (!isObjectsEqual(objA[key], objB[key]))) return false;
    }

    return true;
}

let exampleObj1 = {
    string: "qwerty",
    num: 12,
    tel: 88005553535,
    subObj: {
        name: "a",
        email: "b"
    }
};

let exampleObj2 = {
    string: "qwerty",
    num: 12,
    tel: 88005553535,
    subObj: {
        name: "a",
        email: "b"
    }
};

let exampleObj3 = {
    string: "qwerty",
    num: 12,
    tel: 88005553535,
    subObj: {
        name: "a",
        email: "x"
    }
};

console.log(isObjectsEqual(exampleObj1, exampleObj2));
console.log(isObjectsEqual(exampleObj1, exampleObj3));
console.log(isObjectsEqual(exampleObj1, exampleObj1));
console.log(isObjectsEqual(exampleObj1, {
    string: "qwerty",
    num: 12,
    tel: 88005553535,
    subObj: {
        name: "a",
        email: "b",
        tel: 123
    }
}));