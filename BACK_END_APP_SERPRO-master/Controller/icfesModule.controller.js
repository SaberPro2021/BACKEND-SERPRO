require('../database/db.connection');
const IcfesModule = require('../model/icfesModule.model');
const icfesTestModel = require('../model/icfesTest.model');

//CONTROLLER'S STATEMENT
const ModuloController = {};

//RETURN ALL MODULES
ModuloController.getAll = async function(req, res) {
    try {
        const data = await IcfesModule.find();
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
ModuloController.post = async function(req, res) {

    if (req.body) {
        const icfesModules = new IcfesModule(req.body);
        icfesModules.save((err, response) => {
            if (err) {
                response.status(500).send({
                    message: 'error insertando preguntas'
                });
            }
            res.send(response);
        });
    } else {
        res.status(500).send({
            message: 'error, the body is empty'
        });
    }
}

//CREATE A NEW MODULE BY A LIST
ModuloController.saveAll = async function(req, res) {

    if (req.body) {
        let Listresult = [];
        for (let item of req.body) {
            icfesModules = new IcfesModule(item);
            let result = await icfesModules.save();
            Listresult.push(result);
        }
        res.send(Listresult)


    } else {
        res.status(500).send({
            message: 'error, the body is empty'
        });
    }
}

//DELETE MODULE
ModuloController.delete = async function(req, res) {
    try {
        const delModul = await Modulo.remove();
        res.json(delModul);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

module.exports = ModuloController;