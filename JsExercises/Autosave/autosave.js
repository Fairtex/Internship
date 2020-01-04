"use strict";

const inputElement = document.getElementById('input');
inputElement.addEventListener('input', autosave);

function autosave() {
    let timer = setTimeout(function(){
        console.log(inputElement.value);
    }, 1500);
    inputElement.addEventListener('keypress', function(){
         clearTimeout(timer);
    });
}