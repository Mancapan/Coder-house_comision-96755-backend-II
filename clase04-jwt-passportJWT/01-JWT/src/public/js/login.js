const divMensajes=document.getElementById("divMensajes")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

const divDatos=document.getElementById("divDatos")
const btnDatos=document.getElementById("btnDatos")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 
    if(!email || !password){
        divMensajes.textContent="correo | contraseña son requeridos"
        setTimeout(() => {
            divMensajes.textContent=""
        }, 3000);
        return 
    }

    let response=await fetch("/login", {
        method: "post", 
        headers: {
            "Content-Type":"application/json"
        }, 
        body: JSON.stringify({email, password})
    })
    if(response.status>=400){
        let {error}=await response.json()
        divMensajes.textContent=error
        setTimeout(() => {
            divMensajes.textContent=""
        }, 3000);        
    }else{
        let {token, usuarioLogueado}=await response.json()
        
        divMensajes.textContent=`Login exitoso para ${usuarioLogueado.nombre}`
        localStorage.setItem("token", token)
    }



})

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    const response=await fetch("/usuario", {
        headers:{
            "authorization":`BEARER ${localStorage.getItem("token")}`
        }
    })
    if(response.status>=400){
        let {error}=await response.json()
        divDatos.textContent=error
        setTimeout(() => {
            divDatos.textContent=""
        }, 3000);          
    }else{
        let {datosUsuario}=await response.json()
        divDatos.textContent=JSON.stringify(datosUsuario)
    }
})