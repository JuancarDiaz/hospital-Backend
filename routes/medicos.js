const { Router } = require('express');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');



const { getMedicos, crearMedico, ActualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get( '/', [] , getMedicos );

router.post( '/',
     [
        validarJWT ,
        check('nombre', 'nombre del nuevo medico es obligatorio').not().isEmpty(),
        check('hospital', 'el ID del Hospital al que pertenece el medico es obligatorio').not().isEmpty(),
        check('hospital', 'el ID del Hospital deve ser valido').isMongoId(),
        validarCampos
    ] ,
     crearMedico );

router.put( '/:id', [] , ActualizarMedico );

router.delete( '/:id', [] , borrarMedico );




module.exports = router;