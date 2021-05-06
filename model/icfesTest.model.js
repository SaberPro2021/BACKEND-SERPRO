const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Questions = require('../model/question.model')
const IcfesModule = require('../model/icfesModule.model')
const {Schema} = mongoose;

//SCHEME OF THE TEST COLLECTION
const icfesTestSchema = new Schema ({
    title: String,
    description: String,
    moduleId: {type:ObjectId, ref: IcfesModule},
    questions: [{type: ObjectId, ref: Questions}]
},{autoCreate: true});

module.exports = mongoose.model('icfes_tests',icfesTestSchema);