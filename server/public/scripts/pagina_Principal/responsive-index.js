const all = document.getElementById("all");
const fix = document.getElementById("fix");
const contra= document.getElementById("password");
const form= document.getElementById("formCenter");
const full = document.getElementById("full");
const background = document.getElementById("background");
const botonSesion = document.getElementById("sign_in");
const divSesion = document.getElementById('divSesion');
const body=document.getElementById("body");
const sesion = document.getElementById('sesion');
fix.style.width =`${all.clientWidth}px`;
background.addEventListener("loadeddata",e=>{
    fix.style.width =`${all.clientWidth}px`;
})
window.addEventListener("load",e=>{
    sesion.style.right = `${((document.body.offsetWidth - background.clientWidth ) /2)}px`
    botonSesion.style.marginRight =`${((body.clientWidth - background.clientWidth) /2)}px`;
    divSesion.style.right = `${((document.body.offsetWidth- background.clientWidth ) /2)}px`
})
window.addEventListener("resize",e=>{
    botonSesion.style.marginRight =`${((body.clientWidth - background.clientWidth) /2)}px`;
    fix.style.width =`${all.clientWidth }px`;
    divSesion.style.right = `${((document.body.offsetWidth- background.clientWidth ) /2)}`;
    sesion.style.right = `${((document.body.offsetWidth - background.clientWidth ) /2)}`;
})