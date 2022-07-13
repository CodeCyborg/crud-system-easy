// libreria de cifrado/encriptacion de contraseñas, es una función de hashing de passwords.
const bcrypt = require('bcrypt');
// requerimos el modelo de Usuario
const Usuario = require('../models/usuario');


// Registrar Usuario
const register = async (req, res) => {

  // obtenemos el nombre, correo, ontraseña del cuerpo del requerimiento 
  const { nombre, correo, contraseña } = req.body;

  Usuario.findOne({ correo }).then((usuario) => {
    // si usuario existe mandamos un json
    if (usuario) {
      return res.json({ mensaje: "Ya existe un usuario con ese correo" });
    } else if (!nombre || !correo || !contraseña) {
      return res.json({ mensaje: "Falta el nombre / correo / contraseña" });
    } else {
      //documentacion de bcrypt, (le pasamos la contraseña, 10 digitos para el hasheo, un posible error y la contrasela hasheada)
      bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
        if (error) res.json({ error });
        else {
          const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña: contraseñaHasheada,
          });
          
          nuevoUsuario
          .save()
          .then((usuario) => {
            res.json({ mensaje: "Usuario creado correctamente", usuario, token, auth: true });
          })
          .catch((error) => console.error(error));
        }
      });
    }
  });
};

module.exports = register;