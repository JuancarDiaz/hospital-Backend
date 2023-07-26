require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const app = express();

app.use( cors() )

app.use( express.json() );

dbConnection();

// console.log( process.env );


app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/auth', require('./routes/auth'))



app.listen( process.env.PORT, () => {

            console.log('servidor de node escuchando en el puerto ' + 3000 );
});
 
