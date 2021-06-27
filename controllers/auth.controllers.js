const { validationResult } = require("express-validator");
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res) => {

    //Nos llevamos la logica al middleware que hemos creado (validar-campos)

    //creacion de usuarios en vid 362 //postman, body/raw/json quedara en el req.body
    console.log(req.body);
    //cuando los creemos podemos desestructurarlos
    const { name, email, password } = req.body;
    try {

        //Verificacion de email
        const usuario = await Usuario.findOne({ email })

        //Comprueba si el usuario ya existe
        if (usuario) {
            return res.status(400).json({

                ok: false,
                msg: 'Usuario existe//Mail usado'
            });
        }

        //Crear usuario con el modelo

        const dbUser = new Usuario(req.body);



        //Hash contraseña

        const salt = bcrypt.genSaltSync();

        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUser.id, name);

        //Crear usuario bbdd

        await dbUser.save();
        //Generar respuesta exitosa

        return res.status(200).json({

            ok: true,
            uid: dbUser.id,
            name: name,
            email,
            token


        })

    } catch (error) {
        return res.status(500).json({

            ok: false,
            msg: 'Fallo, contacte con el administrador'
        });

    }




}

const loginUsuario = async(req, res) => {

    //AQUI DEJAMOS LA VALIDACION PARA COMPRENDER LOS PASOS

    //de express validators, aqui guarda los errores
    const errors = validationResult(req);
    //si los errores no están vacios
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            //te manda un json de los errores que estan en la ruta auth
            errors: errors.mapped()
        });
    }

    const { email, password } = req.body;


    try {
        //es otra constante dbuser
        const dbUSer = await Usuario.findOne({ email })
        if (!dbUSer) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no existe"
            });
        }

        //confirmar si el pass coincide
        const validPassword = bcrypt.compareSync(password, dbUSer.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "El password no es válido"
            });
        }

        // Generar el JWT

        const token = await generarJWT(dbUSer.id, dbUSer.name);

        //respuesta del servicio
        return res.json({

            ok: true,
            uid: dbUSer.uid,
            name: dbUSer.name,
            email,
            token

        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, hable con el admin"
        });

    }


    // console.log(email, password);

    // return res.json({

    //     ok: true,
    //     msg: 'Página del login'
    // });

}
const renovarUsuario = async(req, res) => {

    const { uid } = req;
    //leer bbdd
    const dbUser = await Usuario.findById(uid);



    // Generar el JWT
    const token = await generarJWT(uid, dbUser.name);

    return res.json({

        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token

    });

}


module.exports = {
    crearUsuario,
    loginUsuario,
    renovarUsuario
}