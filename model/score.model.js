const mongoose = require('mongoose');

const {Schema} = mongoose;

//SCHEME OF THE MODULE COLLECTION
const scoreSchema = new Schema ({

    userId :String,
    testId:String,
    moduleId: String,
    score: Number,
    time: Number,
    date: String

},{autoCreate: true});


module.exports = mongoose.model('score',scoreSchema);