let canload = true
let limit = false
let contador = 0

const load = document.getElementById('cuentas.js-detectar_cuando_es_observado')
const marco = document.getElementById('marco')
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

const observer = new IntersectionObserver(cal)
observer.observe(load)
