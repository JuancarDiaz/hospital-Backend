const { Response } = require('express');
const usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const login = async ( req, res = Response, next ) =>{

    const { email, password } = req.body;

    try{

        const usuariodb = await usuario.findOne( { email } );

        // VERIFICAR EMAIL
        if( !usuariodb ){
        
            return res.status(200).json({
                        ok: false,
                        msg: 'NO EXISTE USUARIO CON ESE EMAIL'
                    });
        }

        // VERIFICAR PASSWORD
        const validarPassword = bcryptjs.compareSync( password, usuariodb.password );

        if( !validarPassword ){
 
               return res.status(200).json({
                    ok: true,
                    msg: 'CONTRASEÑA INCORRECTA'
                });
        }

        // OK!
        // GENERAR TOKEN JWT ( necesitamos que sea sicrono ) con el await esperamos a que se resuelva la promesa
        const token = await generarJWT( usuariodb._id );    

        // TODO OK
        res.status(200).json({
                                ok: true,
                                msg: 'LOGIN CORRECTO',
                                token
                            });

    }catch( err ){

        console.log('ERROR LOGIN ===> ',err);

        res.status(200).json({
            ok: false,
            msg: 'LOGIN INCORRECTO'
        })

    }
}

module.exports = { login };