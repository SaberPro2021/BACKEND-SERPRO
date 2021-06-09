require('../database/db.connection');
const { ObjectId } = require('mongodb');

const IcfesModule = require('../model/icfesModule.model');
const icfesTestModel = require('../model/icfesTest.model');
const allVisitSessionModel = require('../model/allVisitSession.model');
const { all } = require('../router');
const { find } = require('../model/allVisitSession.model');

const AllVisitSessionController = {};


AllVisitSessionController.getAllVistitSession = async function (req, res) {
    try {
        const data = await allVisitSession.find().cache("Modules");
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

//SAVE ALLVISITSESSION
AllVisitSessionController.SaveAllVisitSession = async function (profile) {

    //console.log("Objeto -- > ", profile);
    const emailUser = profile.email;
    console.log(emailUser);
    const existsUser = await allVisitSessionModel.findOne({ "email": emailUser })
    if (!existsUser) {
        console.log("Saving in DataBase -- > ", profile);
        profile.save();
        /*     if (err) {
                console.log(err);
            } */
    }
    else {
        console.log("<La session ya existe> ->  <redireccionando al home>")

        const upAllSession = await allVisitSessionModel.findOne({ "email": emailUser });
        //console.log(upAllSession);

       
        upAllSession.modules = [ ...new Set([...profile.modules,...upAllSession.modules])];
        upAllSession.tests = [ ...new Set([...profile.tests,...upAllSession.tests])];
        upAllSession.dateSession = profile.dateSession;

        upAllSession.save();
    }

}



module.exports = AllVisitSessionController;