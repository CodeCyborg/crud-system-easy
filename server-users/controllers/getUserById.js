// requerimos el modelo Usuario
const Usuario = require("../models/usuario");

// Controlador para obtener un usuario por el id
const getUserById = async (req, res) => {

  // destructuramos y obtenemos el id de req.user
  const { id } = req.user;

  if (id.length === 24) {
    Usuario.findById(id).then((usuario) => {
      if (!usuario) {
        return res.json({
          mensaje: "No se encontro ningun usuario con esa ID",
        });
      } else {

        // destructuramos y hacemos uso de spread operator para hacer copia del resto de datos del usuario y eso es lo que mandaremos. ( no mandamos la contraseña ni el id)
        const { _id, contraseña, __v, ...resto } = usuario._doc;
        res.json(resto);
      }
    });
  } else {
    res.json({ mensaje: "Estas enviando una contraseña incorrecta" });
  }
};


module.exports = getUserById;