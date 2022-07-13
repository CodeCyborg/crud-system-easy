// REQUIERE MONGOOSE PARA USAR SUS METODOS COMO FIND POR EJEMPLO (ENCONTRAR) Y EL SCHEMA
const mongoose = require('mongoose');
const Equipment = require('../models/equipmentModel');
const Maintenance = require('../models/maintenanceModel');

// A CONTINUACION; TODOS LOS METODOS PARA EL CRUD

// -- REGISTROS ---
const findAllEquipment = (req,res)=>{
    Equipment.find((err,equipment)=>{
        // status 500 si hay un error y si no un 200 con el json
        err && res.send(500).send(err.message);

        res.status(200).json(equipment);
    })
}

const findByIdEquipment = (req,res)=>{
    Equipment.findById(req.params.id, (err,equipment)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(equipment)
    })
}

const addEquipment = (req,res)=>{
    let EquipmentNew = new Equipment({
        idproducto: req.body.idproducto,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        serial: req.body.serial,
        mac: req.body.mac,
        fecha: req.body.fecha
    })

    EquipmentNew.save((err,equipmentnew)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(equipmentnew)
    })
}

const updateEquipment = (req,res,next)=>{
    Equipment.findOneAndUpdate({_id:req.params.id},{
        $set:{
            idproducto: req.body.idproducto,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
            serial: req.body.serial,
            mac: req.body.mac,
            fecha: req.body.fecha
        }
    })

    .then(result=>{
        res.status(200).json({
            updated_Equipment:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

const deleteEquipment = (req,res,next)=>{
    Equipment.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message: 'Equipment deleted',
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

// -- MANTENIMIENTOS --

const findAllMaintenance = async (req,res)=>{
    // buscar el registro y poblar el arreglo de mantenimientos del registro
    const maintenance = await Equipment.findById(req.params).populate('mantenimientos')
    res.send(maintenance)

}

const addMaintenance = async (req,res)=>{
    // Crear mantenimiento
    const newMaintenance = new Maintenance(req.body)
    // Buscar el registro para asignar mantenimiento
    let equipoId = await Equipment.findById(req.params)
    // asignar al registro como su mantenimiento
    // newMaintenance.equipo = equipoId
    // asignar el mantenimiento dentro del array mantenimientos del registro
    equipoId.mantenimientos.push(newMaintenance) 
    // guardar el registro con el nuevo mantenimiento
    await equipoId.save()
    // guardar mantenimiento para el registro
    await newMaintenance.save()
    // enviar al registro el mantenimiento 
    res.send(newMaintenance)
}
// añadir listo

const updateMaintenance = (req,res,next)=>{
    Maintenance.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            fecha: req.body.fecha,
            tipo_mantenimiento: req.body.tipo_mantenimiento,
            descripcion: req.body.descripcion,
            costo: req.body.costo,
            responsable: req.body.responsable,
            entidad: req.body.entidad,
            proximo: req.body.proximo,
        }
    })

    .then(result=>{
        res.status(200).json({
            updated_Maintenance:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

// update listo

const deleteMaintenance = async (req, res)=>{
    Maintenance.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message: 'Maintenance deleted',
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}




module.exports = { findAllEquipment, findByIdEquipment, addEquipment, updateEquipment, deleteEquipment, findAllMaintenance, addMaintenance, updateMaintenance ,deleteMaintenance };