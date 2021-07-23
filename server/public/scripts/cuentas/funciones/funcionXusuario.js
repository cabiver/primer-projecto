"use strict";
var canDelete=true;
function actualizarDelete(){
    let arrayAllDelete = document.querySelectorAll(".deleteListener");
    
      for (let index = 0; index < arrayAllDelete.length; index++) {
        arrayAllDelete[index].addEventListener("click",e=>{
            console.log("llama la funcion")
            if(canDelete){
                canDelete = false;
                let formdata = new FormData();
                formdata.set("parametros", e.target.attributes.referen.nodeValue)
                console.log(e.target.attributes.referen.nodeValue) 
                axios.post("/deleteimagen"+location.pathname, formdata)
                .then(e=>{console.log(e)
                window.location.reload();
                })
                .catch(e=>console.log(e));
            }           
        });
    }

}