"use strict";
function createX(element){
    let divDelete = document.createElement("img");
    divDelete.setAttribute("class","deleteX deleteListener");
    divDelete.setAttribute("referen",element);
    divDelete.setAttribute("src","images/Transparent_X.png");
    return divDelete;
}