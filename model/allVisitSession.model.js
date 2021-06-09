const mongoose = require('mongoose');
const {Schema} = mongoose;

//SCHEME OF THE PROFILE COLLECTION
const allVisitSession = new Schema({
    email: String,
    modules: [],
    tests:[],
    dateSession:String
}, { autoCreate: true });

module.exports = mongoose.model('AllVisitSession', allVisitSession);

 