'use strict'
let varchangeIcon = false
let canChangeBackground = true
let imagenDeBackground = false
let file

const changeIcon = document.getElementById('usuario_controller.js-formulario_para_cambiar_icono')
const form = document.getElementById('usuario_controller.js-formulario_subir_post')
const loadImg = document.getElementById('usuario_controller.js-div_renderisa_pre_prost')
const img = document.getElementById('imag')
const divBorderCamaraIcono = document.getElementById('divBorderCamaraIcono')
const closeChangeBackground = document.getElementById('closeChangeBackground')
const gridChangeBackground = document.getElementById('gridChangeBackground')
const fromChangeBackground = document.getElementById('fromChangeBackground')
const inputPost = document.getElementById('imgFile')
const respuestaBackground = document.getElementById('respuestaBackground')
const renderIcono = document.getElementById('renderIcono')
const renderBackground = document.getElementById('renderBackground')

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
  if (particiones[particiones.length - 1] == 'jpg' || particiones[particiones.length - 1] == 'png' || particiones[particiones.length - 1] == 'jpeg') {
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
