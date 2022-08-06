// REQUERIMOS EL MODULO USERCONTROLLER QUE CONTIENE LAS FUNCIONES CRUD
const registersController = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');
const express = require('express');
// REQUERIMOS EXPRESS.ROUTER Un método de ruta se deriva de uno de los métodos HTTP 
const router = express.Router();

// Rutas Users
router.get("/user", verifyToken, registersController.getUserById);
router.post("/register", registersController.register);
router.post("/login", registersController.login);



module.exports = router;