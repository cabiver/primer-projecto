'use strict'

let create = false
const contra = document.getElementById('see.js code.js responsive_index.js-cambiar_a_visible')
const send = document.getElementById('code.js-boton_event_submit')
const usuariName = document.getElementById('code.js-captar_datos_nombre_de_usuario')
const resultado = document.getElementById('code.js-informar_usuario_de_la_peticion')
const botonSesion = document.getElementById('code.js-posicionar_y_agregar_eventos')
const sesion = document.getElementById('code.js-pocisionamineto_y_eventos_con_la_ventana')

botonSesion.addEventListener('touchstart', (e) => {
  sesion.classList.remove('hidden')
  sesion.classList.add('formulario')
})
botonSesion.addEventListener('touchleave', (e) => {
  sesion.classList.remove('hidden')
  sesion.classList.add('formulario')
})
botonSesion.addEventListener('click', (e) => {
  if (create) {
    create = false
    sesion.classList.remove('formulario')
    sesion.classList.add('hidden')
  } else {
    sesion.classList.remove('hidden')
    sesion.classList.add('formulario')
    create = true
  }
})
send.addEventListener('click', async (e) => {
  e.preventDefault()
  resultado.innerHTML = 'cargando'

  const respuesta = await axios.post('/', {
    uss: usuariName.value,
    contra: contra.value
  })
  if (respuesta.statusText === 'OK') {
    const autorizar = respuesta.data.metodo
    const mensaje = respuesta.data.mensaje
    const token = respuesta.data.token
    if (autorizar) {
      document.cookie = 'userName=' + token
      window.location.assign('/')
    } else {
      resultado.innerHTML = mensaje
    }
  } else {
    resultado.innerHTML = 'contraseña o usuario incorrecto'
  }
})
const background = document.getElementById('code.js-detectar_cuando_carge_y_posicionar_objetos')
const divSesion = document.getElementById('code.js-ajustar_width_de_la_cabecera')

window.addEventListener('load', e => {
  botonSesion.style.marginRight = `${((document.body.offsetWidth - background.clientWidth) / 2) + 3}px`
  divSesion.style.right = `${((document.body.offsetWidth - background.clientWidth) / 2)}px`
  sesion.style.right = `${((document.body.offsetWidth - background.clientWidth) / 2)}px`
})
window.addEventListener('resize', e => {
  botonSesion.style.marginRight = `${((document.body.offsetWidth - background.clientWidth) / 2) + 3}px`
  divSesion.style.right = `${((document.body.offsetWidth - background.clientWidth) / 2)}px`
  sesion.style.right = `${((document.body.offsetWidth - background.clientWidth) / 2)}px`
})
