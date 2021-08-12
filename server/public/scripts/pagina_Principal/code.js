"use strict";
let create = false;

const contra= document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible");
const send = document.getElementById("code.js-boton_event_submit");
const prueba = document.getElementById("prueba");
const usuariName= document.getElementById("code.js-captar_datos_nombre_de_usuario");
const resultado=document.getElementById("code.js-informar_usuario_de_la_peticion");
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
send.addEventListener("click",async (e)=>{
    e.preventDefault();
    resultado.innerHTML = "cargando";

    let respuesta = await axios.post("/",  {
        uss: usuariName.value,
        contra: contra.value
    })
    if(respuesta.statusText == "OK"){
        let autorizar = respuesta.data.metodo;
        let mensaje = respuesta.data.mensaje;
        let token = respuesta.data.token;
        if(autorizar) {
            document.cookie = "userName="+token;
            window.location.assign("/");
        }else{
            resultado.innerHTML = mensaje;
        }
    }else{
        resultado.innerHTML = "contraseña o usuario incorrecto";
    }
});