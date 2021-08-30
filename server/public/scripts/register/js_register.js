'use strict'
const form = document.getElementById('js_register.js-tener elemento form')
const usuario = document.getElementById('js_register.js-validar_el_nombre_de_usuario')
const contraseña = document.getElementById('see.js code.js responsive_index.js-cambiar_a_visible')
const register = document.getElementById('js_register.js-boton_event_submit')

const check = (error) => {
  if (error[0]) {
    document.getElementById('js_register-informar_usuario_de_la_peticion').innerHTML = error[1]
  } else {
    document.getElementById('js_register-informar_usuario_de_la_peticion').innerHTML = 'request send'
  }
}
const validartodo = (text, cant) => {
  const error = []
  const valido = document.getElementById(text)
  const vuelvaARellenar = validarLimpieza(valido.value)

  if (!vuelvaARellenar) {
    error[0] = true
    error[1] = "quite los simbolos raros al usuario o al password Ejemplo: '#'%'&'/')"
    return error
  }
  if (valido.value.length < cant) {
    error[0] = true
    if (text === 'password') {
      error[1] = 'the password must to have 8 character or more'
    } else {
      error[1] = 'the usuari don´t have more 5 character'
    }
  } else error[0] = false
  return error
}
const validarLimpieza = (textClear) => {
  let valor = true
  for (let i = 0; i < (textClear.length - 1); i++) {
    const letra = textClear[i]
    if (letra === '/')valor = false
    if (letra === '%')valor = false
    if (letra === '!')valor = false
    if (letra === String.fromCharCode(92))valor = false
    if (letra === '$')valor = false
    if (letra === '{')valor = false
    if (letra === '}')valor = false
    if (letra === ':')valor = false
    if (letra === '=')valor = false
  }
  return valor
}

register.addEventListener('click', async (e) => {
  e.preventDefault()
  const Form = new FormData(form)
  if (Form.get('password') !== Form.get('password-again')) {
    return
  }
  let error = validartodo('js_register.js-validar_el_nombre_de_usuario', 5)
  check(error)
  if (!error[0]) {
    error = validartodo('see.js code.js responsive_index.js-cambiar_a_visible', 8)
    check(error)
    if (!error[0]) {
      const respuesta = await axios.post('/register', {
        uss: Form.get('usuario'),
        contra: Form.get('password')
      })
      if (respuesta.statusText === 'OK') {
        document.getElementById('js_register-informar_usuario_de_la_peticion').innerHTML = respuesta.data.mensage
        if (respuesta.data.metodo) {
          document.cookie = 'userName=' + respuesta.data.token
          const urlNombre = respuesta.data.nombre.replaceAll(' ', '%20')
          window.location.assign('/' + urlNombre)
        }
      } else {
        console.log(respuesta)
      }
    }
  }
})
