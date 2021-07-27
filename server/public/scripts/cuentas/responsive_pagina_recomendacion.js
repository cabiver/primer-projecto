"use strict";
const cabecera = document.getElementById("responsive_cuentas.js-calcular_y_asignar_width_a_la_cabecera");
const backgroundHeight = document.getElementById("responsive_cuentas.js-para_hacer_margin_top");
const buttonLupa=document.getElementById("responsive_cuentas.js-posicionar_la_lupa");
const barraDeBusqueda =document.getElementById("responsive_cuentas.js-referencia_para_calcular_la_pocision_de_la_lupa-barra_de_busqueda-div_barra_busqueda");
const fromBarraDeBusqueda= document.getElementById("responsive_cuentas.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda")
const responsiveIconos=document.querySelectorAll(".responsive_cuentas.js-arrays_de_iconos_para_volverlos_cuadrados");
const divPerfilUsuario = document.getElementById("responsive_cuentas.js-div_de_tu_perfil_para_ajustar_barra_de_busqueda");
const escrituraParaBuscar = document.getElementById("responsive_cuentas.js-variable_de_posicionamiento");
const divRecomiendaciones = document.getElementById("responsive_cuentas.js cuentas.js-posicionamiento_y_actualizacion_de_peticiones_de_recomendados");
const marginSeparadorHeader = document.getElementById("responsive_pagina_recomendacion.js-separador_para_el_header")

window.addEventListener("load",e=>{
    cabecera.style.width=`${document.body.offsetWidth}px`

    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`;
    }
    marginSeparadorHeader.style.marginTop = `${cabecera.clientHeight}px`
    divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`;
    barraDeBusqueda.style.width = `${cabecera.clientWidth - document.getElementById("totalWidthIcon").clientWidth -divPerfilUsuario.clientWidth}px`;
    buttonLupa.style.width =  `${barraDeBusqueda.clientHeight *0.6}px`;  
    buttonLupa.style.left = `${((document.getElementById("totalWidthIcon").clientWidth +escrituraParaBuscar.clientWidth+
        ((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth-6)}px`;
})
window.addEventListener("resize",e=>{
    cabecera.style.width=`${document.body.offsetWidth}px`
    marginSeparadorHeader.style.marginTop = `${cabecera.clientHeight}px`
    for (let index = 0; index < responsiveIconos.length; index++) {
        responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`;
    }
    divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`;
    barraDeBusqueda.style.width = `${cabecera.clientWidth - document.getElementById("totalWidthIcon").clientWidth-divPerfilUsuario.clientWidth}px`;
    buttonLupa.style.width =  `${barraDeBusqueda.clientHeight *0.6}px`;  
    buttonLupa.style.left = `${((document.getElementById("totalWidthIcon").clientWidth +escrituraParaBuscar.clientWidth+
        ((barraDeBusqueda.clientWidth-escrituraParaBuscar.clientWidth)/2 ))-buttonLupa.clientWidth-6)}px`;
});