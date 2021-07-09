const { Schema , model } = require('mongoose');
const usuari = new Schema({
    usuari: {type: String, required: true},
    password:  {type: String, required: true},
    date: {type: Date, default: new Date},
    content:[]
});
module.exports = model('usuarios', usuari);