'use strict';


window.addEventListener("load",e=>{
    divBorderCamaraIcono.style.left = (imageIcono.clientWidth-(divBorderCamaraIcono.clientWidth/3))+"px";
    containerCamara.style.top =(backgroundHeight.clientHeight +cabecera.clientHeight - divBorderCamara.clientHeight -62)+"px"
    containerCamara.style.right = (((document.body.offsetWidth-background.clientWidth) /2)+12) + "px";
})

imageIcono.addEventListener("loadeddata",e=>{
    divBorderCamaraIcono.style.left = (imageIcono.clientWidth-(divBorderCamaraIcono.clientWidth/3))+"px";

})
background.addEventListener("loadeddata",e=>{
    containerCamara.style.right = (((document.body.offsetWidth-background.clientWidth) /2)+12) + "px"; + "px";
})

window.addEventListener("resize",e=>{
    
    divBorderCamaraIcono.style.left = (imageIcono.clientWidth-(divBorderCamaraIcono.clientWidth/3))+"px";
    containerCamara.style.top =(backgroundHeight.clientHeight +cabecera.clientHeight - divBorderCamara.clientHeight -62)+"px"
    containerCamara.style.right = (((document.body.offsetWidth-background.clientWidth) /2)+12) + "px";

})
//divBorderCamaraIcono.style.bottom = 0+"px";


//divBorderCamaraIcono.style.left = imageIcono.clientWidth+"px";

//divBorderCamaraIcono.style.bottom = imageIcono.clientHeight+"px";

