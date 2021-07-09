'use strict';
var varchangeIcon= false;
var canChangeBackground = true;
var imagenDeBackground=false;
var file;
//const changeIcon = document.getElementById("changeIcon");

const changeIcon = document.getElementById("changeIcon");

const marco =document.getElementById("marco");
const form = document.getElementById("formImg");
const loadImg = document.getElementById("loadImg");
const img=  document.getElementById("imag");
const Header=  document.getElementById("Header");
const divBorderCamaraIcono = document.getElementById("divBorderCamaraIcono");
const closeChangeBackground=  document.getElementById("closeChangeBackground");
const gridChangeBackground=  document.getElementById("gridChangeBackground");
const fromChangeBackground=  document.getElementById("fromChangeBackground");
const inputPost=  document.getElementById("imgFile");
const respuestaBackground=  document.getElementById("respuestaBackground");
const renderIcono = document.getElementById("renderIcono");
const renderBackground = document.getElementById("renderBackground");

function esUnaImagen(nombre){
    let particiones = nombre.split(".");
    if(particiones[particiones.length-1] == "jpg" || particiones[particiones.length-1] == "png" || particiones[particiones.length-1] == "jpeg"){
      return true;
    }
    return false;
}

async function ocultarMostrar(){
    if(!varchangeIcon){
        changeIcon.style.display = "block";
        varchangeIcon = true;
    }else{

        changeIcon.style.display = "none";
        varchangeIcon = false;
    }



}

divBorderCamaraIcono.addEventListener("click",e=>{
    ocultarMostrar()
})

imageIcono.addEventListener("click",e=>{
   ocultarMostrar()
    
})


inputPost.addEventListener("change",e=>{
    //console.log("esta consola saltara cuando se agrege un archivo");
    //console.log(e)
    const formdata = new FormData(form);
    file =formdata.get('image');
    renderImage();   
})

window.addEventListener("keydown",e=>{
    if(e.key=="Escape" && imagenDeBackground){
        cabecera.style.display = "";
    gridChangeBackground.style.display="none";
    }

})
//const containerCamara = document.getElementById("divBorderCamara");
closeChangeBackground.addEventListener("click",e=>{
    imagenDeBackground = false;
    //console.log("porque no funciona?")
    cabecera.style.display = "";
    gridChangeBackground.style.display="none";
});
fromChangeBackground.addEventListener("submit",e=>{
    //console.log("dentro del form")
    
    e.preventDefault();
    if(canChangeBackground){
        canChangeBackground = false;
        let formdata = new FormData(fromChangeBackground);
        cabecera.style.display = "";
        gridChangeBackground.style.display="none";
        respuestaBackground.innerHTML = "cargando peticion";
        axios.post('/background'+location.pathname,formdata)
        .then(response=>{
        console.log(response);
        setTimeout(() => {
        window.location.reload();    
        }, 3000);
        
    }).catch(error=>{
        respuestaBackground.innerHTML="ah ocurriodo un error";
        console.log(error)
    });
    }
    
});

fromChangeBackground.addEventListener("change",e=>{
    //console.log("dentro del form")
    const formdata = new FormData(fromChangeBackground);
    const image = URL.createObjectURL(formdata.get("image"));
    renderBackground.setAttribute('src',image);
  
    
});
divBorderCamara.addEventListener( "click",e=>{
    imagenDeBackground=true;
    cabecera.style.display = "none";
    gridChangeBackground.style.height=window.innerHeight+"px";
    gridChangeBackground.style.display="";
});
const renderImage = ()=>{
    //console.log(file)
    //console.log(file.name)
    let extencion = file.name.split(".");
    let renderPc =document.getElementById("loadVideo");
    let reader = new FileReader;
    reader.readAsArrayBuffer(file);
    //console.log(extencion.length);
    //console.log(extencion);
    if(extencion[(extencion.length-1)] == "mp4"||extencion[(extencion.length-1)] == "mkv"){
        document.getElementById("loadVideo").style.height = "fit-content";
        document.getElementById("loadVideoMobile").style.height = "fit-content";
        img.setAttribute('src',"");
        document.getElementById("imagMobile").setAttribute('src',"")
        let barraDeCarga = document.getElementById("barra-de-carga");


        img.setAttribute('src',"");
        reader.addEventListener("progress",e=>{
            let carga = Math.round(e.loaded / file.size * 100);
            barraDeCarga.style.width=`${carga}%`;
            barraDeCarga.style.backgroundColor='#40da';
            
        })
        reader.addEventListener("load",e=>{
            
            let videofinalizado = new Blob([new Uint8Array(e.currentTarget.result)],{type: "video/mp4"})
            let url = URL.createObjectURL(videofinalizado);
            barraDeCarga.style.backgroundColor='transparent';
            renderPc.style.width="100%"
            renderPc.setAttribute("src",url)
            document.getElementById("loadVideoMobile").setAttribute("src",url)

        })
    }else{
        renderPc.setAttribute("src","")
        document.getElementById("loadVideoMobile").setAttribute("src","")
        renderPc.style.height = "0";
        renderPc.style.width = "0";
        document.getElementById("loadVideoMobile").style.height = "0";

        const image = URL.createObjectURL(file);
        img.setAttribute('src',image);
        document.getElementById("imagMobile").setAttribute('src',image)
    
    }
}

const changecolor = (obj, color, border)=>{
    //console.log(obj)
    obj.style.color = color;
    //console.log(obj.style)
    obj.style.borderColor = border;
}
function validar(){
    let validar = true;
    let formdata = new FormData(form);
    if(!file){
        console.log("entre donde no debi")
        file =formdata.get('image');
    }
    
    const text = formdata.get('description');
    if(file.size ==0){
        console.log("no hay foto")
        validar = false;
        return validar;
    }
    if(text.length >=150){
        console.log("hay mucho texto")
        validar = false;
        return validar;
    }
    if(text ===""){
        console.log("no hay texto")
        validar = true;
    }
    
    return validar;
}
loadImg.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changecolor(e.srcElement ,"#fff","#00f");
    //console.log(e);
});
loadImg.addEventListener("dragleave",(e)=>{
    changecolor(e.srcElement ,"","");
});
const render = (imageToRender)=>{
    if(!imageToRender){
    loadImg.innerHTML = "la igamen que ingreso es invalida"
        return
    }
    file = imageToRender;
    renderImage();
}
loadImg.addEventListener("drop",(e)=>{
    e.preventDefault();
    render(e.dataTransfer.files[0]);
    //render(e.dataTransfer.files[0]);
    changecolor(e.srcElement ,"","");
      //  console.log(e);
});
changeIcon.addEventListener('change',e=>{
    const formdata = new FormData(changeIcon);
    const image = URL.createObjectURL(formdata.get("image"));
    renderIcono.setAttribute('src',image);

});
changeIcon.addEventListener('submit',e=>{
    e.preventDefault();
    const formdata = new FormData(changeIcon);
    
    if(particiones[particiones.length-1] == "jpg" || particiones[particiones.length-1] == "png" || particiones[particiones.length-1] == "jpeg"){
       axios.post('/perfilIcon'+location.pathname, formdata)
    .then(function (response) {
        window.location.reload();
    })
    .catch(function (error) {
        console.log(error);
        document.getElementById("resultIcono").innerHTML = "verifique que alla mandado un archivo";
        
    });
    }else{
        document.getElementById("resultIcono").innerHTML = "no es un archivo de imagen valido";
        
    }
     
    
});
form.addEventListener('submit',e=>{
    e.preventDefault();
    //const objvalidar=validar()
    if(validar()){

        const formdata = new FormData(form);
        /*
        if(!file){
            file =formd.get('image');
        }
*/
        formdata.delete("image");
        //console.log(formdata);
        formdata.append("image", file);
        
        
        axios.post('/imagenes'+location.pathname, formdata)
          .then(function (response) {
              console.log(response)
              window.location.reload();
          })
          .catch(function (error) {
              console.log(error);
          });
    }
              
});





