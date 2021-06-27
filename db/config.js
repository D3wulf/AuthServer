const mongoose = require("mongoose");

const dbConnection = async() => {


    try {
        //para la conexion, la url de conexion, el callback y los use son propios de mongoose

        await mongoose.connect(process.env.DB_CNN, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online ok')

    } catch (error) {


        console.log(error);
        throw new Error('Error al iniciar las Base de datos');
    }



}
module.exports = { dbConnection }