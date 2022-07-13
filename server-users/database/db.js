const mongoose = require('mongoose');
// dotenv para el archvo .env con las variables de entorno
require('dotenv').config();


const db = async () =>{
    await mongoose.connect(process.env.MONGODB_URI_LOGIN)
    .then(()=> console.log("MONGODB ONLNE"))
    .catch(error => console.error(error))

}

module.exports = db;