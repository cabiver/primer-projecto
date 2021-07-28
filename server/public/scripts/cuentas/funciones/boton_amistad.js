"use strict";
const botonDeAmistad = document.getElementById("cuentas.js-agregar_persona_amigo");
botonDeAmistad.addEventListener("click",async () =>{
    let res = await axios.post(window.location.pathname);
    if(res.statusText =="OK"){
        if(botonDeAmistad.innerHTML =="dejar de segir"){
            botonDeAmistad.innerHTML= "agregar a amigos";
        }else{
            botonDeAmistad.innerHTML= "dejar de segir";
        }
    }
});