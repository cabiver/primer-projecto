const path = require('path')
const Router = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const cookieNPM = require('cookie')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const bcrypt = require('bcrypt')
const youKnow = 'iLovePlayMinecraftForEver'
const pages = path.join(__dirname, '/../public/')
const baseHash = 10
const ModelUser = require('../usariname.js')
ffmpeg.setFfmpegPath(ffmpegPath)

function verificacion (cookie) {
  const jsoncookie = cookieNPM.parse(cookie)
  if (!jsoncookie.userName || jsoncookie.userName === 'undefined' || jsoncookie.userName.length === 0) {
    return { metodo: false }
  }
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow)
  if (!decodedToken.id) {
    return { metodo: false }
  } else {
    return { metodo: true, decodedToken }
  }
}
Router.get('/', (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.render(path.join(pages, 'html/pagina_principal/index.html'))
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.render(path.join(pages, 'html/pagina_principal/index.html'))
    return
  }
  res.render(path.join(pages, 'html/cuentas/sujeridos.ejs'), {
    name: objetoVerificacion.decodedToken.usuariname,
    icon: objetoVerificacion.decodedToken.icon
  })
})
Router.get('/register', (req, res) => res.render(path.join(pages, 'html/register/registro.html')))
Router.get('/:id', async (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const nombreUrl = req.params.id.replaceAll('%20', ' ')
  const user = await ModelUser.findOne({ usuari: nombreUrl })

  if (!user) {
    res.render(pages + 'html/servis/error.html')
  } else {
    const objetoVerificacion = verificacion(cookie)
    if (!objetoVerificacion.metodo) {
      res.status(401).render('html/servis/401NoAutorizacion.html')
      return
    }
    const decodedToken = objetoVerificacion.decodedToken
    const arrayBackground = user.background.split('.')
    let extencion = arrayBackground[arrayBackground.length - 1]

    extencion === 'mp4' || extencion === 'avi'
      ? extencion = `<video id="responsive_cuentas.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background" class="background-content-responsive-video" src="${user.background}" controls></video>`
      : extencion = `<img id="responsive_cuentas.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background" class="background-content-responsive-imagen" src="${user.background}" alt="">`

    const difbackground = `<img class="imageDifumida" src="${user.backgroundDifumidado}" alt="">`

    const userToken = await ModelUser.findOne({ _id: decodedToken.id })
    let amigo = false
    userToken.amigos.forEach(el => {
      if (el === `${user._id}`) {
        amigo = true
      }
    })
    if (`${user._id}` === `${decodedToken.id}`) {
      res.render(pages + 'html/cuentas/cuentas.ejs', {
        extencion: extencion,
        user: userToken.usuari,
        name: user.usuari,
        backgroundDifuminado: difbackground,
        icon: user.icon,
        perfil: userToken.icon
      })
    } else {
      res.render(pages + 'html/cuentas/anotherCuenta.ejs', {
        extencion: extencion,
        user: user.usuari,
        name: userToken.usuari,
        backgroundDifuminado: difbackground,
        icon: userToken.icon,
        perfil: user.icon,
        amigo
      })
    }
  }
})
Router.post('/', async (req, res) => {
  const op = req.body
  if (!op.uss || !op.contra) {
    res.status(400).json({ mensaje: 'porque modificas mi codigo' })
    return
  }
  const primer = new ModelUser({
    usuari: op.uss,
    password: op.contra
  })
  const user = await ModelUser.findOne({ usuari: primer.usuari })
  if (user) {
    if (await bcrypt.compare(primer.password, user.password)) {
      const token = jwt.sign({
        id: user._id,
        usuariname: user.usuari,
        icon: user.icon
      }, youKnow)
      res.json({ metodo: true, token: token })
      return
    }
  }
  res.status(203).json({ metodo: false, mensaje: 'su contraseña o usuario esta mal' })
})
Router.post('/ultimaBusqueda', async (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + '/html/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }

  const user = await ModelUser.findOne({ _id: objetoVerificacion.decodedToken.id })
  res.send(JSON.stringify(user.ultimasBusquedas))
  res.end()
})
Router.post('/register', async (req, res) => {
  const op = req.body
  if (!op.uss || !op.contra) {
    res.status(400).send('que haces cambiando mi codigo?')
    return
  }
  const user = await ModelUser.findOne({ usuari: op.uss })
  if (user) {
    res.send({ metodo: false, mensage: 'Este usuario ya existe' })
  }
  const salt = bcrypt.genSaltSync(baseHash)
  const passHash = bcrypt.hashSync(op.contra, salt)
  const primer = new ModelUser({
    usuari: op.uss,
    password: passHash
  })
  const userNew = await primer.save()
  const token = await jwt.sign({ id: userNew._id, usuariname: userNew.usuari, icon: userNew.icon }, youKnow)
  res.send({
    metodo: true,
    mensage: 'se ha guardado su usuario',
    nombre: userNew.usuari,
    token: token
  })
})
Router.post('/cuentas/:id', async (req, res) => {
  const op = req.body
  const user = await ModelUser.findOne({ usuari: req.params.id })
  if (!user || req.params.id === '') {
    return res.status(404).send(pages + '/html/error.html')
  }
  const arrayPost = user.post.slice(op.cont, op.cont + 3)
  if (arrayPost == null) {
    res.send(JSON.stringify({ post: null }))
    return
  }
  const primer = {
    content: arrayPost
  }
  res.send(JSON.stringify(primer))
  res.end()
})
Router.post('/imagenes/:id', async (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + '/html/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).send('No files were uploaded.' + req.file)
    return
  }
  const imagen = req.files.image
  const user = await ModelUser.findOne({ usuari: req.params.id })
  if (user._id !== objetoVerificacion.decodedToken.id) {
    res.status(400).json({ mesage: 'usted no tiene permitido cambiar ni agregar nada a esta cuenta' })
    return
  }
  if (!user) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const desc = Date() + '█ ' + req.body.description
  const nombreimagen = uuidv4() + imagen.name
  const postImg = 'temp/' + nombreimagen
  imagen.name = nombreimagen
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402)
    }
  })
  await ModelUser.updateOne({ usuari: user.usuari }, { $push: { post: { $each: [{ postImg, desc }], $position: 0 } } })
  res.status(200).send('all great')
})
Router.post('/perfilIcon/:id', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({ mensage: 'No files were uploaded.' })
    return
  }
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const user = await ModelUser.findOne({ usuari: req.params.id })
  if (!user || user._id !== objetoVerificacion.decodedToken.id) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const jsoncookie = cookieNPM.parse(cookie)
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow)
  if (user._id !== decodedToken.id) {
    res.status(400).json({ mesage: 'usted no tiene permitido cambiar ni agregar nada a esta cuenta' })
    return
  }
  const imagen = req.files.image
  let nombreimagen = uuidv4() + imagen.name
  nombreimagen = nombreimagen.replace('"', '')
  const postImg = 'iconos/' + nombreimagen
  imagen.name = nombreimagen
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402)
    }
  })
  await ModelUser.updateOne({ usuari: user.usuari }, { icon: '/' + postImg })
  res.status(200).send('all great')
})
Router.post('/background/:id', async (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({ mensage: 'No files were uploaded.' })
    return
  }
  const user = await ModelUser.findOne({ usuari: req.params.id })
  if (!user) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  if (user._id !== objetoVerificacion.decodedToken.id) {
    res.status(400).json({ mesage: 'usted no tiene permitido cambiar ni agregar nada a esta cuenta' })
    return
  }
  const imagen = req.files.image
  let nombreimagen = uuidv4() + imagen.name
  nombreimagen = nombreimagen.replace('"', '')
  const postImg = 'backgrounds/' + nombreimagen
  const arrayBackground = nombreimagen.split('.')
  let nombreSinExtencion = ''
  if (arrayBackground.length.length > 2) {
    for (let index = 0; index < arrayBackground.length - 2; index++) {
      nombreSinExtencion += arrayBackground.length[index]
    }
  } else {
    nombreSinExtencion = arrayBackground[0]
  }
  const extencion = arrayBackground[arrayBackground.length - 1]
  imagen.name = nombreimagen
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402)
    }
  })
  const difuminado = `backgroundDifuminado/${nombreSinExtencion}.jpg`
  if (extencion === 'mp4' || extencion === 'avi') {
    ffmpeg({ source: path.join(pages, postImg) })
      .takeScreenshots({ filename: `${nombreSinExtencion}.jpg`, timemarks: [0] }, pages + '/backgroundDifuminado')
    await ModelUser.updateOne({ usuari: user.usuari }, { background: '/' + postImg })
    await ModelUser.updateOne({ usuari: user.usuari }, { backgroundDifumidado: '/' + difuminado })
  } else {
    await ModelUser.updateOne({ usuari: user.usuari }, { background: '/' + postImg })
    await ModelUser.updateOne({ usuari: user.usuari }, { backgroundDifumidado: '/' + postImg })
  }
  res.status(200).send('all great')
})
Router.post('/buscar', async (req, res) => {
  const op = req.body
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  if (!op.usuarios) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }

  const userPerfil = await ModelUser.findOne({ usuari: op.usuarios })
  if (!userPerfil) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const user = await ModelUser.findOne({ _id: objetoVerificacion.decodedToken.id })

  if (user.usuari === op.usuarios) {
    res.json({ pagina: '/' + user.usuari })
    return
  }
  const maxUltimosBuscados = 5
  let arrayConservador = []
  user.ultimasBusquedas.forEach((elemet, indice) => {
    if (elemet !== op.usuarios) {
      if (indice < maxUltimosBuscados) {
        arrayConservador = [...arrayConservador, elemet]
      }
    }
  })

  await ModelUser.updateMany({ _id: objetoVerificacion.decodedToken.id }, {
    ultimasBusquedas: [op.usuarios, ...arrayConservador]
  })

  res.json({ pagina: '/' + userPerfil.usuari })
})
Router.post('/miSitio', async (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const user = await ModelUser.findOne({ _id: objetoVerificacion.decodedToken.id })
  if (!user) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  res.json({ pagina: '/' + user.usuari })
})
Router.post('/deleteimagen/:id', async (req, res) => {
  const op = req.body
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const user = await ModelUser.findOne({ usuari: req.params.id })
  if (!user || user._id !== objetoVerificacion.decodedToken.id) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }

  fs.unlinkSync(path.join(pages, op.parametros))
  await ModelUser.updateMany({ usuari: user.usuari }, { $pull: { post: { postImg: op.parametros } } })
  res.status(200).send('all great')
})
Router.post('/recomendacion', async (req, res) => {
  const op = req.body
  const users = await ModelUser.find({ usuari: { $regex: `${op.usuarios}` } }, { usuari: 1, _id: 0 }).limit(4)
  const arrayUsers = []
  users.forEach(element => {
    arrayUsers.push(element.usuari)
  })
  res.status(200).json({ nombres: arrayUsers })
})
Router.post('/UltimosPost', async (req, res) => {
  const op = req.body
  const cookie = req.headers.cookie
  if (!cookie) {
    res.status(401).render(pages + 'html/servis/401NoAutorizacion.html')
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  const user = await ModelUser.findOne({ _id: objetoVerificacion.decodedToken.id })
  if (!user) {
    res.status(404).send('no se ah encontrado el usuario')
    return
  }
  if (!op.amigosVisitados) {
    res.status(404).send('deja de meterte con mi codigo')
    return
  }

  let numeroPost = 15
  let postMandar = []
  let arrayAmigos = op.amigosVisitados
  let nuevoAmigosVisitados = []
  for (let i = 0; i <= user.ultimasBusquedas.length - 1 && numeroPost > 0; i++) {
    const userAmigo = await ModelUser.findOne({ usuari: user.ultimasBusquedas[i] })
    let existeAmigo = false
    arrayAmigos.forEach(el => {
      if (el.nombre === userAmigo.usuari) {
        existeAmigo = true
      }
    })

    if (userAmigo) {
      if (!existeAmigo) {
        nuevoAmigosVisitados = [...nuevoAmigosVisitados, userAmigo.usuari]
        arrayAmigos = [...arrayAmigos, { nombre: userAmigo.usuari, contador: 0 }]
      }
      arrayAmigos.forEach((el, index) => {
        if (el.nombre === userAmigo.usuari) {
          if (userAmigo.post[el.contador]) {
            postMandar = [...postMandar, {
              nombre: userAmigo.usuari,
              post: userAmigo.post[el.contador],
              icon: userAmigo.icon
            }]
            arrayAmigos[index].contador = arrayAmigos[index].contador + 1
          }
        }
      })
    }
    numeroPost--
  }
  for (let i = numeroPost; i > 0; i--) {
    const random = Math.round(Math.random() * (user.amigos.length - 1))
    const userAmigo = await ModelUser.findOne({ _id: user.amigos[random] })
    let existeAmigo = false
    arrayAmigos.forEach(el => {
      if (el.nombre === userAmigo.usuari) {
        existeAmigo = true
      }
    })
    if (userAmigo) {
      if (!existeAmigo) {
        nuevoAmigosVisitados = [...nuevoAmigosVisitados, userAmigo.usuari]
        arrayAmigos = [...arrayAmigos, { nombre: userAmigo.usuari, contador: 0 }]
      }
      arrayAmigos.forEach((el, index) => {
        if (el.nombre === userAmigo.usuari) {
          if (userAmigo.post[el.contador]) {
            postMandar = [...postMandar, {
              nombre: userAmigo.usuari,
              post: userAmigo.post[el.contador],
              icon: userAmigo.icon
            }]
            arrayAmigos[index].contador = arrayAmigos[index].contador + 1
          }
        }
      })
    }
  }
  res.status(200).json({ amigos: postMandar, nuevoAmigosVisitados, arrayAmigos })
})
Router.post('/:id', async (req, res) => {
  const cookie = req.headers.cookie
  if (!cookie) {
    res.render(path.join(pages, 'html/pagina_principal/index.html'))
    return
  }
  const objetoVerificacion = verificacion(cookie)
  if (!objetoVerificacion.metodo) {
    res.render(path.join(pages, 'html/pagina_principal/index.html'))
    return
  }
  const nombreAmigo = req.params.id.replaceAll('%20', ' ')
  const user = await ModelUser.findOne({ usuari: objetoVerificacion.decodedToken.usuariname })
  const userAmigo = await ModelUser.findOne({ usuari: nombreAmigo })
  if (!userAmigo) {
    res.status(400).send('que shinga me mandaste?')
    return
  }
  let amigo = false
  user.amigos.forEach(el => {
    if (el === `${userAmigo._id}`) {
      amigo = true
    }
  })
  if (amigo) {
    await ModelUser.updateMany({ usuari: user.usuari }, { $pullAll: { amigos: [userAmigo._id] } })
  } else {
    await ModelUser.updateOne({ usuari: user.usuari }, { $push: { amigos: { $each: [userAmigo._id], $position: 0 } } })
  }
  res.json(objetoVerificacion)
})
module.exports = Router
