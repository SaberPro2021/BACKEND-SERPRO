const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const IcfesModule = require('../model/icfesModule.model');
const IcfesTest = require('../model/icfesTest.model');
const Profile = require('../model/profile.model');

const {Schema} = mongoose;

//SCHEME OF THE MODULE COLLECTION
const gradesSchema = new Schema ({


    userId :String,
    moduleId: String,
    testId:String ,
    time: Number,
    score: String

/*     userId :{type:ObjectId, ref: Profile},
    moduleId: {type:ObjectId, ref: IcfesModule},
    testId: {type:ObjectId, ref:IcfesTest},
    time: Number,
    score: String */
},{autoCreate: true});


module.exports = mongoose.model('grades',gradesSchema);