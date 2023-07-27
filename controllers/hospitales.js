const { Response } = require('express');
const Hospital = require('../models/hospital');

// OBTENER TODOS LOS HOSPITALES
const getHospitales =  async ( req, res = Response, next )=>{

    try{

        const hospitales = await Hospital.find()
                                         .populate('usuario','nombre img');

        res.status( 200 ).json({

            ok: true,
            msg: 'crear Hospital correcto',
            hospitales
        });

    }catch(err){

        console.log('ERROR OBTENER HOSPITAL ',err);

        res.status( 200 ).json({

            ok: true,
            msg: ' ERROR OBTENER Hospital'
        });

    }
} 

// CREAR HOSPITAL
const crearHospital = async ( req, res = Response, next )=>{

    try{

        const uid = req.uid;
       
        const hospital = new Hospital( { ...req.body ,usuario: uid} );

        const hospitalSaved = await hospital.save();

        
        res.status( 200 ).json({

            ok: true,
            msg: 'CREAR Hospital correcto',
            hospital

        });

    }catch(err){


        console.log('ERROR CREAR HOSPITAL ',err);

        res.status( 500 ).json({

            ok: true,
            msg: 'ERROR CREAR Hospital hable con el administrador'
        });
    }
} 


// ACTUALIZAR HOSPITALES
const actualizarHospital = async ( req, res = Response, next )=>{

    try{

        
        res.status( 200 ).json({

            ok: true,
            msg: 'actualizar Hospital correcto'
        });

    }catch(err){

        console.log('ERROR ACTUALIZAR HOSPITAL ',err);

        res.status( 200 ).json({

            ok: true,
            msg: ' ERROR ACTUALIZAR Hospital'
        });
    }
} 


// BORRAR HOSPITAL
const borrarHospital = async ( req, res = Response, next )=>{

    try{

        
        res.status( 200 ).json({

            ok: true,
            msg: 'BORRAR Hospital correcto'
        });

    }catch(err){

        console.log('ERROR BORRAR HOSPITAL ',err);

        res.status( 200 ).json({

            ok: true,
            msg: ' ERROR BORRAR Hospital'
        });
    }
} 


module.exports = { getHospitales, crearHospital, borrarHospital, actualizarHospital }