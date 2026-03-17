import passport from "passport"
import passportJWT from "passport-jwt"
import { config } from "./config.js"

const buscarToken=req=>{
    let token=null

    if(req.cookies.token){
        token=req.cookies.token
    }

    return token
}

export const initPassport=()=>{

    // paso 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: config.SECRET, 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async(contenidoToken ,done)=>{ // contenidoToken o usuario
            try {
                // return done(null, false)   // return  2)
                if(contenidoToken.nombre=="Juan"){
                    return done(null, false, {message: `El usuario Juan tiene el acceso temporalmente inhabilitado. Contacte a RRHH.`})
                }
                return done(null, contenidoToken)   // return 3)
            } catch (error) {
                return done(error)   // return 1
            }
        }
    ))


    passport.use("jwt", new passportJWT.Strategy(
        {
            secretOrKey: config.SECRET, 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async(contenidoToken ,done)=>{ // contenidoToken o usuario
            try {
                // return done(null, false)   // return  2)
                return done(null, contenidoToken)   // return 3)
            } catch (error) {
                return done(error)   // return 1
            }
        }
    ))



    // paso 1' o 1bis // solo si usamos sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}