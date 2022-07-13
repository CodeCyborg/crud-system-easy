// REQUERIMOS EL MODULO USERCONTROLLER QUE CONTIENE LAS FUNCIONES CRUD
const registersController = require('../controllers/registersController');
const express = require('express');
// REQUERIMOS EXPRESS.ROUTER Un método de ruta se deriva de uno de los métodos HTTP 
const router = express.Router();

// Rutas Equipos
router.get("/all", registersController.findAllEquipment);
router.get("/:id", registersController.findByIdEquipment);
router.post("/add", registersController.addEquipment);
router.put("/update/:id", registersController.updateEquipment);
router.delete("/delete/:id", registersController.deleteEquipment);

// Rutas Mantenimientos
router.get("/all/maintenance/:_id", registersController.findAllMaintenance);
router.post("/add/maintenance/:_id", registersController.addMaintenance);
router.put("/update/maintenance/:id", registersController.updateMaintenance);
router.delete("/delete/maintenance/:id", registersController.deleteMaintenance);


module.exports = router;