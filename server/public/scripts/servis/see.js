let pass = true;
const see = document.getElementById("see.js-servicio_de_visualizador_de_password");
see.addEventListener("click", (e)=>{
    if(pass){
        document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible").type = "text";
        pass=false;
    }else{
        document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible").type = "password";
        pass=true;
    } 
});