const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { getUsuarios ,crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();

/**
 * ruta incial ===> /api/usuarios
 */

router.get( '/',validarJWT, getUsuarios );

router.post( '/',
     [ 
            check('nombre','EL NOMBRE ES OBLIGATORIO').not().isEmpty(),
            check('password','EL PASSWORD ES OBLIGATORIO' ).not().isEmpty(),
            check('email','EL EMAIL ES OBLIGATORIO').isEmail(),
            validarCampos,
     ], 
     crearUsuario );

router.put('/:id',
    [
        validarJWT,
        check('nombre','EL NOMBRE ES OBLIGATORIO').not().isEmpty(),
        check('email','EL EMAIL ES OBLIGATORIO').isEmail(),
        check('role','EL ROLE ES OBLIGATORIO' ).not().isEmpty(),
        validarCampos 
    ],
    actualizarUsuario );

router.delete('/:id',validarJWT, borrarUsuario);

module.exports = router;