const { Response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = Response, next ) =>{

    const errores = validationResult( req ); 

    if( !errores.isEmpty() ){  // array de errores con todos los errores 

        return res.status(400).json({

                                    ok: false,
                                    errors: errores.mapped(), // CONJUNTO DE ERRORES
                                })
    }

    next(); // TODO OK, PASAMOS AL SIGUIENTE MIDDELWARE
}

module.exports = {validarCampos}