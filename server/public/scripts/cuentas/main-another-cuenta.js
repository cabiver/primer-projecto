'use strict'
let indiceDeBusqueda = -1
let navegacion = false
let contador = 0

const perfil = document.getElementById('cuentas.js-agregar_eventos_que_desplegue_opciones_de_usuarios')
const cerrarSesion = document.getElementById('cerrarSesion')
const barraDeNavegacion = document.getElementById('barra-de-navegacion')
const miSitio = document.getElementById('ir-a-mi-sitio')
const fromBarraDeBusqueda = document.getElementById('responsive_cuentas.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda')

let canload = true
let limit = false

const load = document.getElementById('cuentas.js-detectar_cuando_es_observado')
const marco = document.getElementById('marco')

const buttonLupa = document.getElementById('responsive_cuentas.js-posicionar_la_lupa')
const barraDeBusqueda = document.getElementById('responsive_cuentas.js-referencia_para_calcular_la_pocision_de_la_lupa-barra_de_busqueda-div_barra_busqueda')
const responsiveIconos = document.querySelectorAll('.responsive_cuentas.js-arrays_de_iconos_para_volverlos_cuadrados')
const divPerfilUsuario = document.getElementById('responsive_cuentas.js-div_de_tu_perfil_para_ajustar_barra_de_busqueda')
const escrituraParaBuscar = document.getElementById('responsive_cuentas.js-variable_de_posicionamiento')
const divRecomiendaciones = document.getElementById('responsive_cuentas.js cuentas.js-posicionamiento_y_actualizacion_de_peticiones_de_recomendados')
const iconoPagina = document.getElementById('responsive_cuentas.js cuentas.js-calcular_distancia_y_esperar_click')
const cabecera = document.getElementById('responsive_cuentas.js-calcular_y_asignar_width_a_la_cabecera_y_detectar_click')

const backgroundHeight = document.getElementById('responsive_cuentas.js-para_hacer_margin_top')
const background = document.getElementById('responsive_cuentas.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background')
const botonDeAmistad = document.getElementById('cuentas.js-agregar_persona_amigo')

window.addEventListener('load', e => {
  for (let index = 0; index < responsiveIconos.length; index++) {
    responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`
  }

  cabecera.style.width = `${document.body.offsetWidth}px`
  divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`
  barraDeBusqueda.style.width = `${cabecera.clientWidth - iconoPagina.clientWidth - divPerfilUsuario.clientWidth}px`
  buttonLupa.style.width = `${barraDeBusqueda.clientHeight * 0.6}px`
  buttonLupa.style.left = `${((iconoPagina.clientWidth + escrituraParaBuscar.clientWidth +
          ((barraDeBusqueda.clientWidth - escrituraParaBuscar.clientWidth) / 2)) - buttonLupa.clientWidth - 6)}px`
  cabecera.style.width = `${document.body.offsetWidth}px`
  if (background.naturalWidth < 600) {
    background.style.objectFit = 'contain'
  } else {
    background.style.width = '100%'
  }
  backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`
})
window.addEventListener('resize', e => {
  for (let index = 0; index < responsiveIconos.length; index++) {
    responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`
  }
  cabecera.style.width = `${document.body.offsetWidth}px`
  divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`
  barraDeBusqueda.style.width = `${cabecera.clientWidth - iconoPagina.clientWidth - divPerfilUsuario.clientWidth}px`
  buttonLupa.style.width = `${barraDeBusqueda.clientHeight * 0.6}px`
  buttonLupa.style.left = `${((iconoPagina.clientWidth + escrituraParaBuscar.clientWidth +
          ((barraDeBusqueda.clientWidth - escrituraParaBuscar.clientWidth) / 2)) - buttonLupa.clientWidth - 6)}px`
  backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`
})

function createImgVideo (element, complement, ast, indice) {
  const descrip = complement.split('█')
  const nars = document.createElement('div')
  const content = document.createElement('div')
  ast.setAttribute('src', element)
  ast.setAttribute('class', ' precentacion')
  const descr = document.createElement('p')
  descr.setAttribute('class', ' fuente')

  const fechaDePosteo = document.createElement('p')
  const fecha = descrip[0].split(' ')
  const dia = fecha[0]
  const mes = fecha[1]
  const diaDelMes = fecha[2]
  const year = fecha[3]

  const fechaText = convertidorADias(dia) + ' ' + convertidorAMes(mes) + ' ' + diaDelMes + ' ' + year
  fechaDePosteo.innerHTML = fechaText
  fechaDePosteo.setAttribute('class', 'fecha-post')
  const contentenFlex = document.createElement('div')
  contentenFlex.setAttribute('class', 'flex-para-contenido')
  contentenFlex.appendChild(fechaDePosteo)
  content.appendChild(contentenFlex)
  descr.innerHTML = descrip[1]
  content.appendChild(nars)
  nars.appendChild(descr)
  nars.appendChild(ast)
  nars.setAttribute('class', 'mar')
  content.setAttribute('class', 'div-para-marco')
  marco.appendChild(content)
}

botonDeAmistad.addEventListener('click', async () => {
  const res = await axios.post(window.location.pathname)
  if (res.statusText === 'OK') {
    if (botonDeAmistad.innerHTML === 'dejar de segir') {
      botonDeAmistad.innerHTML = 'agregar a amigos'
    } else {
      botonDeAmistad.innerHTML = 'dejar de segir'
    }
  }
})
function createMorePhoto () {
  limit = true
  document.getElementById('ventana-acabo-las-fotos').style.display = ''
}

function elementos (p) {
  const op = p.data.content
  if (p !== undefined) {
    op.forEach(element => {
      const extencion = element.postImg.split('.')
      if (extencion[(extencion.length - 1)] === 'mp4' || extencion[(extencion.length - 1)] === 'avi') {
        const ast = document.createElement('video')
        ast.setAttribute('controls', '')
        createImgVideo(element.postImg, element.desc, ast)
      } else {
        if (extencion[(extencion.length - 1)] === 'mp3' || extencion[(extencion.length - 1)] === 'ogg' || extencion[(extencion.length - 1)] === 'wav') {
          const ast = document.createElement('audio')
          ast.setAttribute('controls', '')
          createImgVideo(element.postImg, element, element.desc, ast)
        } else {
          const ast = document.createElement('img')
          createImgVideo(element.postImg, element.desc, ast)
        }
      }
    })
    if (op.length < 3) {
      createMorePhoto()
    }
    contador += 3
    setTimeout(() => {
      canload = true
    }, 2000)
  }
}

const cal = async () => {
  if (!canload || limit) {
    return
  }
  canload = false
  const respuesta = await axios.post('/cuentas' + location.pathname, {
    cont: contador
  })
  console.log(respuesta)
  if (respuesta.statusText === 'OK') {
    if (respuesta.data.length === 0) {
      createMorePhoto()
      return
    }
    elementos(respuesta)
  } else {
    console.log(respuesta)
  }
}

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

const observer = new IntersectionObserver(cal)
observer.observe(load)
