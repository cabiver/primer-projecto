'use strict'
const containerCamara = document.getElementById('Main-cuentas.js-para_posicionar_la_camara_del_background')
const divBorderCamara = document.getElementById('Main-cuentas.js-comparador_de_tamaño_para_posicionarlo')
const imageIcono = document.getElementById('Main-cuentas.js-operador_para_posicionar_la_camara-icono')

window.addEventListener('load', e => {
  divBorderCamaraIcono.style.left = `${(imageIcono.clientWidth - (divBorderCamaraIcono.clientWidth / 3))}px`
  containerCamara.style.top = `${(backgroundHeight.clientHeight + cabecera.clientHeight - divBorderCamara.clientHeight - 62)}px`
  containerCamara.style.right = `${(((document.body.offsetWidth - background.clientWidth) / 2) + 12)}px`
})

window.addEventListener('resize', e => {
  divBorderCamaraIcono.style.left = `${(imageIcono.clientWidth - (divBorderCamaraIcono.clientWidth / 3))}px`
  containerCamara.style.top = `${(backgroundHeight.clientHeight + cabecera.clientHeight - divBorderCamara.clientHeight - 62)}px`
  containerCamara.style.right = `${(((document.body.offsetWidth - background.clientWidth) / 2) + 12)}px`
})
