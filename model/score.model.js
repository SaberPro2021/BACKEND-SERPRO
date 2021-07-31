const mongoose = require('mongoose');

const {Schema} = mongoose;

//SCHEME OF THE MODULE COLLECTION
const scoreSchema = new Schema ({

    userId :String,
    moduleId: String,
    testId:String ,
    time: String,
    score: Number,
    date: String

},{autoCreate: true});


module.exports = mongoose.model('score',scoreSchema);