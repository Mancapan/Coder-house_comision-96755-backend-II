import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const auth=(req, res, next)=>{
    // if(req.session.usuario){

    // }

    // if(!req.headers.authorization){
    if(!req.cookies.token){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // BEARER TOKEN      BEARER adsfasdfas.adsasdf99adfsadf.asdfasdf9asfd9asdf9
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.token

    try {
        let usuario=jwt.verify(token, config.SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Error: ${error.message}`})
    }

    next()
}