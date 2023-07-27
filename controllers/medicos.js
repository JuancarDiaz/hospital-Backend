const { Response } = require('express');
const Medico = require('../models/medicos');
const Usuario = require('../models/usuario');
// OBTENER TODOS LOS MEDICOS
const getMedicos = async ( req, res = Response, next ) =>{

    try{

        const medicos = await Medico.find()
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img')

        res.status( 200 ).json({

                        ok:true,
                        msg: 'GET MEDICOS OK',
                        medicos
                    });

    }catch( err ){


        console.log('ERROR OBTENER MEDICOS ',err);

        res.status( 200 ).json({

            ok:true,
            msg: 'GET MEDICOS OK'
        });

    }


    
}


// CREAR MEDICO
const crearMedico = async ( req, res = Response, next ) =>{

    try{

        const uid = req.uid;

        const newMedico = new Medico({ ...req.body, usuario: uid });

        const savedMedico = await newMedico.save();

        res.status( 200 ).json({

                        ok:true,
                        msg: 'CREAR MEDICOS OK',
                        savedMedico
                    });

    }catch( err ){


        console.log('ERROR CREAR MEDICOS ',err);

        res.status( 200 ).json({

            ok:true,
            msg: 'ERROR AL CREAR MEDICO'
        });

    }


    
}


// ACTUALIZAR MEDICO
const ActualizarMedico = async ( req, res = Response, next ) =>{

    try{

        res.status( 200 ).json({

                        ok:true,
                        msg: 'ACTUALIZAR MEDICOS OK'
                    });

    }catch( err ){


        console.log('ERROR ACTUALIZAR MEDICOS ',err);

        res.status( 200 ).json({

            ok:true,
            msg: 'ACTUALIZAR MEDICOS OK'
        });

    }


    
}



// BORRAR MEDICO
const borrarMedico = async ( req, res = Response, next ) =>{

    try{

        res.status( 200 ).json({

                        ok:true,
                        msg: 'BORRAR MEDICOS OK'
                    });

    }catch( err ){


        console.log('ERROR BORRAR MEDICOS ',err);

        res.status( 200 ).json({

            ok:true,
            msg: 'BORRAR MEDICOS OK'
        });

    }


    
}



module.exports = { getMedicos, crearMedico, ActualizarMedico, borrarMedico }

