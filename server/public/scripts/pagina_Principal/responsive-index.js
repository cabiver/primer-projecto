"use strict";
const all = document.getElementById("responsive_index.js-contenedor_de_todo_y_comparador_para_operaciones");
const fix = document.getElementById("responsive_index.js-la_cabecera_para_ajustarla");
const background = document.getElementById("responsive-index.js-detectar_cuando_carge_y_posicionar_objetos");
const botonSesion = document.getElementById("responsive_indexjs,code.js-posicionar_y_agregar_eventos");
const divSesion = document.getElementById("responsive_index.js-ajustar_width_de_la_cabecera");
const sesion = document.getElementById("responsive_index.js,code.js-pocisionamineto_y_eventos_con_la_ventana");

background.addEventListener("loadeddata",e=>{
    fix.style.width =`${all.clientWidth}px`;
})
window.addEventListener("load",e=>{
    botonSesion.style.marginRight =`${((document.body.offsetWidth - background.clientWidth) /2)+3}px`;
    divSesion.style.right = `${((document.body.offsetWidth- background.clientWidth ) /2)}px`;
    sesion.style.right = `${((document.body.offsetWidth - background.clientWidth ) /2)}px`;
})
window.addEventListener("resize",e=>{
    fix.style.width =`${all.clientWidth }px`;
    botonSesion.style.marginRight =`${((document.body.offsetWidth - background.clientWidth) /2)+3}px`;
    divSesion.style.right = `${((document.body.offsetWidth- background.clientWidth ) /2)}px`;
    sesion.style.right = `${((document.body.offsetWidth - background.clientWidth ) /2)}px`;
})