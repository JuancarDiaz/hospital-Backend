const { Response } = require('express');
const  jwt  = require('jsonwebtoken')





const validarJWT = (req, res = Response, next) => {

    // LEER EL TOKEN
    const token = req.header('x-token');

    console.log('TOKEN => ', token );


    try{
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        console.log('UID',uid );

        req.uid = uid; // AÑADIMOS A LA REQUEST UNA NUEVA VARIABLE PARA EL USUARIO ACTIVO ( ESA PETICION ) disponible en el request para toda la peticion
                       // PARA EL RESTO DE FUNCIONES MIDDELWARES CON SU OBJETO (req)
        if( !token ){

            return res.status(400).json({
                ok: false,
                msg: 'NO TENEMOS TOKEN EN EL USUARIO'
            })
        }      
        
        next(); // PASAMOS AL SIGUIENTE MIDELWARE

    }catch(err){
       
        console.log('error middelware validarTOKEN',err);

        return res.status(400).json({
            ok: false,
            msg: 'TOKEN NO VALIDO ( firmado por el servidor ) '
        })
    }

    
  
}


module.exports = { validarJWT }