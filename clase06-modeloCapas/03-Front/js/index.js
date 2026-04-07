const divDatos=document.getElementById("divDatos")
const btnDatos=document.getElementById("btnDatos")

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    try {
        let response=await fetch("http://localhost:3000/api/products", )
        if(response.status>=400){
            let {error}=await response.json()
            divDatos.textContent=error
        }else{
            let {productos}=await response.json()
            divDatos.textContent=JSON.stringify(productos)
        }
    } catch (error) {
        divDatos.textContent=error.message
    }

})