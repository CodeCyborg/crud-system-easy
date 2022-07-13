// libreria de cifrado/encriptacion de contraseñas, es una función de hashing de passwords.
const bcrypt = require('bcrypt')
// requerimos el modelo del Usuario
const Usuario = require('../models/usuario')
// json web token para la creacion de tokens de seguridad, lo usare para el login
const jwt = require('jsonwebtoken');

const login = async (req,res) => {

    // obtenemos el correo y ontraseña del cuerpo del requerimiento 
    const {correo,contraseña} = req.body;

    Usuario.findOne({correo}).then((usuario)=>{
        if(!usuario){
            return res.json({mensaje: "Usuario no encontrado"})
        }

        bcrypt.compare(contraseña, usuario.contraseña).then((esCorrecta)=>{
            if(esCorrecta){
                const {id,nombre} = usuario;

                const data = {
                    id, nombre
                };

                // clave es 'secret'
                const token = jwt.sign(data, 'secret', {
                    expiresIn: 86400 //expira en 24 horas
                })

                res.json({
                    mensaje: "Usuario logueado correctamente", 
                    usuario:{
                        id,
                        nombre,
                        token
                    }
                })
            }else{
                return res.json({mensaje: "Contraseña incorrecta"})
            }
        })
    })
}

module.exports = login;