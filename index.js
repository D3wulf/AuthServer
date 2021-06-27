const express = require('express');
const cors = require('cors');
//para arreglar angular en node, el tema de las recargas de pagina
const path = require('path');


const { dbConnection } = require('./db/config');
//para que use el archivo .env
require('dotenv').config();
//PARA LAS VARIABLES DE ENTORNO por eso instalamos el dotenv
// process.env



// creacion del servidor // aplicacion express

const app = express();



//directorio publico, queremos que busque en la carpeta public
app.use(express.static('public'));

//Base de datos
dbConnection();

//cors es otro middleware

app.use(cors());

//lectura y parseo del body, otro middleware

app.use(express.json());

//Rutas (middleware) que vendran desde el archivo auth
//el use es el middleware, usa el require para importar las rutas
app.use('/api/auth', require('./routes/auth'));

//Manejar el resto de rutas ( por meter angular )

app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'public/index.html'));

})

//listen, puerto , callback
app.listen(process.env.PORT, () => {

    console.log(` Servidor ok, funcionando en el puerto ${process.env.PORT} `)
});