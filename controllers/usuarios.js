const Usuario = require('../models/usuario');
const { Response } = require('express');
const bcryptjs = require('bcryptjs');
const { isValidObjectId } = require('mongoose');
const { generarJWT } = require('../helpers/jwt');


// OBTENER TODOS LOS USUARIOS:
 const getUsuarios = async (req, res, next)=>{
     
    const desde = Number( req.query.desde ) || 0;


    /**
     * OPTIMIZACION PARA USO AWAIT (la promesa asincrona hasta quen no se resuelve no pasa a la siguiente linea)
     * Y POR CONSECUENCIA PUEDE DEMORAR MUCHO TIEMPO EN PROCESAR AMBAS PETICIONES Y REGRESAR LA RESPUESTA
     */
    // const usuarios = await Usuario.find( {},'nombre google email google')   // busca todos los Usuarios y extrae solo esos campos
    //                               .skip( desde )                            // donde empieza a obtener datos
    //                               .limit( 5 )                               // hasta donde (limite 5 registros)

    // // contar total de registros de esa colleccion:
    // const total = await Usuario.count();


    const [usuarios, total] = await Promise.all([
      
        Usuario.find( {},'nombre google email google img')   
                                      .skip( desde )                            
                                      .limit( 5 )
        ,
        
        Usuario.countDocuments()
        
        ,

    ]);

    res.status(200).json({
        ok:true,
        usuarios,
        total
    })
}




// CREAR USUARIO
const crearUsuario = async(req, res = Response, next)=>{

const { email, nombre, password } = req.body;

try{
    
            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ) return res.status(400).json({
                                                         ok:false,
                                                         msg:' EMAIL O PASSWORD DUPLICADAS' 
                                                        }) // RETURN PARA QUE SALGA DEL METODO CUANDO ENVIE LA RESPUESTA



            // creamos usuario                                           
            const usuario = new Usuario( req.body );
                                                        
            // encriptar Pass                                                
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( password, salt );
                                                        
            // almacenar Usuario                                                
            await usuario.save();

            // GENERAR TOKEN
            const token = await generarJWT( usuario._id );


            console.log(email,password,nombre);

                res.status(200).json({
                    ok: true,
                    usuario,
                    token,
                    uid: req.uid
                });

}catch(err){

            console.log(err);
            res.status(200).json({
                ok:false,
                msg:'error inesperado revisar logs'
            })
}
}




// ACTUALIZAR USUARIO
const actualizarUsuario = async(req, res = Response, next)=>{

    const  uid  = req.params.id 

    try{

        if ( !isValidObjectId(uid) ) {

            return res.status(404).json({
                ok: false,
                msg: `id ${ uid } de mongo no es valido`
            });
        }



        const usuariodb = await Usuario.findById( uid );

        console.log('usuariodb...',usuariodb)

        if( !usuariodb ){ 

            return res.status(404).json({
                                            ok: false,
                                            msg: 'NO EXISTE UN USUARIO CON ESE ID'
                                        });
        }


        // ACTUALIZACIONES

        const { password, google, email, ...campos} = req.body;

        
        if( usuariodb.email !== req.body.email){
          
            // quiere poner un nuevo email pero es el de otro usuario
            const existeEmail = await Usuario.findOne({email});

                if( existeEmail ){

                    return res.status(400).json({ ok:false, msg:'YA EXISTE UN USUARIO CON ESE EMAIL'});
                }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos ,{ new:true } );



        res.json({
            ok:true,
            usuario: usuarioActualizado,
            uid: req.uid
        })

    }catch(err){

  
            console.log('Errores de validación:', err);
         

  

        res.status(400).json({
                
                ok:false,
                msg:'error al actualizar usuario'
        });
    }
}




// BORRAR USUARIO
const borrarUsuario = async( req, res = Response, next ) =>{

    const id = req.params.id;

    try{

        const userBorrado = await Usuario.findByIdAndRemove( id );

        console.log( 'userBorrado --->', userBorrado );


        if( userBorrado ){

            res.status( 200 ).json({
                ok: true,
                msg:' EL BORRADO HA SIDO SATISFACTORIO',
            });
        }else{

            res.status( 200 ).json({
                ok: true,
                msg:'NO EXISTE UN USUARIO CON ESE ID ',
                uid: req.uid
            });

        }



    }catch( err ){

        console.log('ERROR BORRADO ==> ',err);


        res.status( 400 ).json({
            ok: false,
            msg:' ERROR EN EL BORRADO',
        });

    }

}






module.exports = {

    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}