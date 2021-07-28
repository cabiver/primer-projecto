let canload=true;
let limit = false;
let contador=0;

const load = document.getElementById("cuentas.js-detectar_cuando_es_observado");

const cal=async ()=>{
    if(!canload) {
        return;
    }
    canload = false;
    let respuesta = await axios.post("/UltimosPost",{
        cont:contador,
    });
    console.log(respuesta);
    // if(respuesta.statusText == "OK"){
    //     if(respuesta.data.content.length === 0){
    //         createMorePhoto();
    //         return;
    //     }
    //     elementos(respuesta);
    // }else{
    //     console.log(respuesta);
    // }
}

const observer = new IntersectionObserver(cal);
observer.observe(load);