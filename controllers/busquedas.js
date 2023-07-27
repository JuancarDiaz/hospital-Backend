const { Response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const getTodo = async ( req, res = Response, next) =>{

    const busqueda = req.params.busqueda.trimStart().trimEnd();

    const regex = new RegExp( busqueda, 'i' );

    const [usuarios, medicos, hospitales ] = await Promise.all([

        Usuario.find( { nombre: regex } ),

        Medico.find( {nombre: regex }),

        Hospital.find( {nombre: regex}),
    ])
    


    try{

        res.status( 200 ).json({

                            ok: true,
                            msg: 'filtro de busqueda realizado con exito',
                            usuarios,
                            medicos,
                            hospitales,
                    });

    }catch( err ){

        console.log('ERROR AL REALIZAR LA BUSQUEDA ...', err )

        
        res.status( 200 ).json({

            ok: true,
            msg: 'filtro ERROR'
        });


    }
}




const getDocumentosColleccion = async ( req, res = Response, next) =>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda.trimStart().trimEnd();

    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    try{

    switch ( tabla ) {

        case 'hospitales':

                data = await Hospital.find( { nombre: regex } ).populate( 'usuario', 'nombre img')
                                                              
            
            break;
        
        case 'medicos':
            
                data = await Medico.find( {nombre: regex }).populate( 'nombre', 'nombre img')
                                                           .populate( 'hospital', 'nombre img');

            break;
        
        case 'usuarios':
            
                data = await Usuario.find( { nombre: regex } )
        
            break;
    
        default:

                return  res.status( 400 ).json({

                        ok: false,
                        msg: 'la tabla tiene que ser usuarios/medicos/hospitales',     
                    });
    }




        res.status( 200 ).json({

                            ok: true,
                            msg: 'filtro de busqueda realizado con exito',
                            data
                    });

    }catch( err ){

        console.log('ERROR AL REALIZAR LA BUSQUEDA ...', err )

        
        res.status( 200 ).json({

            ok: true,
            msg: 'filtro ERROR'
        });


    }
}

module.exports = { getTodo, getDocumentosColleccion }