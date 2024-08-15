const mongoose = require('mongoose')
const dbconfig = require('./db.config');
require('dotenv').config();
const devUrl = `mongodb+srv://${dbconfig.USER}:${dbconfig.PASSWORD}@${dbconfig.HOST}:${dbconfig.PORT}/${dbconfig.DB}`;
const prodUrl = `mongodb+srv://${process.env.MONGODB_USR}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;
const uri = process.env.APP_ENVIRONMENT == 'prod' ? prodUrl : devUrl;

const uriRedis = {URL : 'redis://127.0.0.1:6379' };
const db = mongoose.connection;

console.log('WE ARE CONNECTED TO', uri);

//CONFIRMATION OF THE CONNECTION WITH THE DATABASE
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('WE ARE CONNECTED TO', uri);
});

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


module.exports = uriRedis;