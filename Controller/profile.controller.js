require('../database/db.connection');

const Profiles = {};

Profiles.createProfile = async function(err, profile) {
    console.log("Saving in DataBase -- > ",profile);
    profile.save();
    if (err) {
       console.log(err); 
    }
}

module.exports = Profiles;