import passport from "passport"
import passportJWT from "passport-jwt"
import { config } from "./config.js"

const buscarToken=req=>{
    let token=null

    if(req.cookies.cookietoken) token=req.cookies.cookietoken

    return token
}

export const iniciarPassport=()=>{

    passport.use(
        "current", 
        new passportJWT.Strategy(
            {
                secretOrKey: config.SECRET, 
                jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
            }, 
            async (usuario, done)=>{
                try {
                    // return done(null, false, {message:"info del error"})
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    // no uso sessions, no van...!!!
    // passport.serializeUser

}