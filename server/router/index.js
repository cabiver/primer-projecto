const path = require("path");
const Router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieNPM = require("cookie");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const bcrypt = require("bcrypt");
const model = require("../usariname.js");
const youKnow = "iLovePlayMinecraftForEver";
const pages = path.join(__dirname, "/../public/");
const baseHash = 10;
ffmpeg.setFfmpegPath(ffmpegPath);


function verificacion(cookie) {
  let jsoncookie = cookieNPM.parse(cookie);
  if (!jsoncookie.userName) {
    return { metodo: false };
  }
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  if (!decodedToken.id) {
    return { metodo: false };
  } else {
    return { metodo: true, decodedToken };
  }
}
Router.get("/", (req, res) => res.render(path.join(pages, "html/pagina_principal/index.html")));
Router.get("/register", (req, res) => res.render(path.join(pages, "html/register/registro.html")));
Router.get("/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  jsoncookie = cookieNPM.parse(cookie);
  let nombreUrl = req.params.id.replaceAll("%20", " ")
  const user = await model.findOne({ usuari: nombreUrl });
  if (!user) {
    res.render(pages + "html/servis/error.html");
    return;
  } else {
    if (!jsoncookie.userName || jsoncookie.userName == "undefined") {
      res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
      return;
    }
    let token = jsoncookie.userName;
    if (token.length == 0) {
      res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
      return;
    }
    const decodedToken = jwt.verify(token, youKnow);
    if (!decodedToken.id) {
      res.status(401).json({ mensaje: "ocurrio un error con la verificacion" });
      return;
    }
    arrayBackground = user.background.split(".");
    let extencion = arrayBackground[arrayBackground.length - 1];

    extencion =="mp4"|| extencion =="avi"
    ?extencion = `<video id="responsive_cuentas.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background" class="background-content-responsive-video" src="${user.background}" controls></video>`
    :extencion = `<img id="responsive_cuentas.js-la_entidad_de_la_imagen_para_poder_comparar_su_tamaño-background" class="background-content-responsive-imagen" src="${user.background}" alt="">`
    
    difbackground = `<img class="imageDifumida" src="${user.backgroundDifumidado}" alt="">`
    const userToken = await model.findOne({ _id: decodedToken.id });
    if (user._id == decodedToken.id) {
      res.render(pages + "html/cuentas/cuentas.ejs",{
        extencion: extencion,
        user: userToken.usuari,
        name: user.usuari,
        backgroundDifuminado: difbackground,
        icon: user.icon,
        perfil: userToken.icon,
      });
    } else {
      res.render(pages + "html/cuentas/anotherCuenta.ejs", {
        extencion: extencion,
        user: user.usuari,
        name: userToken.usuari,
        backgroundDifuminado: difbackground,
        icon: userToken.icon,
        perfil: user.icon,
      });
    }
  }
});
Router.post("/", async (req, res) => {
  let op = req.body;
  if (!op.uss || !op.contra) {
    res.status(400).json({ mensaje: "porque modificas mi codigo" })
    return
  }
  let primer = new model({
    usuari: op.uss,
    password: op.contra,
  });
  let user = await model.findOne({ usuari: primer.usuari });
  if (user) {
    if (await bcrypt.compare(primer.password, user.password)) {
      const token = jwt.sign({ id: user._id, usuariname: user.usuari }, youKnow);
      res.json({ metodo: true, token: token });
      return;
    }
  }
  res.status(203).json({ metodo: false, mensaje: "su contraseña o usuario esta mal" });
  return;
});
Router.post("/register", async (req, res) => {
  let op = req.body;
  if (!op.uss || !op.contra) {
    res.status(400).send("que haces cambiando mi codigo?");
    return;
  }
  const user = await model.findOne({ usuari: op.uss });
  if (user) {
    res.send({ metodo: false, mensage: "Este usuario ya existe" });
  }
  const salt = bcrypt.genSaltSync(baseHash);
  const passHash = bcrypt.hashSync(op.contra, salt);
  let primer = new model({
    usuari: op.uss,
    password: passHash
  })
  const userNew = await primer.save();
  const token = jwt.sign({ id: userNew._id, usuariname: userNew.usuari }, youKnow);
  res.send({
    metodo: true, mensage: "se ha guardado su usuario",
    nombre: userNew.usuari, 
    token: token
  });
  return;
});
Router.post("/cuentas/:id", async (req, res) => {
  op = req.body;
  cookie = req.headers.cookie;
  jsoncookie = cookieNPM.parse(cookie);
  const user = await model.findOne({ usuari: req.params.id });
  if (!user) {
    return res.status(404).render(pages + "/html/error.html")
  }
  arrayPost = user.post.content.slice(op.cont, op.cont + 3);
  arrayDescription = user.post.description.slice(op.cont, op.cont + 3);
  if (arrayPost == null) {
    res.send(JSON.stringify({ post: null }));
    return;
  }
  let primer = new model({
    usuari: user.usuari,
    post: {
      content: arrayPost,
      description: arrayDescription
    }
  });
  res.send(JSON.stringify(primer.post));
  res.end();
});
Router.post("/imagenes/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "/html/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).send("No files were uploaded." + req.file);
    return;
  }
  const imagen = req.files.image;
  const user = await model.findOne({ usuari: req.params.id });
  if (user._id != objetoVerificacion.decodedToken.id) {
    res.status(400).json({ mesage: "usted no tiene permitido cambiar ni agregar nada a esta cuenta" });
    return;
  }
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  let desc = Date() + "█ " + req.body.description;
  let nombreimagen = uuidv4() + imagen.name;
  let postImg = "temp/" + nombreimagen;
  imagen.name = nombreimagen;
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402);
    }
  });
  await model.updateOne({ usuari: user.usuari }, { $push: { "post.content": { $each: [postImg], $position: 0 } } })
  await model.updateOne({ usuari: user.usuari }, { $push: { "post.description": { $each: [desc], $position: 0 } } })
  res.status(200).send("all great");
});
Router.post("/perfilIcon/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  cookie = req.headers.cookie;
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({ mensage: "No files were uploaded." });
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  const user = await model.findOne({ usuari: req.params.id });
  if (!user || user._id != objetoVerificacion.decodedToken.id) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  cookie = req.headers.cookie;
  jsoncookie = cookieNPM.parse(cookie);
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  if (user._id != decodedToken.id) {
    res.status(400).json({ mesage: "usted no tiene permitido cambiar ni agregar nada a esta cuenta" });
    return;
  }
  imagen = req.files.image
  let nombreimagen = uuidv4() + imagen.name;
  nomebreimagen = nombreimagen.replace('"', "")
  let postImg = "iconos/" + nombreimagen;
  imagen.name = nombreimagen;
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402);
    }
  });
  await model.updateOne({ usuari: user.usuari }, { icon: "/" + postImg });
  res.status(200).send("all great");
});
Router.post("/background/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({ mensage: "No files were uploaded." });
    return;
  }
  const user = await model.findOne({ usuari: req.params.id });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (user._id != objetoVerificacion.decodedToken.id) {
    res.status(400).json({ mesage: "usted no tiene permitido cambiar ni agregar nada a esta cuenta" });
    return;
  }
  imagen = req.files.image
  let nombreimagen = uuidv4() + imagen.name;
  nomebreimagen = nombreimagen.replace('"', "");
  let postImg = "backgrounds/" + nombreimagen;
  arrayBackground = nombreimagen.split(".");
  let nombreSinExtencion = "";
  if(arrayBackground.length.length >2){
    for (let index = 0; index < arrayBackground.length-2; index++) {
      nombreSinExtencion+=arrayBackground.length[index]
    }
  }else{
    nombreSinExtencion = arrayBackground[0]
  }
  extencion = arrayBackground[arrayBackground.length - 1];
  imagen.name = nombreimagen;
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402);
    }
  });
  let difuminado = `backgroundDifuminado/${nombreSinExtencion}.jpg`
  if (extencion == "mp4" || extencion == "avi") {
    ffmpeg({ source: path.join(pages, postImg) })
      .takeScreenshots({ filename:`${nombreSinExtencion}.jpg`, timemarks: [0] }, pages+"/backgroundDifuminado");
    await model.updateOne({ usuari: user.usuari }, { background: "/" + postImg });
    await model.updateOne({ usuari: user.usuari }, { backgroundDifumidado: "/" + difuminado });
  } else {
    await model.updateOne({ usuari: user.usuari }, { background: "/" + postImg });
    await model.updateOne({ usuari: user.usuari }, { backgroundDifumidado: "/" + postImg });
  }
  res.status(200).send("all great");
});
Router.post("/buscar", async (req, res) => {
  let op = req.body;
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  if (!op.usuarios) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }

  const user = await model.findOne({ usuari: op.usuarios });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  res.json({ pagina: "/" + user.usuari })
});
Router.post("/miSitio", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  const user = await model.findOne({ _id: objetoVerificacion.decodedToken.id });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  res.json({ pagina: "/" + user.usuari })
});
Router.post("/deleteimagen/:id", async (req, res) => {
  let op = req.body;
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario");
    return;
  }
  const user = await model.findOne({ usuari: req.params.id });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario");
    return;
  }
  if (user._id != objetoVerificacion.decodedToken.id) {
    res.status(404).send("usted no esta autorizado");
    return;
  }
  let description = user.post.description;
  let content = user.post.content;
  let deleteDescription;
  let deleteContent;

  content.forEach((element, indice) => {
    if (element == op.parametros) {
      deleteDescription = description[indice];
      deleteContent = element;
    }
  });

  fs.unlinkSync(path.join(pages,op.parametros))

  await model.updateMany({ usuari: user.usuari }, { $pullAll: { "post.content": [deleteContent] } });
  await model.updateMany({ usuari: user.usuari }, { $pullAll: { "post.description": [deleteDescription] } });
  res.status(200).send("all great");
});
Router.post("/recomendacion", async (req, res) => {
  let op = req.body;
  let users = await model.find({ usuari: { $regex: `${op.usuarios}` } }, { usuari: 1, _id: 0 }).limit(4);
  let arrayUsers = [];
  users.forEach(element => {
    arrayUsers.push(element.usuari);
  })
  res.status(200).json({ nombres: arrayUsers });
});
module.exports = Router;