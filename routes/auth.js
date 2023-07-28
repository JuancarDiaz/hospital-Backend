const { Router } = require('express');
const { login, googleSing, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();

router.post('/', 
     [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'La contraseña es obligatoria').not().isEmpty(),
            validarCampos
     ],
     login
);
router.post('/google', 
     [
            check('token', 'el token de google es obligatorio').not().isEmpty(),
            validarCampos
     ],
     googleSing
);

router.get('/renew', validarJWT, renewToken );
///api/login/google

module.exports = router;