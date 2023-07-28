const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { actualizarHospital, borrarHospital, crearHospital, getHospitales} = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();

/**
 * ruta incial ===> /api/hospitales
 */

router.get( '/', validarJWT, getHospitales );

router.post( '/',
     [ 
            validarJWT,
            check('nombre', 'el nombre del usuario es requerido').not().isEmpty(),
            validarCampos
     ], 
     crearHospital );

router.put('/:id',
    [
           validarJWT,
            check('nombre', 'el nombre del usuario es requerido').not().isEmpty(),
            validarCampos
    ],
    actualizarHospital );

router.delete('/:id', validarJWT,  borrarHospital);

module.exports = router;