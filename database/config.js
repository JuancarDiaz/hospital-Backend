const mongoose = require('mongoose');

const dbConnection = async ()=>{


    try{
        
         await mongoose.connect( process.env.DB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log('DB ONLINE');

    }catch(err){

        console.log('error ==> ',err );
        throw new Error('Error a la hora de iniciar la conexion a la DB ver logs ');
    }
}
 
module.exports = {

    dbConnection
}