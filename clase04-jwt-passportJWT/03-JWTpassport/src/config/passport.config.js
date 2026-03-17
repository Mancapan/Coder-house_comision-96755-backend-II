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
                // return done(null, false)
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))



    // paso 1' o 1bis // solo si usamos sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}