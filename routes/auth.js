//rutas con autenticación.
//deconstruccion!
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarUsuario } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//req, res se pueden definir como los controladores de la ruta

// ruta de la creacion de usuarios, en post y con la ruta /new
//añadimos un array de validadores en medio(middlewares)
router.post('/new', [
    check('name', "El campo nombre no puede estar vacío").not().isEmpty(),
    check('email', 'El mail es obligatorio').isEmail(),
    check('password', "El password es obligatorio").isLength({ min: 6 }),
    validarCampos
], crearUsuario);

//pagina del login en medio van los middlewares
//check, campo a checkear +  mensaje de error
//despues del check pones el punto(.) y salen más opciones!

router.post('/', [check('email', 'El mail es obligatorio').isEmail(),
    check('password', "El password es obligatorio").isLength({ min: 6 })
], loginUsuario);

//validar token

router.get('/renew', validarJWT, renovarUsuario);


//LOS CALLBACKS LOS MOVEMOS A CONTROLLERS Y LOS EXPORTAMOS







//exportaciones en node
module.exports = router;