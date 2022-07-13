const {model, Schema} = require('mongoose');


// El esquema de una base de datos describe la estructura de una base de datos, en un lenguaje formal soportado por un sistema de gestión de base de datos.
const UsuarioSchema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true, unique: true},
    contraseña: {type: String, required: true}
})


module.exports = model('usuarios', UsuarioSchema)