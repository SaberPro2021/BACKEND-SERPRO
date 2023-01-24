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

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 5000000 }));


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER IS LISTEN ON PORT:", PORT);
});