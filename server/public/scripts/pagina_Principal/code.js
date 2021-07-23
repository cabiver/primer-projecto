"use strict";
let create = false;

const contra= document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible");
const send = document.getElementById("send");
const prueba = document.getElementById("prueba");
const usuariName= document.getElementById("usuarios");
const resultado=document.getElementById("resultado");
botonSesion.addEventListener("touchstart", (e)=>{
    sesion.classList.remove("hidden");
    sesion.classList.add("pestana");
});
botonSesion.addEventListener("touchleave", (e)=>{
    sesion.classList.remove("hidden");
    sesion.classList.add("pestana");
});
botonSesion.addEventListener("click", (e)=>{
    if(create){
        create= false;
        sesion.classList.remove("pestana");
        sesion.classList.add("hidden");
    }else{
        sesion.classList.remove("hidden");
        sesion.classList.add("pestana");
        create = true;
    }
});
send.addEventListener("click",(e)=>{
    e.preventDefault();
    resultado.innerHTML = "cargando";
    axios.post("/",  {
        uss: usuariName.value,
        contra: contra.value
    })
        .then(function (response) {
            let autorizar = response.data.metodo;
            let mensaje = response.data.mensaje;
            let token = response.data.token;
            if(autorizar) {
                document.cookie = "userName="+token;
                window.location.assign("/"+usuariName.value);
            }else{
                resultado.innerHTML = mensaje;
            }
        })
        .catch(function (error) {
        resultado.innerHTML = "contraseña o usuario incorrecto";
        });
});