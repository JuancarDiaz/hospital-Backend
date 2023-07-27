const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const  expressFileUpload  = require('express-fileupload');

const router = Router();

router.use( expressFileUpload() ); // middleware para la captacion de archivos con paquete externo de express

/**
 * ruta incial ===> /api/uploads
 */



router.put( '/:tipo/:id',
     [ 
            validarJWT,
           // check('nombre', 'el nombre del usuario es requerido').not().isEmpty(),
           // validarCampos
     ], 
     fileUpload
      );

router.get( '/:tipo/:foto', validarJWT, retornaImagen )


module.exports = router;