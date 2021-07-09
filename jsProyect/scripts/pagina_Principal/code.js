"use strict";


var create = false;
//here i just call the botons or anything what i wanna have it  interation 
/*
caches.open("images").then(cache=>{
    cache.add("../images/background.jpg")
});
*/
const send = document.getElementById('send');
const prueba = document.getElementById('prueba');
const usuariName= document.getElementById("usuarios");

const resultado=document.getElementById("resultado");



botonSesion.addEventListener("touchstart", (e)=>{
    //e.preventDefault();
    sesion.classList.remove('hidden');
    sesion.classList.add('pestana');

});
botonSesion.addEventListener("touchleave", (e)=>{
    //e.preventDefault();
    sesion.classList.remove('hidden');
    sesion.classList.add('pestana');

});
botonSesion.addEventListener("click", (e)=>{
    //e.preventDefault();
    if(create){
        create= false;
        sesion.classList.remove('pestana');
        sesion.classList.add('hidden');
    }else{
        sesion.classList.remove('hidden');
        sesion.classList.add('pestana');
        create = true;
    }
    
});
send.addEventListener("click",(e)=>{
    e.preventDefault();
    resultado.innerHTML = "cargando";
    
    
    axios.post('/',  {//axios.post('/' get('/getcuenta'
        uss: usuariName.value,
        contra: contra.value
    })
      .then(function (response) {
          //console.log(response);
          let autorizar = response.data.metodo;
          let mensaje = response.data.mensaje;
          let token = response.data.token;
          console.log(mensaje);
          if(autorizar) {
            document.cookie = "userName="+token;
            let nombreDeComparacion=usuariName.value.replace(" ","_")
            window.location.assign("/"+nombreDeComparacion);
          }else{
            resultado.innerHTML = mensaje;
          }
          //document.cookie = "userName="+response.data.token;
          //window.location.assign("/"+usuariName.value);
          
          //axios.get('/cuentas',response.data)
          //document.write(response.data);
          //window.location.assign("/cuentas");
          //axios.get('/cuentas',response.data).then(e=>{console.log(e);});
          
      })
      .catch(function (error) {
          console.log(error);
      });
});


    


