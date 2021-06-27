const { Schema, model } = require("mongoose");

//schema se ejecuta con ciertos argumentos.
const usuarioSchema = Schema({

    name: {

        type: String,
        required: true


    },
    email: {

        type: String,
        required: true,
        unique: true


    },
    password: {

        type: String,
        required: true


    },


});
//primero nombre del modelo(del archivo) + schema
module.exports = model('Usuario', usuarioSchema);