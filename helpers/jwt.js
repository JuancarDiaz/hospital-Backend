const jwt = require('jsonwebtoken'); 

// uid -> es nuestro PAYLOAD

const generarJWT = ( uid ) =>{


    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {

            expiresIn: '12h'

            }, (err, token) =>{
            
                    if( err ){
                        
                        console.log('ERROR FIRMA JWT ',err);
                        reject( err );
                    }else{

                        resolve( token );
                    }
                });
    });
}



module.exports = { generarJWT }