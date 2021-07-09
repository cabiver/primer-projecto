
//here, i just create valuable expres
const express = require("express");
//and here, the valuable "app" add the express funtions
const app = express();
//the path works for create links url
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const cookieNPM = require('cookie');
const ffmpeg = require('fluent-ffmpeg');
///////////app.use(multer({dest: '/temp' , storage}).single('image'));


const mongoose = require('mongoose');

//add a atributes call 'port' what contain he number '3.000' 
app.set('port', process.env.port || 3000);

app.use(fileupload());

//this line works for what the 'html' files run in 'ejs' files}
app.engine('html', require('ejs').renderFile);

//app.use(require("./middelware/middel.js"));


//this is my router, where i've all directions
app.use(require(path.join(__dirname,'router/index.js')));

const {url} = require('./database.js');

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true})
.then(db => console.log("db is conect"))
.catch(err=> console.log(err))


//if don´t find de archive, found it in this url
app.use('/',express.static(path.join(__dirname,'../jsProyect')));

//and this is my error 404

app.use('*',(req,res)=>{
  res.render(path.join(__dirname,'/../jsProyect/html/servis/error.html'));
});


//this line just run in the first time the server is active
app.listen(app.get('port'), ()=>{
    console.log(`esta corriendo por el puesto ${app.get('port')} `);
    
});

