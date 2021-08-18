let canload=true;
let limit = false;
let amigosVisitados=[];
let infoVisitados ={};
let intentos = 0;
const load = document.getElementById("cuentas.js-detectar_cuando_es_observado");



function createImgVideo(element,ast) {
    let descrip = element.post.desc.split("█");
    let nars =document.createElement("div");
    let content =document.createElement("div");
    ast.setAttribute("src",element.post.postImg);
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
            if(!element.post){
                return;
            }
                let extencion = element.post.desc.split(".");
                if(extencion[(extencion.length-1)]=="mp4" ||extencion[(extencion.length-1)]=="avi"){
                    let ast = document.createElement("video");
                    ast.setAttribute("controls", "")
                    createImgVideo(element,ast)
                }else{
                    if(extencion[(extencion.length-1)]=="mp3" ||extencion[(extencion.length-1)]=="ogg"||extencion[(extencion.length-1)]=="wav"){
                        let ast = document.createElement("audio");
                        ast.setAttribute("controls", "");
                        createImgVideo(element,ast)
                    }else{
                        let ast = document.createElement("img");
                        createImgVideo(element,ast)
                    }
                }
               
        });
        actualizarDelete()
        setTimeout(() => {
            canload=true;
        }, 1500);
        
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
        amigosVisitados,
        infoVisitados,
    });
    console.log(respuesta);
    amigosVisitados =respuesta.data.arrayAmigos;

    
    if(respuesta.statusText == "OK"){
        if(respuesta.data.amigos.length === 0){
            intentos++;
            if(intentos >10){
                createMorePhoto();
                return;
            }
        }
        elementos(respuesta);
    }else{
        console.log(respuesta);
    }
}

const observer = new IntersectionObserver(cal);
observer.observe(load);