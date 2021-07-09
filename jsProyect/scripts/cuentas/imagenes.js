'use strict';

    const formulario = document.getElementById("formImg");
    const file = document.getElementById("file");
    const relleno = document.getElementById("full");
    const img=  document.getElementById("aqui")
    
    var archivo = null;

    formulario.addEventListener('submit', e=>{
        e.preventDefault();
        let formdata = new FormData(formulario);
        const file  =formdata.get('image')
        axios.post('/imagenes', formdata)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
          
    })
    
    file.addEventListener("change",e=>{
        let formdata = new FormData(formulario);
        const file  =formdata.get('image');
        const image = URL.createObjectURL(file);
        img.setAttribute('src',image);
    })