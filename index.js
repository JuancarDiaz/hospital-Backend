require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const app = express();

app.use( cors() )


dbConnection();

// console.log( process.env );

app.get( '/', async (req, res, next)=>{

    res.status(200).json({
        ok:true,
        msg:'mensaje en el / correcto'
    })
});

app.listen( process.env.PORT, () => {

            console.log('servidor de node escuchando en el puerto ' + 3000 );
});
 
// cadena de conexion de mongoAtlas
// mongodb+srv://JuanCarlos:turdape2016@agapeacluster.skhmidd.mongodb.net/mibasedatos