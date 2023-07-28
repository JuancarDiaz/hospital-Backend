const { Response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = Response, next ) =>{

    const { email, password } = req.body;

    try{

        const usuariodb = await Usuario.findOne( { email } );

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


const googleSing = async ( req, res = Response, next ) => {

    
    
    try{

        const { token } = req.body;
        
        const { email, name, picture } = await googleVerify( token );

        const usuariodb = await Usuario.findOne({ email });

        let usuario;

        if( !usuariodb ) {

                usuario = new Usuario({

                    nombre: name,
                    email,
                    password: '@@@',
                    img: picture,
                    google: true
                });
        }else{

            usuario = usuariodb;
            usuario.google = true;
        }

        await usuario.save();

        const tokenJWT = await generarJWT( usuario.id );

        res.status( 200 ).json({
            ok: true,
            msg: 'autenticacion de google exitosa',
            email, name, picture ,
            tokenJWT
        });

    }catch( err ){

        console.log(err);

        res.status( 400 ).json({
            ok: false,
            msg: 'autenticacion TOKEN de google fallida',
        });
    }
}





const renewToken = async ( req, res = Response, next ) => {


    const { uid } = req;
console.log('uid',uid)

    try{

        const token = await generarJWT( uid );

        res.status( 200 ).json({
            ok: true,
            token
        });

    }catch(err){

        console.log(err);

        res.status( 400 ).json({
            ok: false,
            msg: 'error al renovar el token',
        });

    }
}





module.exports = { login, googleSing, renewToken };