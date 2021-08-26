let canload = true
let limit = false
let amigosVisitados = []
const infoVisitados = {}
let intentos = 0
const load = document.getElementById('cuentas.js-detectar_cuando_es_observado')
const marco = document.getElementById('marco')

function createImgVideo (element, ast) {
  const descrip = element.post.desc.split('█')
  const nars = document.createElement('div')
  const content = document.createElement('div')
  ast.setAttribute('src', element.post.postImg)
  ast.setAttribute('class', ' precentacion')
  const descr = document.createElement('p')
  descr.setAttribute('class', ' fuente')

  const conteinerUser = document.createElement('div')
  conteinerUser.setAttribute('class', ' nombre-usuario')
  conteinerUser.innerHTML = element.nombre
  const conteinerFechaUser = document.createElement('div')
  conteinerFechaUser.setAttribute('class', ' users-flex')

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

  const iconoImagen = document.createElement('img')
  iconoImagen.setAttribute('src', element.icon)
  iconoImagen.setAttribute('class', ' icono-post')
  conteinerUser.appendChild(iconoImagen)
  conteinerFechaUser.appendChild(conteinerUser)
  conteinerFechaUser.appendChild(fechaDePosteo)

  contentenFlex.appendChild(conteinerFechaUser)
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
  document.getElementById('ventana-acabo-las-fotos').style.display = ''
}

function elementos (p) {
  const op = p.data.amigos
  if (p !== undefined) {
    op.forEach((element) => {
      if (!element.post) {
        return
      }
      const extencion = element.post.postImg.split('.')
      if (extencion[(extencion.length - 1)] === 'mp4' || extencion[(extencion.length - 1)] === 'avi') {
        const ast = document.createElement('video')
        ast.setAttribute('controls', '')
        createImgVideo(element, ast)
      } else {
        if (extencion[(extencion.length - 1)] === 'mp3' || extencion[(extencion.length - 1)] === 'ogg' || extencion[(extencion.length - 1)] === 'wav') {
          const ast = document.createElement('audio')
          ast.setAttribute('controls', '')
          createImgVideo(element, ast)
        } else {
          const ast = document.createElement('img')
          createImgVideo(element, ast)
        }
      }
    })
    actualizarDelete()
    setTimeout(() => {
      canload = true
    }, 1500)
  }
}

const cal = async () => {
  if (limit) {
    return
  }
  if (!canload) {
    return
  }
  canload = false
  const respuesta = await axios.post('/UltimosPost', {
    amigosVisitados,
    infoVisitados
  })
  amigosVisitados = respuesta.data.arrayAmigos

  if (respuesta.statusText === 'OK') {
    if (respuesta.data.amigos.length === 0) {
      intentos++
      if (intentos > 10) {
        createMorePhoto()
        return
      }
    }
    elementos(respuesta)
  } else {
    console.log(respuesta)
  }
}

const observer = new IntersectionObserver(cal)
observer.observe(load)
