"use strict";
const usuario = document.getElementById("js_register.js-validar_el_nombre_de_usuario");
const contraseña = document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible");
const register = document.getElementById("js_register.js-boton_event_submit");
const sesion = document.getElementById("js_register-detectar_cuando_sea_clicado");



const check = (error)=>{
    if(error[0]){
        document.getElementById("js_register-informar_usuario_de_la_peticion").innerHTML = error[1];
    }   else{
        document.getElementById("js_register-informar_usuario_de_la_peticion").innerHTML = "request send";
    }   
}
const validartodo = (text, cant)=>{
    let error = [];
    let valido = document.getElementById(text);
    let vuelvaARellenar = validarLimpieza(valido.value);

    if(!vuelvaARellenar){
        error[0]=true;
        error[1]="quite los simbolos raros al usuario o al password Ejemplo: '#'%'&'/')";
        return error;
    }
    if(valido.value.length <cant){
        error[0] = true;
        if(text === "password"){
            error[1] = "the password must to have 8 character or more"
        }else{
            error[1] = "the usuari don´t have more 5 character"
        }
    }else error[0] = false;
    return error;
}
const validarLimpieza=(textClear)=>{
    let valor=true;
    for (var i = 0; i < (textClear.length-1); i++) {
        let letra=textClear[i];
        if(letra=="/")valor= false;
        if(letra=="%")valor= false;
        if(letra=="!")valor= false;
        if(letra==String.fromCharCode(92))valor= false;
        if(letra=="$")valor= false;
        if(letra=="{")valor= false;
        if(letra=="}")valor= false;
        if(letra==":")valor= false;
        if(letra=="=")valor= false;
    }   
    return valor;
}
const limpliar=(textClear)=>{
    textClear=textClear.replaceAll("'","");
    textClear=textClear.replaceAll(String.fromCharCode(92),"");
    textClear=textClear.replaceAll("$","");
}
sesion.addEventListener("click",(e)=>{
    axios.post("/",{
        uss: usuario.value,
        contra: contraseña.value
    })
        .then((response)=> {
            console.log(response);
            document.cookie = "userName="+response.data.token;     
            window.location.assign("/"+usuario.value);
        });
});
register.addEventListener("click", (e)=>{
    e.preventDefault();
    let error = validartodo("js_register.js-validar_el_nombre_de_usuario", 5);
    check(error);
    if(!error[0]){
        error = validartodo("see.js code.js responsive_index.js-cambiar_a_visible",8);
        check(error);
        if(!error[0]){             
            axios.post("/register", {
                uss: usuario.value,
                contra: contraseña.value
            })
              .then(function (response) {
                  document.getElementById("js_register-informar_usuario_de_la_peticion").innerHTML = response.data.mensage;
                  if(response.data.metodo){
                    document.cookie= "userName="+response.data.token;
                    let urlNombre= response.data.nombre.replaceAll(" ","%20")
                    window.location.assign("/"+urlNombre);
                }
              })
              .catch(function (error) {
                  console.log(error);
              });
        }
    }
});


