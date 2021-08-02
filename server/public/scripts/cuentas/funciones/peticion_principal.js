let canload=true;
let limit = false;
let contador=0;
let amigosVisitados=[];
let infoVisitados ={};
const load = document.getElementById("cuentas.js-detectar_cuando_es_observado");



function createImgVideo(element,ast,indice) {
    // console.log(element,ast,indice)
    let descrip = element.description.split("█");
    

    let nars =document.createElement("div");
    let content =document.createElement("div");
    ast.setAttribute("src",element.post);
    ast.setAttribute("class", " precentacion");
    let descr =  document.createElement("p");
    descr.setAttribute("class", " fuente");
    
    let conteinerUser = document.createElement("div");
    conteinerUser.setAttribute("class"," nombre-usuario");
    conteinerUser.innerHTML=element.nombre;
    let conteinerFechaUser=document.createElement("div");
    conteinerFechaUser.setAttribute("class"," users-flex");
    

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

    let iconoImagen = document.createElement("img");
    iconoImagen.setAttribute("src",element.icon);
    iconoImagen.setAttribute("class"," icono-post");
    conteinerUser.appendChild(iconoImagen);
    conteinerFechaUser.appendChild(conteinerUser);
    conteinerFechaUser.appendChild(fechaDePosteo);
  
    
    contentenFlex.appendChild(conteinerFechaUser);
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


function createMorePhoto(){
    limit = true;
    document.getElementById("ventana-acabo-las-fotos").style.display = "";
}

function elementos(p){
    let op =  p.data.amigos;
    if(p != undefined){
        op.forEach((element, indice) => {
            // console.log(element);
            if(!element.post){
                return;
            }
                let extencion = element.post.split(".");
                if(extencion[(extencion.length-1)]=="mp4" ||extencion[(extencion.length-1)]=="avi"){
                    let ast = document.createElement("video");
                    ast.setAttribute("controls", "")
                    createImgVideo(element,ast,indice)
                }else{
                    if(extencion[(extencion.length-1)]=="mp3" ||extencion[(extencion.length-1)]=="ogg"||extencion[(extencion.length-1)]=="wav"){
                        let ast = document.createElement("audio");
                        ast.setAttribute("controls", "");
                        createImgVideo(element,ast,indice)
                    }else{
                        let ast = document.createElement("img");
                        createImgVideo(element,ast,indice)
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


const cal=async ()=>{
    if(limit){
        return;
    }
    if(!canload) {
        return;
    }
    canload = false;
    let respuesta = await axios.post("/UltimosPost",{
        cont:contador,
        amigosVisitados,
        infoVisitados,
    });
    console.log(respuesta);
    respuesta.data.amigos.forEach(element =>{
        amigosVisitados.forEach(el=>{
            if(element.nombre == el.nombre){
                el.contador++;
            }
        })
    });
    respuesta.data.nuevoAmigosVisitados.forEach(element =>{
        amigosVisitados=[...amigosVisitados, {nombre:element,contador:1}]
    });

    
    if(respuesta.statusText == "OK"){
        if(respuesta.data.amigos.length === 0){
            createMorePhoto();
            return;
        }
        elementos(respuesta);
    }else{
        console.log(respuesta);
    }
}

const observer = new IntersectionObserver(cal);
observer.observe(load);