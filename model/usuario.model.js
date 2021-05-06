const mongoose = require('mongoose');
const { Schema } = mongoose;

//SCHEME OF THE PROFILE COLLECTION
const profile = new Schema({
    name: String,
    lastname: String,
    mail:String,
    role:String,
    avatar: String
}, { autoCreate: true });

module.exports = mongoose.model('Profile', profile);