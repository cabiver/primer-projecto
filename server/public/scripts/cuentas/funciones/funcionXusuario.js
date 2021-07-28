"use strict";
var canDelete=true;
function actualizarDelete(){
    let arrayAllDelete = document.querySelectorAll(".deleteListener");
      for (let index = 0; index < arrayAllDelete.length; index++) {
        arrayAllDelete[index].addEventListener("click",async e=>{
            if(canDelete){
                canDelete = false;
                let formdata = new FormData();
                formdata.set("parametros", e.target.attributes.referen.nodeValue);
                
                let element = await axios.post("/deleteimagen"+location.pathname, formdata);
                if(element.statusText=="OK"){
                    window.location.reload();
                }else{
                    console.log("ocurrio un fallo al eliminar")
                }
            }           
        });
    }
}