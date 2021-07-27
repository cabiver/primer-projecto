"use strict";
let indiceDeBusqueda=-1;
let contador=0;
let canload=true;
let limit = false;
let navegacion = false;
let arrayAllDelete;

const perfil = document.getElementById("cuentas.js-agregar_eventos_que_desplegue_opciones_de_usuarios");
const cerrarSesion = document.getElementById("cerrarSesion");
const barraDeNavegacion =document.getElementById("barra-de-navegacion");
const load = document.getElementById("cuentas.js-detectar_cuando_es_observado");
const miSitio = document.getElementById("ir-a-mi-sitio");




const redirecionarClick = ()=>{
    let arrayRediret=document.querySelectorAll(".redirectClick");
    arrayRediret.forEach(element => {
        element.addEventListener("click",e=>{
            e.srcElement.classList.add("seleccionado")
            let formdata = new FormData();
            formdata.set("usuarios",e.srcElement.innerText);
            axios.post("/buscar",formdata).then(e=>{
                console.log(e) 
                window.location.assign(e.data.pagina);
            });
        })
    });
}
miSitio.addEventListener("click",e=>{
    e.preventDefault();
    axios.post("/miSitio")
        .then(e=>{
        console.log(e) 
        window.location.assign(e.data.pagina)
    });
});
function repintarbusqueda(e){
    if(divRecomiendaciones.childNodes.length==0){
        return;
    }
    divRecomiendaciones.childNodes.forEach(element=>{
        element.classList.remove("seleccionado")
    });
    if(e=="ArrowUp"){
        if(indiceDeBusqueda>0){
            indiceDeBusqueda--;
        }
    }
    if(e=="ArrowDown"){
        if(indiceDeBusqueda <divRecomiendaciones.childNodes.length-1 && indiceDeBusqueda>=-1){
            indiceDeBusqueda++;
        }
    }
    if(indiceDeBusqueda == -1){
        indiceDeBusqueda = 0;
    }
    if(divRecomiendaciones.childNodes[indiceDeBusqueda]){
        divRecomiendaciones.childNodes[indiceDeBusqueda].setAttribute("class","normal redirectClick seleccionado");   
    }
}
fromBarraDeBusqueda.addEventListener("keyup",e=>{
    const formdata = new FormData(fromBarraDeBusqueda);
    if((e.key=="ArrowUp")||e.key=="ArrowDown"){
        repintarbusqueda(e.key);
       return;
    }
    if(formdata.get("usuarios") !=""){
        axios.post("/recomendacion",formdata)
        .then(e=>{
                while (divRecomiendaciones.firstChild) {
                    divRecomiendaciones.removeChild(divRecomiendaciones.firstChild);
                }
                e.data.nombres.forEach(element=>{
                const div = document.createElement("div");
                div.classList.add("normal","redirectClick");
                div.innerHTML = element;
                divRecomiendaciones.appendChild(div)
            });
            indiceDeBusqueda=-1;
            redirecionarClick();
        });
    }else{
        while (divRecomiendaciones.firstChild) {
            divRecomiendaciones.removeChild(divRecomiendaciones.firstChild);
        }
    }
});
fromBarraDeBusqueda.addEventListener("submit",e=>{
    e.preventDefault();
    if(indiceDeBusqueda == -1){
        const formdata = new FormData(fromBarraDeBusqueda);
        if(!formdata.get("usuarios")){
            return;
        }else{
            axios.post("/buscar",formdata).then(e=>{
                window.location.assign(e.data.pagina);
            });
        }
    }else{
        let nombreSeleccionado=divRecomiendaciones.childNodes[indiceDeBusqueda].textContent;
        let formdata = new FormData();
        formdata.set("usuarios",nombreSeleccionado);
        axios.post("/buscar",formdata).then(e=>{
            window.location.assign(e.data.pagina);
        });   
    }
});
const convertidorADias=(diaComparador)=>{
    if(diaComparador == "Mon")return "lunes";
    if(diaComparador == "Tues")return "martes";
    if(diaComparador == "Wed")return "miercoles";
    if(diaComparador == "Thu")return "jueves";
    if(diaComparador == "Fri")return "viernes";
    if(diaComparador == "Sat")return "sabado";
    if(diaComparador == "Sun")return "domingo";
    return diaComparador;
}
const convertidorAMes=(mesComparador)=>{
    if(mesComparador == "Jan")return "march";
    if(mesComparador == "Mar")return "marzo";
    if(mesComparador == "Feb")return "febrero";
    if(mesComparador == "Apr")return "abril";
    if(mesComparador == "May")return "Mayo";
    if(mesComparador == "Jun")return "Junio";
    if(mesComparador == "Jul")return "julio";
    if(mesComparador == "Aug")return "Agosto";
    if(mesComparador == "Sep")return "septiembre";
    if(mesComparador == "oct")return "obtubre";
    if(mesComparador == "Nov")return "Noviembre";
    if(mesComparador == "Dec")return "Diciembre";
    return mesComparador;
}
perfil.addEventListener("click",e=>{
    if(navegacion){
        navegacion = false;
        barraDeNavegacion.style.display = "none";
    }else{
        navegacion = true;
        barraDeNavegacion.style.display = "";
    }
})
function createMorePhoto(){
    limit = true;
    document.getElementById("ventana-acabo-las-fotos").style.display = "";
}
function createImgVideo(element,complement,ast,indice) {
    let descrip = complement[indice].split("█");
    let nars =document.createElement("div");
    let content =document.createElement("div");
    ast.setAttribute("src",element);
    ast.setAttribute("class", " precentacion");
    let descr =  document.createElement("p");
    descr.setAttribute("class", " fuente");
    
    let fechaDePosteo =  document.createElement("p");
    let fecha = descrip[0].split(" ");
    let dia= fecha[0];
    let mes=fecha[1];
    let diaDelMes=fecha[2];
    let year = fecha[3];

    let fechaText= convertidorADias(dia)+" "+convertidorAMes(mes)+" "+diaDelMes+" "+year;
    fechaDePosteo.innerHTML= fechaText;
    fechaDePosteo.setAttribute("class","fecha-post")
    let contentenFlex = document.createElement("div")
    contentenFlex.setAttribute("class","flex-para-contenido")
    let complemento = document.createElement("div");
    complemento.setAttribute("class","flexGrow");
    let divDelete = createX(element)
    contentenFlex.appendChild(fechaDePosteo);
    contentenFlex.appendChild(complemento);
    contentenFlex.appendChild(divDelete);
    content.appendChild(contentenFlex);
    descr.innerHTML= descrip[1];
    content.appendChild(nars);
    nars.appendChild(descr);
    nars.appendChild(ast);   
    nars.setAttribute("class", "mar");
    content.setAttribute("class","div-para-marco");
    marco.appendChild(content);
}
function elementos(p){
    let op =  p.data.content;
    let complement = p.data.description;
    if(p != undefined){
        op.forEach((element, indice) => {
                let extencion = element.split(".");
                if(extencion[(extencion.length-1)]=="mp4" ||extencion[(extencion.length-1)]=="avi"){
                    let ast = document.createElement("video");
                    ast.setAttribute("controls", "")
                    createImgVideo(element,complement,ast,indice)
                }else{
                    if(extencion[(extencion.length-1)]=="mp3" ||extencion[(extencion.length-1)]=="ogg"||extencion[(extencion.length-1)]=="wav"){
                        let ast = document.createElement("audio");
                        ast.setAttribute("controls", "");
                        createImgVideo(element,complement,ast,indice)
                    }else{
                        
                        let ast = document.createElement("img");
                        createImgVideo(element,complement,ast,indice)
                    }
                }
               
        });
        if(op.length <3){
            createMorePhoto()
        }
        actualizarDelete()
        contador+=3;
        setTimeout(() => {
            canload=true;
        }, 2000);
    }
}
const cal = ()=>{
    if(!canload || limit) {
        return;
    }
    canload = false;
    axios.post("/cuentas"+location.pathname,{
        cont:contador,
    })
      .then(function (response) {
          if(response.data.content.length === 0){
              createMorePhoto();
              return;
          }
        elementos(response);
      }).catch(function (error) {
        console.log(error);
    });
}
cerrarSesion.addEventListener("click",e=>{
    document.cookie = "userName=";
    window.location.assign("/");
});
const relleno = document.getElementById("full");
const observer = new IntersectionObserver(cal);
observer.observe(load);

