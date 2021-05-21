require('../database/db.connection');
const { ObjectId } = require('mongodb');
const uriRedis = require('../database/db.connection');
const IcfesModule = require('../model/icfesModule.model');
const icfesTestModel = require('../model/icfesTest.model');
const questionModel = require('../model/question.model');
const clearCache = require('../services/cache.service')

//CONTROLLER'S STATEMENT
const ModuloController = {}; 

//RETURN ALL MODULES
ModuloController.getAllModules = async function(req, res) {
    try {
    
        req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1 
        console.log("ESTADO SESSION EN GET >"+req.session.cuenta +' '+ req.session.user)

        const data = await IcfesModule.find().cache();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

//RETURN MODULE WHIT TESTID
ModuloController.getModulesWithTests = async function(req, res) {
    try {
        icfesTestModel.find(function(err, Modules) {
            icfesTestModel.populate(Modules, { path: 'moduleId' }, function(err, Tests) {
                res.status(200).send(Modules);
            })
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

//CREATE A NEW MODULE
ModuloController.createModule = async function(req, res) {
    if (req.body) {
        clearCache("")
        const icfesModules = new IcfesModule(req.body);
        icfesModules.save((err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error insertando modulo'
                });
            }
            res.json(response);
        });
    } else {
        res.status(500).send({
            message: 'error, the body is empty'
        });
    }
}

//CREATE A NEW MODULE BY A LIST
ModuloController.saveAllModule = async function(req, res) {
    if (req.body) {
        let Listresult = [];
        for (let item of req.body) {
            icfesModules = new IcfesModule(item);
            let result = await icfesModules.save();
            Listresult.push(result);
        }
        res.json(Listresult)
    } else {
        res.status(500).send({
            message: 'error, the body is empty'
        });
    }
}

//DELETE MODULE
ModuloController.deleteModules = async function(req, res) {
    try {
        clearCache("")
        const delModul = await IcfesModule.remove();
        res.json(delModul);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

//DELETE MODULE BY ID
ModuloController.deleteByIdModule = async function(req, res) {
    try {
        clearCache("")
        const moduleId = req.params.moduleId;
        const data = await IcfesModule.remove({
            _id: ObjectId(moduleId)
        });
        const dataQuestion = await questionModel.remove({
            icfesModuleId:ObjectId(moduleId)
        });
        const dataTest = await icfesTestModel.remove({
            moduleId: ObjectId(moduleId)
        });
        res.json(data,dataQuestion, dataTest);
   

    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

//UPDATE MODULE
ModuloController.updateModule = async function(req, res) {
    try {
        clearCache("")
        const moduleId = req.params.moduleId;
        const icfesModules = new IcfesModule(req.body);
        
        var data = {
            knowledgeArea : icfesModules.knowledgeArea,
            type : icfesModules.type,
            description : icfesModules.description,
            evaluate : icfesModules.evaluate
        }

        const upModul = await IcfesModule.findByIdAndUpdate(moduleId, data,  async (err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error modificando modulo'
                });
            }
        });
        res.json(upModul);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}


module.exports = ModuloController;