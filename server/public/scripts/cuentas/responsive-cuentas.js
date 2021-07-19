'use strict';
const cabecera = document.getElementById("cabecera");
const backgroundHeight = document.getElementById("background-height");
const containerCamara = document.getElementById("separatorWidth");
const divBorderCamara=  document.getElementById("divBorderCamara");
const plusCamaraDiv=  document.getElementById("plusCamaraDiv");
const imageIcono=document.getElementById("imageIcono");
const buttonLupa=document.getElementById("button-lupa");
const barraDeBusqueda =document.querySelector(".js-referencia_para_calcular_la_pocision_de_la_lupa");
const fromBarraDeBusqueda= document.getElementById("barraDeBusqueda")
const background = document.getElementById("background");
const continerBackground = document.getElementById("div-image-background");
const borderParaPosts = document.getElementById("border-para-posts");
const responsiveIconos=document.querySelectorAll(".responsiveIconos");
const perfil = document.getElementById("perfil");
const lupa = document.getElementById("lupa");
const escrituraParaBuscar = document.getElementById("escrituraParaBuscar");
const divRecomiendaciones = document.getElementById("divRecomiendaciones");

window.addEventListener("load",e=>{
    cabecera.style.width=`${document.body.offsetWidth}px`
    if(background.naturalWidth < 600){
        background.style.objectFit ="contain";
        
    }else{
        background.style.width = "100%"
    }
    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`;
    }
    divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`;
    borderParaPosts.style.minHeight = `${window.innerHeight-cabecera.clientHeight}px`;
    backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`;
    
    barraDeBusqueda.style.width = `${cabecera.clientWidth - document.getElementById("totalWidthIcon").clientWidth -document.getElementById("perfil-del-usuario").clientWidth}px`;
    buttonLupa.style.width =  `${barraDeBusqueda.clientHeight *0.6}px`;  
    buttonLupa.style.left = `${((document.getElementById("totalWidthIcon").clientWidth +escrituraParaBuscar.clientWidth+
    ((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth)}px`;
})
window.addEventListener("resize",e=>{
    cabecera.style.width=`${document.body.offsetWidth}px`
    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`;
    }
    barraDeBusqueda.style.width = `${cabecera.clientWidth - document.getElementById("totalWidthIcon").clientWidth -document.getElementById("perfil-del-usuario").clientWidth}px`;
    buttonLupa.style.width =  `${barraDeBusqueda.clientHeight *0.6}px`;  
    buttonLupa.style.left = `${((document.getElementById("totalWidthIcon").clientWidth +escrituraParaBuscar.clientWidth+
    ((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth)}px`;
    backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`;
    borderParaPosts.style.height = `${window.innerHeight}px`;
});