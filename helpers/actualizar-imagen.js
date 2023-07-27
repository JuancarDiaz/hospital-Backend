const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const path = require('path');
const fs = require('fs');


const borrarImagen = ( path ) =>{

    if( fs.existsSync( path ) ){

        console.log('existia imagen',path)
        fs.unlinkSync(  path );
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo ) =>{

    switch ( tipo ) {

        case 'medicos':
        
                            try{

                                        const medico = await Medico.findById(id);

                                        if( !medico ){ 
                                            
                                            console.log('NO SE ENCONTRO UN MEDICO POR ID');
                                            return false;
                                        }

                                        const ruta = path.join( '..', 'uploads', tipo, (medico.img) || 'NoExisteRuta' )
                                        
                                        const pathViejo = path.resolve( __dirname, ruta ); 

                                        borrarImagen( pathViejo );


                                        medico.img = nombreArchivo;

                                        await medico.save();

                                        return true;

                        

                            }catch(err){

                                console.log(err);
                                return false;
                            }
                    
    
        case 'hospitales':

                                try{

                                    const hospital = await Hospital.findById(id);

                                    if( !hospital ){ 
                                        
                                        console.log('NO SE ENCONTRO UN MEDICO POR ID');
                                        return false;
                                    }

                                    const ruta = path.join( '..', 'uploads', tipo, (hospital.img) || 'NoExisteRuta' )
                                    
                                    const pathViejo = path.resolve( __dirname, ruta ); 

                                    borrarImagen( pathViejo );

                                    hospital.img = nombreArchivo;

                                    await hospital.save();

                                    return true;



                        }catch(err){

                            console.log(err);
                            return false;
                        }
            

        case 'usuarios':

                                try{

                                    const usuario = await Usuario.findById(id);

                                    if( !usuario ){ 
                                        
                                        console.log('NO SE ENCONTRO UN MEDICO POR ID');
                                        return false;
                                    }

                                    const ruta = path.join( '..', 'uploads', tipo, (usuario.img) || 'NoExisteRuta' );
                                    
                                    const pathViejo = path.resolve( __dirname, ruta ); 

                                    borrarImagen( pathViejo );

                                    usuario.img = nombreArchivo;

                                    await usuario.save();

                                    return true;



                        }catch(err){

                            console.log(err);
                            return false;
                        }
                                        
                            



        default:
        
        break;
    }

}

module.exports = { actualizarImagen }