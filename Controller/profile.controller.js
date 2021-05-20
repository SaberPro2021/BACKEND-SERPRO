const model  = require('../model/profile.model');
const { ObjectId } = require('mongodb');


require('../database/db.connection');

const Profiles = {};

Profiles.createProfile = async function (err, profile) {
    
    const mail = profile.mail;
    const perfil = await model.findOne({mail})
    if(!perfil){
        console.log("Saving in DataBase -- > ", profile);
        profile.save();
        if (err) {
            console.log(err);
        }
    }
    else{
        console.log("Ya existe el usuario")
    }

}

module.exports = Profiles;