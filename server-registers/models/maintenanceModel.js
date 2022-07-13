const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({
    fecha: String,
    tipo_mantenimiento: String ,
    descripcion: String,
    costo: String ,
    responsable: String,
    entidad: String,
    proximo: String
});

MaintenanceSchema.plugin(require('mongoose-autopopulate'));
module.exports = Maintenance = mongoose.model('Mantenimientos', MaintenanceSchema);