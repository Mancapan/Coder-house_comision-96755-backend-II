import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { config } from './config/config.js';
import { auth } from './middleware/auth.js';

import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { passportCall } from './utils.js';
const PORT = 3000;

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// paso 2
initPassport()
app.use(passport.initialize())
// app.use(passport.session())  // solo si usamos sessions

app.use(express.static("./src/public"))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send({ error: 'Ingrese todos los datos' })

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send({ error: `El usuario ${email} ya existe en la DB` })

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id,
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: 'Ingrese email y password' })

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email)
    if (!usuario) return res.status(400).send({ error: `Error credenciales` })

    if (!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({ error: `Error credenciales` })

    // req.session.usuario=usuario
    usuario = { ...usuario }
    delete usuario.password // hay que eliminar datos sensibles
    let token = jwt.sign(usuario, config.SECRET, { expiresIn: "1h" })

    res.cookie("token", token, { httpOnly: true })
    return res.status(200).json({
        usuarioLogueado: usuario,
        // token
    })

})


app.get("/error", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).json({ error: `Error al autenticar` })
})

app.get(
    '/usuario',
    // auth,
    // paso 3
    // passport.authenticate("current", { session: false, failureRedirect: "/error" }),
    passportCall("current"),
    (req, res) => {


        // si passport.authenticate sale OK, entonces passport 
        // deja un objeto user en la req: req.user

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario',
            datosUsuario: req.user   // viene dada por passport
        });
    }
);


// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }
//         if (!user) { return res.redirect('/signin') }
//         res.redirect('/account');
//     })(req, res, next);
// });

app.get(
    "/prueba", 
    passport.authenticate("jwt", {session:false}), 
    (req, res)=>{

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Ruta prueba - Usuario: ${req.user.nombre}`});
    }
)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
