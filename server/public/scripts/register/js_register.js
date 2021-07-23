"use strict";
const usuario = document.getElementById("usuari");
const contraseña = document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible");
const register = document.getElementById("send");
const sesion = document.getElementById("sign");



const check = (error)=>{
    if(error[0]){
        document.getElementById("resultado").innerHTML = error[1];
    }   else{
        document.getElementById("resultado").innerHTML = "request send";
    }   
}
const validartodo = (text, cant)=>{
    let error = [];
    let valido = document.getElementById(text);
    let vuelvaARellenar = validarLimpieza(valido.value);

    if(!vuelvaARellenar){
        error[0]=true;
        error[1]="quite los simbolos raros al usuario o al password Ejemplo: "#"%"&"/")"
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
    textClear=textClear.replaceAll(""","");
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
    let error = validartodo("usuari", 5);
    check(error);
    if(!error[0]){
        error = validartodo("password",8);
        check(error);
        if(!error[0]){             
            axios.post("/register", {
                uss: usuario.value,
                contra: contraseña.value
            })
              .then(function (response) {
                  console.log(response);
                  document.getElementById("resultado").innerHTML = response.data.mensage;
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


