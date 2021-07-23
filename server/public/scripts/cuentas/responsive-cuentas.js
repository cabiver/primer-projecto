"use strict";
const cabecera = document.getElementById("responsive_cuentas.js-calcular_y_asignar_width_a_la_cabecera");
const backgroundHeight = document.getElementById("responsive_cuentas.js-para_hacer_margin_top");
const buttonLupa=document.getElementById("responsive_cuentas.js-posicionar_la_lupa");
const barraDeBusqueda =document.getElementById("responsive_cuentas.js-referencia_para_calcular_la_pocision_de_la_lupa-barra_de_busqueda-div_barra_busqueda");
const fromBarraDeBusqueda= document.getElementById("responsive_cuentas.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda")
const background = document.getElementById("responsive_cuentas.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background");
const responsiveIconos=document.querySelectorAll(".responsive_cuentas.js-arrays_de_iconos_para_volverlos_cuadrados");
const divPerfilUsuario = document.getElementById("responsive_cuentas.js-div_de_tu_perfil_para_ajustar_barra_de_busqueda");
// const lupa = document.getElementById("lupa");
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
    backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`;
    
    barraDeBusqueda.style.width = `${cabecera.clientWidth - document.getElementById("totalWidthIcon").clientWidth -divPerfilUsuario.clientWidth}px`;
    buttonLupa.style.width =  `${barraDeBusqueda.clientHeight *0.6}px`;  
    buttonLupa.style.left = `${((document.getElementById("totalWidthIcon").clientWidth +escrituraParaBuscar.clientWidth+
        ((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth-6)}px`;
})
window.addEventListener("resize",e=>{
    cabecera.style.width=`${document.body.offsetWidth}px`
    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`;
    }
    backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`;

    barraDeBusqueda.style.width = `${cabecera.clientWidth - document.getElementById("totalWidthIcon").clientWidth-divPerfilUsuario.clientWidth}px`;
    buttonLupa.style.width =  `${barraDeBusqueda.clientHeight *0.6}px`;  
    buttonLupa.style.left = `${((document.getElementById("totalWidthIcon").clientWidth +escrituraParaBuscar.clientWidth+
        ((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth-6)}px`;
});