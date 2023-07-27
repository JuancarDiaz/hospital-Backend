const { Router } = require('express');
const router = Router();
const { getTodo, getDocumentosColleccion } = require('../controllers/busquedas');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { check } = require('express-validator');

router.get('/:busqueda', validarJWT, getTodo );

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColleccion );



module.exports = router;