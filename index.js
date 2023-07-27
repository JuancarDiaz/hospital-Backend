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
app.use( '/api/auth', require('./routes/auth'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos' ,require('./routes/medicos'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/uploads', require('./routes/uploads'));



app.listen( process.env.PORT, () => {

            console.log('servidor de node escuchando en el puerto ' + 3000 );
});
 
