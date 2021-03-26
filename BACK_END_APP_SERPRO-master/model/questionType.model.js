const mongoose = require('mongoose');
const {Schema} = mongoose;

//SCHEME OF THE TYPE_QUESTION COLLECTION
const questionTypeSchema = new Schema ({
    idType:Number,
    questionType: String
}, {autoCreate: true});

//exports.questionType =questionTypeSchema;
module.exports = mongoose.model('questions_type',questionTypeSchema);