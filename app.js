//DECLARATIONS
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./router');
const helmet = require('helmet');
require('./database/db.connection');

const session = require('express-session');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session); // Se usa par aguardar las sessiones en mongodb 
//middlewears
app.use(helmet());

app.use(cors(
  {origin: true,
  credentials: true}
  ));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'some-secret',
    resave: false,
    saveUninitialized: false,
    cookie : {sameSite : "Lax"},
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    })
  }));


//MAIN ROUTE
app.use('/', router);
//Comentario de prueba 2
const PORT = process.env.PORT || 3000;


console.log("PORT -->>>>>??????******************",PORT)
app.listen(PORT, () => {
  console.log("SERVER IS LISTEN ON PORT:", PORT);
});