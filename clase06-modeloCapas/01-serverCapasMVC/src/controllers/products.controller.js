import { ProductsDAO } from "../dao/ProductsDAO.js"
import { manejaErrores } from "../utils.js"

const productsDAO=new ProductsDAO()

export const getProducts=async(req,res)=>{

    try {
        // let productos="listado productos"
        let productos=await productsDAO.getAll()

        res.setHeader('Content-Type','application/json')
        res.status(200).json({productos})
    } catch (error) {
        manejaErrores(res, error)
    }    

}

export const createProduct=async(req,res)=>{
    let {title, price, stock} =req.body
    if(!title || !price || !stock){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete todos los datos`})
    }

    // validaciones pertinentes, procesamiento de datos, formateo de datos, etc
    title=title.toUpperCase()
    
    try {
        // let newProduct=`Nuevo producto: ${title}`
        let newProduct=await productsDAO.create({title, price, stock})
    
        res.setHeader('Content-Type','application/json')
        res.status(201).json({newProduct})
    } catch (error) {
        manejaErrores(res, error)
    }
}