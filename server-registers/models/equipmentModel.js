const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    idproducto: { type: Number },
    categoria: { type: String },
    descripcion: { type: String },
    estado: { type: String },
    serial: { type: Number },
    mac: { type: Number },
    fecha: { type: String},
    mantenimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'Mantenimientos',
        autopopulate: true
    }]
});

EquipmentSchema.plugin(require('mongoose-autopopulate'));
module.exports = Equipment = mongoose.model('Equipos', EquipmentSchema);