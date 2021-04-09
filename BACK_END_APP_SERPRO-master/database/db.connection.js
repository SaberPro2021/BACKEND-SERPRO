const mongoose = require('mongoose')
const dbconfig = require('./db.config');
require('dotenv').config();
const devUrl = `mongodb+srv://${dbconfig.USER}:${dbconfig.PASSWORD}@${dbconfig.HOST}/${dbconfig.DB}`;
const prodUrl = `${process.env.MONGODB_DRIVER_STRING}://${process.env.MONGODB_USR}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;
const env = process.env.APP_ENVIRONMENT;
//const uri = process.env.MONGODB_URI || env == 'prod' ? prodUrl : devUrl;

const uri = "mongodb://localhost:27017/SaberPro";
//const uri = "mongodb://serpro-database:27017/SaberPro";
//mongodb://localhost:27017/SaberPro
const db = mongoose.connection;

//CONFIRMATION OF THE CONNECTION WITH THE DATABASE
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('WE ARE CONNECTED TO', `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`);
});

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


