const mongoose = require('mongoose');
const {Schema} = mongoose;

//SCHEME OF THE MODULE COLLECTION
const icfesModuleSchema = new Schema ({
    knowledgeArea: String,
    type: String,
    description: String,
    evaluate: String
},{autoCreate: true});


module.exports = mongoose.model('icfes_modules',icfesModuleSchema);