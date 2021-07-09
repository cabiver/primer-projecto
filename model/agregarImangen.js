const {Schema , model} = require('mongoose');
const agregar = new Schema({
    usuari: {type: String, required: true},
    password:  {type: String, required: true},
    date: {type: Date, default: new Date},
    post: {
        content:[],
        description:[]
    }
});
module.exports = model('usuarios', agregar);