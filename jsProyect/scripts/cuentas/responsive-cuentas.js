'use strict';
const cabecera = document.getElementById("cabecera");
const backgroundHeight = document.getElementById("background-height");
const containerCamara = document.getElementById("separatorWidth");
const divBorderCamara=  document.getElementById("divBorderCamara");
const plusCamaraDiv=  document.getElementById("plusCamaraDiv");
const imageIcono=document.getElementById("imageIcono");

const buttonLupa=document.getElementById("button-lupa");

const barraDeBusqueda =document.getElementById("barraDeBusqueda");
const background = document.getElementById("background");
const continerBackground = document.getElementById("div-image-background");
const borderParaPosts = document.getElementById("border-para-posts");
const responsiveIconos=document.querySelectorAll(".responsiveIconos");
const perfil = document.getElementById("perfil");
const lupa = document.getElementById("lupa");

const escrituraParaBuscar = document.getElementById("escrituraParaBuscar");

const divRecomiendaciones = document.getElementById("divRecomiendaciones");
window.addEventListener("load",e=>{

    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = responsiveIconos[index].clientHeight+"px";
    }
    divRecomiendaciones.style.width = escrituraParaBuscar.clientWidth+"px";
    borderParaPosts.style.minHeight = (window.innerHeight-cabecera.clientHeight) + "px";
    backgroundHeight.style.marginTop = cabecera.clientHeight+"px";
    buttonLupa.style.height= barraDeBusqueda.clientHeight *0.6 +"px";
    buttonLupa.style.left = ((document.getElementById("totalWidthIcon").clientWidth +barraDeBusqueda.clientWidth+((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth)+"px";
    
})



//containerCamara.style.right = (divBorderCamara.clientWidth+4) + "px";
//plusCamaraDiv.style.right = "0px"

window.addEventListener("resize",e=>{
    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = responsiveIconos[index].clientHeight+"px";
    }
    buttonLupa.style.height= barraDeBusqueda.clientHeight *0.6 +"px";
    buttonLupa.style.left = ((document.getElementById("totalWidthIcon").clientWidth +barraDeBusqueda.clientWidth+((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth)+"px";
    divRecomiendaciones.style.width = escrituraParaBuscar.clientWidth+"px";


    backgroundHeight.style.marginTop = cabecera.clientHeight+"px";
    borderParaPosts.style.height = window.innerHeight + "px";
})

