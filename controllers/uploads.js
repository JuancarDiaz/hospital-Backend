const { Response }  = require('express');
const { v4: uuidv4, mv } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');



const fileUpload = ( req, res = Response, next ) =>{


    const { tipo, id } = req.params

    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];

    
    try{

            // validar tipo
            if( !tiposPermitidos.includes(tipo) ){

                return res.status( 400 ).json({
                                                ok: false,
                                                msg: 'el tipo deve de ser hospitales o medicos o usuarios'
                                            });
            }


            // validamos que exista el archivo
            if( !req.files || Object.keys(req.files).length === 0 ){

                return res.status( 400 ).json({
                    ok: false,
                    msg: 'no se ha mandado el archivo necesario'
                });
            }

            // procesar la imagen...
            const file = req.files.imagen;
           
            const nombreCortado = file.name.split('.');
            
            const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

            // validar extension:
            const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

            if( !extensionesValidas.includes( extensionArchivo )){
             
                return res.status( 400 ).json({
                    ok: false,
                    msg: 'no es una extensión permitida'
                });
            }

            // generar el nombre del archivo
            const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`

          
            // crear el path para guardar la imagen

            const ruta = path.join( '..', 'uploads', tipo, nombreArchivo );

            const rutaRelativa = path.resolve(__dirname, ruta);

            
            // mover la imagen
            file.mv( rutaRelativa, (err) => {

                if( err ){

                    console.log(err);
                    return res.status(500).json({ok: false,msg: 'Error al mover la imagen'});
                }


                // actualizar base de datos
                actualizarImagen( tipo, id, nombreArchivo );

                res.status( 200 ).json({
                    ok: true,
                    msg: 'subida de archivos ok',
                    nombreArchivo
                });

            })

        
           


    }catch( err ){

        
        res.status( 500 ).json({
            ok: true,
            msg: 'Error de archivos'
        });
    }

}


const retornaImagen = ( req, res = Response, next ) =>{

    const { tipo, foto } = req.params;

    let rutaRelativaImg;
    let ruta ;

    ruta = path.join( '..', 'uploads', tipo, foto  );
    rutaRelativaImg = path.resolve(__dirname, ruta);

    console.log('RUTA--->',ruta)
    if( fs.existsSync( rutaRelativaImg ) ){
    
        res.sendFile( rutaRelativaImg );
       
    }else{

       ruta = path.join( '..', 'uploads', 'nodisponible.png'  );
    
       rutaRelativaImg = path.resolve(__dirname, ruta);

       res.sendFile( rutaRelativaImg );git 
    }

    


}

module.exports = { fileUpload, retornaImagen }