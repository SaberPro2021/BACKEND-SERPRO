const profileModel  = require('../model/profile.model');
const { ObjectId } = require('mongodb');


require('../database/db.connection');

const Profiles = {};

Profiles.createProfile = async function (err, profile) {
    
    const mail = profile.mail;
    const profileExists = await profileModel.findOne({mail})
    if(!profileExists){
        //console.log("Saving in DataBase -- > ", profile);
        profile.save();
        if (err) {
            console.log(err,'Profiles.createProfile');
        }
    }
    else{
        console.log("<Ya existe el usuario> ->  <redireccionando al home>")
    }

}

Profiles.getAllUsers = async function(req, res) {
    try {
        const data = await profileModel.find().cache();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'error, Profiles.getAllUsers'
        });
    }
}
Profiles.getUsersById = async function(req, res) {
    try{
        const userID = req.params.userId;
        console.log(userID)
        const data = await profileModel.find({
            _id: ObjectId(userID)
        }).cache(userID);
        res.send(data);
 
    }catch (err) {
         console.log(err);
         res.status(500).send({
             message: 'error, Profiles.getUsersById'
         });
    }
 };

Profiles.userUpdateImage = async function(req, res) {
    try {
        const userID = req.params.userId;
        const User = new profileModel(req.body);
    
        var data = {
            avatar : User.avatar
        }
        
        var fs = require('fs');

        var imageAsBase64 = fs.readFileSync(data.avatar, 'base64');

        data.avatar = imageAsBase64
        
        const upUserImage = await profileModel.findByIdAndUpdate(userID, data,  async (err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error update Profiles.userUpdateImage'
                });
            }
        });
        res.json(upUserImage);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'error, Profiles.userUpdateImage'
        });
    }
}




module.exports = Profiles;