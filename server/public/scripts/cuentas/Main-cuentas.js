'use strict'
let indiceDeBusqueda = -1
let canDelete = true
let navegacion = false
let contador = 0
let varchangeIcon = false
let canChangeBackground = true
let imagenDeBackground = false
let file

let canload = true
let limit = false

const changeIcon = document.getElementById('main-cuentas.js-formulario_para_cambiar_icono')
const form = document.getElementById('main-cuentas.js-formulario_subir_post')
const loadImg = document.getElementById('main-cuentas.js-div_renderisa_pre_prost')
const img = document.getElementById('main-cuentas.js-imagen_para_renderiar')
const closeChangeBackground = document.getElementById('main-cuentas.js-detectar-click')
const gridChangeBackground = document.getElementById('main-cuentas.js-detectar-click-para-cambiar-background')
const fromChangeBackground = document.getElementById('main-cuentas.js-form-del-background')
const inputPost = document.getElementById('main-cuentas.js-detectar-cambio-de-imagen')
const respuestaBackground = document.getElementById('main-cuentas.js-respuesta-de-la-peticion')
const renderIcono = document.getElementById('main-cuentas-js-renderizar-icono')
const renderBackground = document.getElementById('main-cuentas.js-renderizar-background')

const perfil = document.getElementById('Mains.js-agregar_eventos_que_desplegue_opciones_de_usuarios')
const cerrarSesion = document.getElementById('Mains.js-detectar-click-eliminar-cookies')
const barraDeNavegacion = document.getElementById('Mains.js-pesplegar-opciones-de-sesion')
const miSitio = document.getElementById('Mains.js-detectar-click-ir-a-tu-sitio-web')
const fromBarraDeBusqueda = document.getElementById('Mains.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda')

const load = document.getElementById('Mains.js-detectar-cuando-es-observado')
const marco = document.getElementById('Mains.js-div-donde-colocaras-los-post')

const buttonLupa = document.getElementById('Main.js-posicionar_la_lupa')
const barraDeBusqueda = document.getElementById('Mains.js-referencia_para_calcular_la_pocision_de_la_lupa-barra_de_busqueda-div_barra_busqueda')
const responsiveIconos = document.querySelectorAll('.MainsJS-arrays_de_iconos_para_volverlos_cuadrados')
const divPerfilUsuario = document.getElementById('Mains.js-div_de_tu_perfil_para_ajustar_barra_de_busqueda')
const escrituraParaBuscar = document.getElementById('Mains.js-variable_de_posicionamiento')
const divRecomiendaciones = document.getElementById('Mains.js cuentas.js-posicionamiento_y_actualizacion_de_peticiones_de_recomendados')
const iconoPagina = document.getElementById('Mains.js-calcular_distancia_y_esperar_click')
const cabecera = document.getElementById('Mains.js-calcular_y_asignar_width_a_la_cabecera_y_detectar_click')

const containerCamara = document.getElementById('Main-cuentas.js-para_posicionar_la_camara_del_background')
const divBorderCamara = document.getElementById('Main-cuentas.js-comparador_de_tamaño_para_posicionarlo')
const imageIcono = document.getElementById('Main-cuentas.js-operador_para_posicionar_la_camara-icono')
const divBorderCamaraIcono = document.getElementById('Main-cuentas.js-dezplegar-form-cambiar-icono')

const backgroundHeight = document.getElementById('Mains.js-para_hacer_margin_top')
const background = document.getElementById('Mains.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background')

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

  divBorderCamaraIcono.style.left = `${(imageIcono.clientWidth - (divBorderCamaraIcono.clientWidth / 3))}px`
  containerCamara.style.top = `${(backgroundHeight.clientHeight + cabecera.clientHeight - divBorderCamara.clientHeight - 62)}px`
  containerCamara.style.right = `${(((document.body.offsetWidth - background.clientWidth) / 2) + 12)}px`
})
window.addEventListener('resize', e => {
  cabecera.style.width = `${document.body.offsetWidth}px`
  for (let index = 0; index < responsiveIconos.length; index++) {
    responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`
  }
  divRecomiendaciones.style.width = `${escrituraParaBuscar.clientWidth}px`
  barraDeBusqueda.style.width = `${cabecera.clientWidth - iconoPagina.clientWidth - divPerfilUsuario.clientWidth}px`
  buttonLupa.style.width = `${barraDeBusqueda.clientHeight * 0.6}px`
  buttonLupa.style.left = `${((iconoPagina.clientWidth + escrituraParaBuscar.clientWidth +
          ((barraDeBusqueda.clientWidth - escrituraParaBuscar.clientWidth) / 2)) - buttonLupa.clientWidth - 6)}px`

  cabecera.style.width = `${document.body.offsetWidth}px`
  for (let index = 0; index < responsiveIconos.length; index++) {
    responsiveIconos[index].style.width = `${responsiveIconos[index].clientHeight}px`
  }
  backgroundHeight.style.marginTop = `${cabecera.clientHeight}px`

  divBorderCamaraIcono.style.left = `${(imageIcono.clientWidth - (divBorderCamaraIcono.clientWidth / 3))}px`
  containerCamara.style.top = `${(backgroundHeight.clientHeight + cabecera.clientHeight - divBorderCamara.clientHeight - 62)}px`
  containerCamara.style.right = `${(((document.body.offsetWidth - background.clientWidth) / 2) + 12)}px`
})

function ocultarMostrar () {
  if (!varchangeIcon) {
    changeIcon.style.display = 'block'
    varchangeIcon = true
  } else {
    changeIcon.style.display = 'none'
    varchangeIcon = false
  }
}
const changecolorAdd = (obj, clase) => {
  obj.classList.add(`${clase}`)
}
const changecolorSubtract = (obj, clase) => {
  obj.classList.remove(`${clase}`)
}
const render = (imageToRender) => {
  if (!imageToRender) {
    loadImg.innerHTML = 'la igamen que ingreso es invalida'
    return
  }
  file = imageToRender
  renderImage()
}
const renderImage = () => {
  const barraDeCarga = document.getElementById('barra-de-carga')
  const extencion = file.name.split('.')
  const renderPc = document.getElementById('loadVideo')
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  if (extencion[(extencion.length - 1)] === 'mp4' || extencion[(extencion.length - 1)] === 'mkv') {
    document.getElementById('loadVideo').style.height = 'fit-content'
    document.getElementById('loadVideoMobile').style.height = 'fit-content'
    img.setAttribute('src', '')
    document.getElementById('imagMobile').setAttribute('src', '')

    img.setAttribute('src', '')
    reader.addEventListener('progress', e => {
      const carga = Math.round(e.loaded / file.size * 100)
      barraDeCarga.style.width = `${carga}%`
      barraDeCarga.style.backgroundColor = '#40da'
    })
    reader.addEventListener('load', e => {
      const videofinalizado = new Blob([new Uint8Array(e.currentTarget.result)], { type: 'video/mp4' })
      const url = URL.createObjectURL(videofinalizado)
      barraDeCarga.style.backgroundColor = 'transparent'
      renderPc.style.width = '100%'
      renderPc.setAttribute('src', url)
      document.getElementById('loadVideoMobile').setAttribute('src', url)
    })
  } else {
    renderPc.setAttribute('src', '')
    reader.addEventListener('progress', e => {
      const carga = Math.round(e.loaded / file.size * 100)
      barraDeCarga.style.width = `${carga}%`
      barraDeCarga.style.backgroundColor = '#40da'
    })
    reader.addEventListener('load', e => {
      barraDeCarga.style.backgroundColor = 'transparent'
    })
    document.getElementById('loadVideoMobile').setAttribute('src', '')
    renderPc.style.height = '0'
    renderPc.style.width = '0'
    document.getElementById('loadVideoMobile').style.height = '0'
    const image = URL.createObjectURL(file)
    img.setAttribute('src', image)
    document.getElementById('imagMobile').setAttribute('src', image)
  }
}
function validar () {
  let validar = true
  const formdata = new FormData(form)
  if (!file) {
    file = formdata.get('image')
  }
  const text = formdata.get('description')
  if (file.size === 0) {
    validar = false
    return validar
  }
  if (text.length >= 150) {
    validar = false
    return validar
  }
  if (text === '') {
    validar = true
  }
  return validar
}
divBorderCamaraIcono.addEventListener('click', e => {
  ocultarMostrar()
})
imageIcono.addEventListener('click', e => {
  ocultarMostrar()
})
inputPost.addEventListener('change', e => {
  const formdata = new FormData(form)
  file = formdata.get('image')
  renderImage()
})
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && imagenDeBackground) {
    cabecera.style.display = ''
    gridChangeBackground.style.display = 'none'
  }
})
closeChangeBackground.addEventListener('click', e => {
  imagenDeBackground = false
  cabecera.style.display = ''
  gridChangeBackground.style.display = 'none'
})
fromChangeBackground.addEventListener('submit', async e => {
  e.preventDefault()
  if (canChangeBackground) {
    canChangeBackground = false
    const formdata = new FormData(fromChangeBackground)
    cabecera.style.display = ''
    gridChangeBackground.style.display = 'none'
    respuestaBackground.innerHTML = 'cargando peticion'
    const respuesta = await axios.post('/background' + location.pathname, formdata)
    if (respuesta.statusText === 'OK') {
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } else {
      respuestaBackground.innerHTML = 'ah ocurriodo un error'
    }
  }
})
fromChangeBackground.addEventListener('change', e => {
  const formdata = new FormData(fromChangeBackground)
  const image = URL.createObjectURL(formdata.get('image'))
  renderBackground.setAttribute('src', image)
})
divBorderCamara.addEventListener('click', e => {
  imagenDeBackground = true
  cabecera.style.display = 'none'
  gridChangeBackground.style.height = window.innerHeight + 'px'
  gridChangeBackground.style.display = ''
})
loadImg.addEventListener('dragover', (e) => {
  e.preventDefault()
  changecolorAdd(e.target, 'objetoEncima')
})
loadImg.addEventListener('dragleave', (e) => {
  changecolorSubtract(e.target, 'objetoEncima')
})
loadImg.addEventListener('drop', (e) => {
  e.preventDefault()
  render(e.dataTransfer.files[0])
  changecolorSubtract(e.target, 'objetoEncima')
})
changeIcon.addEventListener('change', e => {
  const formdata = new FormData(changeIcon)
  const image = URL.createObjectURL(formdata.get('image'))
  renderIcono.setAttribute('src', image)
})
changeIcon.addEventListener('submit', async e => {
  e.preventDefault()
  const formdata = new FormData(changeIcon)
  const imagen = formdata.get('image')
  const particiones = imagen.name.split('.')
  if (particiones[particiones.length - 1] === 'jpg' || particiones[particiones.length - 1] === 'png' || particiones[particiones.length - 1] === 'jpeg') {
    const respuesta = await axios.post('/perfilIcon' + location.pathname, formdata)
    if (respuesta.statusText === 'OK') {
      window.location.reload()
    } else {
      document.getElementById('resultIcono').innerHTML = 'verifique que alla mandado un archivo'
    }
  } else {
    document.getElementById('resultIcono').innerHTML = 'no es un archivo de imagen valido'
  }
})
form.addEventListener('submit', async e => {
  e.preventDefault()
  if (validar()) {
    const formdata = new FormData(form)
    formdata.delete('image')
    formdata.append('image', file)
    const respuesta = await axios.post('/imagenes' + location.pathname, formdata)
    if (respuesta.statusText === 'OK') {
      window.location.reload()
    } else {
      console.log(respuesta)
    }
  }
})

function createX (element) {
  const divDelete = document.createElement('img')
  divDelete.setAttribute('class', 'deleteX deleteListener')
  divDelete.setAttribute('referen', element)
  divDelete.setAttribute('src', 'images/Transparent_X.png')
  return divDelete
}

function actualizarDelete () {
  const arrayAllDelete = document.querySelectorAll('.deleteListener')
  for (let index = 0; index < arrayAllDelete.length; index++) {
    arrayAllDelete[index].addEventListener('click', async e => {
      if (canDelete) {
        canDelete = false
        const formdata = new FormData()
        formdata.set('parametros', e.target.attributes.referen.nodeValue)

        const element = await axios.post('/deleteimagen' + location.pathname, formdata)
        console.log(element)
        if (element.statusText === 'OK') {
          window.location.reload()
        } else {
          console.log('ocurrio un fallo al eliminar')
        }
      }
    })
  }
}
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
  const complemento = document.createElement('div')
  complemento.setAttribute('class', 'flexGrow')
  const divDelete = createX(element)
  contentenFlex.appendChild(fechaDePosteo)
  contentenFlex.appendChild(complemento)
  contentenFlex.appendChild(divDelete)
  content.appendChild(contentenFlex)
  descr.innerHTML = descrip[1]
  content.appendChild(nars)
  nars.appendChild(descr)
  nars.appendChild(ast)
  nars.setAttribute('class', 'mar')
  content.setAttribute('class', 'div-para-marco')
  marco.appendChild(content)
}

function createMorePhoto () {
  limit = true
  document.getElementById('mains.js-limite-fotos').style.display = ''
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
    actualizarDelete()
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
