const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre:{

        type:String,
        required:true,
    },
    img:{

        type:String,
    },
    usuario:{

        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
},
    { collection: 'hospitales'} // cambiamos el nombre a nuestro antojo para que en vez de que mongoCompas de un nombre acabado en 'es'
                                // de esta manera lo personalizamos
);


HospitalSchema.method('toJSON', function() {
    
   const{ __v, ...object } = this.toObject();

   return object;
})


module.exports =  model( 'Hospital', HospitalSchema );