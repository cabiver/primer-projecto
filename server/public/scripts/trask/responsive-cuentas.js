'use strict'
const cabecera = document.getElementById('Mains.js-calcular_y_asignar_width_a_la_cabecera_y_detectar_click')
const backgroundHeight = document.getElementById('Mains.js-para_hacer_margin_top')
const buttonLupa = document.getElementById('Main.js-posicionar_la_lupa')
const barraDeBusqueda = document.getElementById('Mains.js-referencia_para_calcular_la_pocision_de_la_lupa-barra_de_busqueda-div_barra_busqueda')
const background = document.getElementById('Mains.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background')
const responsiveIconos = document.querySelectorAll('.Mains.js-arrays_de_iconos_para_volverlos_cuadrados')
const divPerfilUsuario = document.getElementById('Mains.js-div_de_tu_perfil_para_ajustar_barra_de_busqueda')
const escrituraParaBuscar = document.getElementById('Mains.js-variable_de_posicionamiento')
const divRecomiendaciones = document.getElementById('Mains.js cuentas.js-posicionamiento_y_actualizacion_de_peticiones_de_recomendados')
const iconoPagina = document.getElementById('Mains.js cuentas.js-calcular_distancia_y_esperar_click')

window.addEventListener('load', e => {
  cabecera.style.width = `${document.body.offsetWidth}px`
  if (background.naturalWidth < 600) {
    background.style.objectFit = 'contain'
  } else {
    background.style.width = '100%'
  }
  for (let index = 0; index < responsiveIconos.length; index++) {
    responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`
  }
  divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`
  backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`

  barraDeBusqueda.style.width = `${cabecera.clientWidth - iconoPagina.clientWidth - divPerfilUsuario.clientWidth}px`
  buttonLupa.style.width = `${barraDeBusqueda.clientHeight * 0.6}px`
  buttonLupa.style.left = `${((iconoPagina.clientWidth + escrituraParaBuscar.clientWidth +
        ((barraDeBusqueda.clientWidth - escrituraParaBuscar.clientWidth) / 2)) - buttonLupa.clientWidth - 6)}px`
})
window.addEventListener('resize', e => {
  cabecera.style.width = `${document.body.offsetWidth}px`
  for (let index = 0; index < responsiveIconos.length; index++) {
    responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`
  }
  backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`
  divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`
  barraDeBusqueda.style.width = `${cabecera.clientWidth - iconoPagina.clientWidth - divPerfilUsuario.clientWidth}px`
  buttonLupa.style.width = `${barraDeBusqueda.clientHeight * 0.6}px`
  buttonLupa.style.left = `${((iconoPagina.clientWidth + escrituraParaBuscar.clientWidth +
        ((barraDeBusqueda.clientWidth - escrituraParaBuscar.clientWidth) / 2)) - buttonLupa.clientWidth - 6)}px`
})
