const express = require('express');
const app = express();

const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fileupload = require('express-fileupload');
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
const jwt = require('jsonwebtoken');
const cookieNPM = require('cookie');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);



const youKnow = "iLovePlayMinecraftForEver"; 
const pages = path.join(__dirname,'/../../jsProyect/');

app.use(methodOverride()); 
app.use(fileupload());


const bcrypt = require('bcrypt');
const baseHash = 10;
const model = require('../usariname.js');

router.get('/variables',(req , res)=>res.sendFile(pages+'css/servis/variables.css'))

router.get('/401',(req , res)=>res.sendFile(pages+'css/servis/401.css'))

router.get('/background',(req , res)=>res.sendFile(pages+'images/background.jpg'))//jsProyect/images/eyeball-icon-png-eye-icon-1.png

router.get('/iconPredeterminado',(req , res)=>res.sendFile(pages+'images/camille-300x300.png'))

router.get('/knucles',(req , res)=> res.sendFile(pages+'images/knucles_new.png'))

router.get('/lupa',(req , res)=> res.sendFile(pages+'images/lupa.png'))

router.get('/center',(req , res)=> res.sendFile(pages+'css/servis/center.css'))

router.get('/normalize',(req , res)=> res.sendFile(pages+'css/servis/normalize.css'))

router.get('/errorStyle',(req , res)=> res.sendFile(pages+'css/servis/error.css'))


router.get('/',(req , res)=>{
  res.render(path.join(pages,'html/pagina_principal/index.html'));
});
router.get('/favicon.ico',(req , res)=>{
  res.sendFile(pages+'images/camille-300x300.png');
});
router.get('/register',(req , res)=>{
  res.render(path.join(pages,'html/register/registro.html'));
});
router.get('/imagenes',(req , res)=>{
  res.render(path.join(pages,'html/imagenes.ejs'));
});
router.get('/401',(req , res)=>{
  res.render(path.join(pages,'html/servis/401NoAutorizacion.html'));
});
router.get('/:id',async(req , res)=>{
  cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
    return;
  }
  //console.log(req.headers.cookie);
  
  jsoncookie=cookieNPM.parse(cookie);

  //console.log(jsoncookie)
  const user = await model.findOne({usuari: req.params.id});
  //console.log(user)
  if(!user){
    //console.log("no se encontro, te voy a mandar a error 404")
    res.render(pages+"/html/servis/error.html");
    return;
  }else{
    
    //console.log(jsoncookie)
    if(!jsoncookie.userName||jsoncookie.userName == "undefined"){
      res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
      return;
    }
    //console.log(cookie);
    //let primeraSeparacion=cookie.split("=")[1];
    //let token = primeraSeparacion.split(";")[0];
    let token =jsoncookie.userName;
    //console.log(token)
    if(token.length ==0){
      //console.log("entro aqui?")
      res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
      return;
    }
    //console.log("llego aqui?");
    const decodedToken = jwt.verify(token, youKnow);
    //console.log(decodedToken)
    if(!decodedToken.id){
      res.status(401).json({mensaje:"ocurrio un error con la verificacion"});
      return;
    }

    arrayBackground= user.background.split(".");
    extencion = arrayBackground[arrayBackground.length-1];
   
    if(extencion == "mp4"||extencion == "avi"){
      extencion= '<video id="background" class="background-content-responsive-video" src=" '+user.background+' " controls></video>'
   }else{
     extencion= '<img id="background" class="background-content-responsive-imagen" src="'+user.background+'" alt="">'    
    
   } 
   difbackground='<img class="imageDifumida" src="'+user.backgroundDifumidado+'" alt="">'      
    
    const userToken = await model.findOne({_id : decodedToken.id});
    if(user._id == decodedToken.id){
      res.render(pages+'html/cuentas/cuentas.ejs',
      {
        extencion:extencion,
        user: userToken.usuari,
        name: user.usuari,
        backgroundDifuminado: difbackground,
        icon: user.icon,
        perfil: userToken.icon,
      });
    }else{
      //console.log("este token no es para este usuario")
        res.render(pages+"html/cuentas/anotherCuenta.ejs",{
        extencion:extencion,
        user: user.usuari,
        name: userToken.usuari,
        backgroundDifuminado: difbackground,
        icon: userToken.icon,
        perfil: user.icon,
      });
    }
  
  }
  /*
  res.render(path.join(pages,'html/cuentas.ejs'),
  //console.log(id)
  //res.end();
  
  {
    name: 'camille',
    icon: 'temp/camille-300x300png.jpg',
    content: 'temp/camille_by_siri_soap_ddv4l12-prejpg.jpg'
  });
  */
});




router.post('/',async (req , res)=>{
  let op = req.body;
  //console.log(op)
if(!op.uss||!op.contra){
  res.status(400).json({mensaje:"porque modificas mi codigo"})
  return
 }
 let nombreDeComparacion = op.uss.replace(" ","_");
  let primer = new model({
      usuari: nombreDeComparacion,
      password:  op.contra,
  });
  let user = await model.findOne({usuari: primer.usuari});
  //console.log(user)
  //console.log(passHash)
  if(user){
  
    
    
    
    if(await bcrypt.compare(primer.password, user.password)){
      
      //console.log("felicidades ya la autenticaste");  
      /*
      const token= jwt.sign({id: user._id, usuariname: user.usuari}, youKnow, (erro,token)=>{
        console.log(token)
        res.send({Token: token});
        
      });
    */
      const token= jwt.sign({id: user._id, usuariname: user.usuari}, youKnow);
      //console.log(token);
      res.json({metodo:true, token: token});
      return;
      
    }
  }
  //console.log("el usuario no existe");
  res.status(203).json({metodo:false, mensaje:'su contraseña o usuario esta mal'});
  return;
});
router.post('/register',async (req , res)=>{
    let op = req.body;
    //console.log(op)
    
    

    if(!op.uss || !op.contra ){
      res.status(400).send("que haces cambiando mi codigo?");
      return;
    }
    const user = await model.findOne({usuari:op.uss});
    if(user){
      res.send({metodo:false,mensage: "Este usuario ya existe"});
    }
    //console.log(primer.password)
    
    const salt = bcrypt.genSaltSync(baseHash);
    let passHash=bcrypt.hashSync(op.contra, salt);
    const nombreTranformado= op.uss.replaceAll(" ","_");

    let primer = new model({
        usuari: nombreTranformado,
        password: passHash  
    })

    if(!user){
      //console.log("ya existe")
      const userNew= await primer.save();
      //console.log(userNew)
      const token= jwt.sign({id: userNew._id, usuariname: userNew.usuari}, youKnow);

      res.send({metodo:true, mensage : "se ha guardado su usuario"
                ,nombre: nombreTranformado,  token: token});
      return;
    }
});
router.post('/cuentas/:id',async (req , res)=>{
  op = req.body;
  cookie=req.headers.cookie;
  jsoncookie=cookieNPM.parse(cookie);
  
  const user = await model.findOne({usuari : req.params.id});
  if(!user){
    return res.status(404).render( pages+"jsProyect/html/error.html")
  }

  arrayPost = user.post.content.slice(op.cont, op.cont+3);
  arrayDescription = user.post.description.slice(op.cont, op.cont+3);



  if(arrayPost == null){
    res.send(JSON.stringify({post : null})); 
    return; 
  }

   let primer = new model({
    usuari: user.usuari,
    post:{
      content: arrayPost,
      description: arrayDescription
    }
  });
   res.send(JSON.stringify(primer.post));
  res.end();
}); 
router.post('/imagenes/:id',async (req , res)=>{

  cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/401NoAutorizacion.html");
    return;
    }
  jsoncookie=cookieNPM.parse(cookie);
  
   
  if (!jsoncookie.userName ||!req.files || Object.keys(req.files).length === 0|| !req.files.image) {
   res.status(400).send('No files were uploaded.' + req.file);
   return;
  }
  
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  const imagen = req.files.image;
  const user = await model.findOne({usuari : req.params.id});
  
  if(user._id != decodedToken.id){
    res.status(400).json({mesage:'usted no tiene permitido cambiar ni agregar nada a esta cuenta'});
   return;
  }
  if(!user){
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  
  let desc = Date()+"█ "+req.body.description;
  let nombreimagen =uuidv4()+ imagen.name;
  let postImg ="temp/"+ nombreimagen;
  
  imagen.name = nombreimagen;

  //console.log(imagen)
  //console.log( path.join(__dirname,'/..','/..',postImg))
  imagen.mv(path.join(__dirname,'/..','/..',"jsProyect",postImg), err=>{
    if(err){
      return res.status(402);
    }
  });

  //let description = user.post.description;
  //let content = user.post.content;

  //let textContent= [postImg];
  //let textDesc=[desc];

  //let arrayContent = textContent.concat(content);
  //let arrayDescription = textDesc.concat(description);


  
  await model.updateOne({usuari: user.usuari},{$push: { "post.content": { $each: [postImg], $position: 0 } }})
  await model.updateOne({usuari: user.usuari},{$push: { "post.description": { $each: [desc], $position: 0 } }})
  
  //await model.updateOne({usuari: user.usuari},{$set:{ "post.content" :  arrayContent}})
  //await model.updateOne({usuari: user.usuari},{$set:{ "post.description" :  arrayDescription}})
 res.status(200).send("all great");
});
router.post('/perfilIcon/:id',async (req , res)=>{
  //console.log(req.file)
  //console.log(req.params.id)

  cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
    return;
  }
  cookie=req.headers.cookie;
  jsoncookie=cookieNPM.parse(cookie);
  
  if (!jsoncookie||!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
   res.status(400).json({mensage:'No files were uploaded.'});
   return;
  }
  //console.log(req.file.filename);
  const user = await model.findOne({usuari : req.params.id});
  if(!user){
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  cookie=req.headers.cookie;
  jsoncookie=cookieNPM.parse(cookie);
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);

  if(user._id != decodedToken.id){
    res.status(400).json({mesage:'usted no tiene permitido cambiar ni agregar nada a esta cuenta'});
   return;
  }

  imagen = req.files.image
  let nombreimagen =uuidv4()+ imagen.name;
      nomebreimagen = nombreimagen.replace('"',"")
  let postImg ="iconos/"+ nombreimagen;
  
  imagen.name = nombreimagen;

  //console.log(imagen)
  //console.log( path.join(__dirname,'/..','/..',postImg))
  imagen.mv(path.join(__dirname,'/..','/..',"jsProyect",postImg), err=>{
    if(err){
      return res.status(402);
    }
  });
  //  console.log(imagen)
 // console.log(path.join(__dirname,'/..','/..',postImg))
 // console.log(imagen.name)

  await model.updateOne({usuari: user.usuari},{icon : "/"+postImg}); 
 res.status(200).send("all great");
});
router.post('/background/:id',async (req , res)=>{
  //console.log(req.files)
  
  cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
    return;
  }
  jsoncookie=cookieNPM.parse(cookie);

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({mensage:'No files were uploaded.'});
    return;
   }
   //console.log(req.file.filename);
   const user = await model.findOne({usuari : req.params.id});
   if(!user){
     res.status(404).send("no se ah encontrado el usuario")
     return;
   }
   

   const token = jsoncookie.userName
   const decodedToken = jwt.verify(token, youKnow);

   if(user._id != decodedToken.id){
    res.status(400).json({mesage:'usted no tiene permitido cambiar ni agregar nada a esta cuenta'});
   return;
  }
   imagen = req.files.image
   let nombreimagen =uuidv4()+ imagen.name;
       nomebreimagen = nombreimagen.replace('"',"")
   let postImg ="backgrounds/"+ nombreimagen;
   
   arrayBackground= nombreimagen.split(".");
   let nombreSinExtencion="";
   
  if(arrayBackground.length >2){
    for (var i = 0; i < arrayBackground.length-1; i++) {
      nombreSinExtencion = nombreSinExtencion+arrayBackground[i];
    }
  }
  
 //console.log(nombreSinExtencion)
   extencion = arrayBackground[arrayBackground.length-1];
   imagen.name = nombreimagen;
   
   //console.log(imagen)
   //console.log( path.join(__dirname,'/..','/..',postImg))
   

   imagen.mv(path.join(__dirname,'/..','/..',"jsProyect",postImg), err=>{
    if(err){
      return res.status(402);
    }
  });

   let difuminado = "backgroundDifuminado/"+nombreSinExtencion+".jpg"

   if(extencion == "mp4"||extencion == "avi"){
    //console.log("el background es una video")
     ffmpeg({ source: path.join(__dirname,'/..','/..',"jsProyect",postImg)})
    .takeScreenshots({filename:nombreSinExtencion+".jpg",timemarks:[0]},path.join(__dirname,'/..','/..',"jsProyect/backgroundDifuminado"))
    await model.updateOne({usuari: user.usuari},{background : "/"+postImg}); 
    await model.updateOne({usuari: user.usuari},{backgroundDifumidado : "/"+difuminado}); 
    
  }else{
   
    await model.updateOne({usuari: user.usuari},{background : "/"+postImg}); 
    await model.updateOne({usuari: user.usuari},{backgroundDifumidado : "/"+postImg}); 
     
  }
   //  console.log(imagen)
  // console.log(path.join(__dirname,'/..','/..',postImg))
  // console.log(imagen.name)
 
   
  res.status(200).send("all great");
});
router.post("/buscar",async (req , res)=>{
  let op = req.body;
  cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
    return;
  }
  //console.log(op);
  if(!op.usuarios){
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }

  const user = await model.findOne({usuari : op.usuarios});
  //console.log(user)
  if(!user){
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  //console.log("llegas aca?")
  //res.json({mensage: "como servira esto"});
  res.json({pagina: "/"+user.usuari})
});
router.post("/miSitio",async (req , res)=>{
  let op = req.body;
    cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
    return;
  }
  jsoncookie=cookieNPM.parse(cookie);
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  //console.log(decodedToken)
  const user = await model.findOne({_id : decodedToken.id});
  //console.log(user)
  if(!user){
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  //console.log("llegas aca?")
  //res.json({mensage: "como servira esto"});
  res.json({pagina: "/"+user.usuari})
});
router.post("/deleteimagen/:id",async (req , res)=>{
  let op = req.body;
  cookie=req.headers.cookie;
  if(!cookie){
    res.status(401).render(pages+"/html/servis/401NoAutorizacion.html");
    return;
  }
  jsoncookie=cookieNPM.parse(cookie);
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  //console.log(decodedToken)
  const user = await model.findOne({usuari : req.params.id});
  //console.log(user)
  if(!user){
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if(user._id!=decodedToken.id){
    res.status(404).send("usted no esta autorizado")
    return;
  }
  let description = user.post.description;
  let content = user.post.content;

  let deleteDescription;
  let deleteContent;
  content.forEach((element,indice) => {
    //console.log(element)
    if(element == op.parametros){
      //console.log("si existe ese archivo"+element)
      //console.log("y este es su descripcion "+description[indice])
      deleteDescription = description[indice];
      deleteContent = element;
    }
  });
  //await model.deleteMany({ usuari: user.usuariname, age: { $gte: 18 } });
  await model.updateMany({usuari: user.usuari}, { $pullAll: { "post.content": [deleteContent] } }); 
  await model.updateMany({usuari: user.usuari}, { $pullAll: { "post.description": [deleteDescription] } } );

  res.status(200).send("all great");
});
router.post("/recomendacion",async (req , res)=>{
  let op = req.body;
  let users=await model.find({ usuari: {$regex:`${op.usuarios}`}},{usuari:1, _id:0}).limit(4);
  let arrayUsers=[];
  users.forEach(element=>{
    arrayUsers.push(element.usuari);
  })
  res.status(200).json({nombres:arrayUsers});
});
module.exports = router;