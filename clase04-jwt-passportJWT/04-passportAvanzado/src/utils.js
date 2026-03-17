import {fileURLToPath} from 'url';
import { dirname } from 'path';

import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall=estrategia=>function (req, res, next) {
    passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }  // para passport.config return done(error)
        if (!user) { // para passport.config return done(null, user)
            // return res.redirect('/signin') 
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`${info.message?info.message:info.toString()}`})
        } 
        // res.redirect('/account');
        req.user=user
        next()
    })(req, res, next);
}



