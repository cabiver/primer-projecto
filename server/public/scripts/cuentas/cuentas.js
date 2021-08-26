'use strict'
let indiceDeBusqueda = -1

let navegacion = false

const perfil = document.getElementById('cuentas.js-agregar_eventos_que_desplegue_opciones_de_usuarios')
const cerrarSesion = document.getElementById('cerrarSesion')
const barraDeNavegacion = document.getElementById('barra-de-navegacion')
const miSitio = document.getElementById('ir-a-mi-sitio')
const fromBarraDeBusqueda = document.getElementById('responsive_cuentas.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda')

const redirecionarClick = () => {
  const arrayRediret = document.querySelectorAll('.redirectClick')
  arrayRediret.forEach(element => {
    element.addEventListener('click', async e => {
      e.target.classList.add('seleccionado')
      const formdata = new FormData()
      formdata.set('usuarios', e.target.innerText)
      const respuesta = await axios.post('/buscar', formdata)

      if (respuesta.statusText === 'OK') {
        window.location.assign(respuesta.data.pagina)
      } else {
        console.log(respuesta)
      }
    })
  })
}
function repintarbusqueda (e) {
  if (divRecomiendaciones.childNodes.length === 0) {
    return
  }
  divRecomiendaciones.childNodes.forEach(element => {
    element.classList.remove('seleccionado')
  })
  if (e === 'ArrowUp') {
    if (indiceDeBusqueda > 0) {
      indiceDeBusqueda--
    }
  }
  if (e === 'ArrowDown') {
    if (indiceDeBusqueda < divRecomiendaciones.childNodes.length - 1 && indiceDeBusqueda >= -1) {
      indiceDeBusqueda++
    }
  }
  if (indiceDeBusqueda === -1) {
    indiceDeBusqueda = 0
  }
  if (divRecomiendaciones.childNodes[indiceDeBusqueda]) {
    divRecomiendaciones.childNodes[indiceDeBusqueda].setAttribute('class', 'normal redirectClick seleccionado')
  }
}
const convertidorADias = (diaComparador) => {
  if (diaComparador === 'Mon') return 'lunes'
  if (diaComparador === 'Tues') return 'martes'
  if (diaComparador === 'Wed') return 'miercoles'
  if (diaComparador === 'Thu') return 'jueves'
  if (diaComparador === 'Fri') return 'viernes'
  if (diaComparador === 'Sat') return 'sabado'
  if (diaComparador === 'Sun') return 'domingo'
  return diaComparador
}
const convertidorAMes = (mesComparador) => {
  if (mesComparador === 'Jan') return 'march'
  if (mesComparador === 'Mar') return 'marzo'
  if (mesComparador === 'Feb') return 'febrero'
  if (mesComparador === 'Apr') return 'abril'
  if (mesComparador === 'May') return 'Mayo'
  if (mesComparador === 'Jun') return 'Junio'
  if (mesComparador === 'Jul') return 'julio'
  if (mesComparador === 'Aug') return 'Agosto'
  if (mesComparador === 'Sep') return 'septiembre'
  if (mesComparador === 'oct') return 'obtubre'
  if (mesComparador === 'Nov') return 'Noviembre'
  if (mesComparador === 'Dec') return 'Diciembre'
  return mesComparador
}
miSitio.addEventListener('click', async e => {
  e.preventDefault()
  const respuesta = await axios.post('/miSitio')
  if (respuesta.statusText === 'OK') {
    window.location.assign(respuesta.data.pagina)
  } else {
    console.log(respuesta)
  }
})
iconoPagina.addEventListener('click', async (e) => {
  window.location.assign('/')
})
fromBarraDeBusqueda.addEventListener('click', async e => {
  const formdata = new FormData(fromBarraDeBusqueda)
  if (formdata.get('usuarios') === '') {
    const respuesta = await axios.post('/ultimaBusqueda', formdata)
    if (respuesta.statusText === 'OK') {
      while (divRecomiendaciones.firstChild) {
        divRecomiendaciones.removeChild(divRecomiendaciones.firstChild)
      }
      respuesta.data.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('normal', 'redirectClick')
        div.innerHTML = element
        divRecomiendaciones.appendChild(div)
      })
      indiceDeBusqueda = -1
      redirecionarClick()
    } else {
      console.log(respuesta)
    }
  }
})
fromBarraDeBusqueda.addEventListener('keyup', async e => {
  const formdata = new FormData(fromBarraDeBusqueda)
  if ((e.key === 'ArrowUp') || e.key === 'ArrowDown') {
    repintarbusqueda(e.key)
    return
  }
  if (formdata.get('usuarios') !== '') {
    const respuesta = await axios.post('/recomendacion', formdata)
    if (respuesta.statusText === 'OK') {
      while (divRecomiendaciones.firstChild) {
        divRecomiendaciones.removeChild(divRecomiendaciones.firstChild)
      }
      respuesta.data.nombres.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('normal', 'redirectClick')
        div.innerHTML = element
        divRecomiendaciones.appendChild(div)
      })
      indiceDeBusqueda = -1
      redirecionarClick()
    } else {
      console.log(respuesta)
    }
  } else {
    while (divRecomiendaciones.firstChild) {
      divRecomiendaciones.removeChild(divRecomiendaciones.firstChild)
    }
  }
})
fromBarraDeBusqueda.addEventListener('submit', async e => {
  e.preventDefault()
  if (indiceDeBusqueda === -1) {
    const formdata = new FormData(fromBarraDeBusqueda)
    if (formdata.get('usuarios')) {
      const respuesta = await axios.post('/buscar', formdata)
      if (respuesta.statusText === 'OK') {
        window.location.assign(respuesta.data.pagina)
      } else {
        console.log(respuesta)
      }
    }
  } else {
    const nombreSeleccionado = divRecomiendaciones.childNodes[indiceDeBusqueda].textContent
    const formdata = new FormData()
    formdata.set('usuarios', nombreSeleccionado)
    const respuesta = await axios.post('/buscar', formdata)
    if (respuesta.statusText === 'OK') {
      window.location.assign(respuesta.data.pagina)
    }
  }
})
perfil.addEventListener('click', e => {
  if (navegacion) {
    navegacion = false
    barraDeNavegacion.style.display = 'none'
  } else {
    navegacion = true
    barraDeNavegacion.style.display = ''
  }
})
cerrarSesion.addEventListener('click', e => {
  document.cookie = 'userName='
  window.location.assign('/')
})
