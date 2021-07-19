let pass = true;
const see = document.getElementById("see");
see.addEventListener("click", (e)=>{
    if(pass){
        document.getElementById("password").type = "text";
        pass=false;
    }else{
        document.getElementById("password").type = "password";
        pass=true;
    } 
});