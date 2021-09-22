require('../database/db.connection');

const IcfesModule = require('../model/icfesModule.model');
const icfesTestModel = require('../model/icfesTest.model');
const allVisitSessionModel = require('../model/allVisitSession.model');
const VisitSessionModel = require('../model/allVisitSession.model');

const AllVisitSessionController = {};

AllVisitSessionController.getAllVisitSession = async function (req, res) {
  
    try {
        const data = await allVisitSessionModel.find().cache("Modules");
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'error AllVisitSessionController.getAllVisitSession'
        });
    }
}

//SAVE ALLVISITSESSION
AllVisitSessionController.SaveAllVisitSession = async function (profile) {

    const emailUser = profile.email;
    console.log(emailUser);
    const existsUser = await allVisitSessionModel.findOne({ "email": emailUser })
    if (!existsUser) {
        console.log("Saving in DataBase -- > ", profile);
        profile.save();
    }
    else {
        console.log("<La session ya existe> ->  <redireccionando al home>")

        const upAllSession = await allVisitSessionModel.findOne({ "email": emailUser });
              
        upAllSession.modules = [ ...new Set([...profile.modules,...upAllSession.modules])];
        upAllSession.tests = [ ...new Set([...profile.tests,...upAllSession.tests])];
        upAllSession.dateSession = profile.dateSession;

        upAllSession.save();
    }

}


AllVisitSessionController.VisitSessionById = async function (req, res) {
  
    try {
        const mail = req.params.userEmail;
        console.log("data session email", mail)
        const data = await allVisitSessionModel.find({
            email: mail
         })
         console.log("data session email", data)
         res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'error AllVisitSessionController.VisitSessionById'
        });
    }
}


module.exports = AllVisitSessionController;