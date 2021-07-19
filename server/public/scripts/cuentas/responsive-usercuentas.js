'use strict';
window.addEventListener("load",e=>{
    divBorderCamaraIcono.style.left = `${(imageIcono.clientWidth-(divBorderCamaraIcono.clientWidth/3))}px`;
    containerCamara.style.top =`${(backgroundHeight.clientHeight +cabecera.clientHeight - divBorderCamara.clientHeight -62)}px`;
    containerCamara.style.right = `${(((document.body.offsetWidth-background.clientWidth) /2)+12)}px`;
});

window.addEventListener("resize",e=>{ 
    divBorderCamaraIcono.style.left = `${(imageIcono.clientWidth-(divBorderCamaraIcono.clientWidth/3))}px`;
    containerCamara.style.top =`${(backgroundHeight.clientHeight +cabecera.clientHeight - divBorderCamara.clientHeight -62)}px`;
    containerCamara.style.right = `${(((document.body.offsetWidth-background.clientWidth) /2)+12)}px`;
});

