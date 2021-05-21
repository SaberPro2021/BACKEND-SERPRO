require('../database/db.connection');
const { ObjectId } = require('mongodb');
const icfesTestModel = require('../model/icfesTest.model');
const IcfesTest = require('../model/icfesTest.model');
const Question = require('../model/question.model');
const clearCache = require('../services/cache.service')


const icfesTestController = {};

//RETURN 
icfesTestController.getTestByModule = async function(req, res) {
    try {
        const moduleId = req.params.moduleId;
        const data = await icfesTestModel.find({
           moduleId: ObjectId(moduleId)
        }).cache(moduleId)
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}

//CREATING A NEW TEST
icfesTestController.post = async function(req, res) {

    if (req.body) {
        clearCache("")
        const icfesTestController = new IcfesTest(req.body);
        icfesTestController.save((err, response) => {
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
};

//SEARCH, CONSULTATION AND RETURN OF THE QUESTIONS RELATED TO EACH TEST
icfesTestController.getTestWhitQuestions = async function(req, res) {

    const test = req.params.testId;

    IcfesTest.findOne({_id: test},function(err, Tests) {
        Question.populate(Tests, { path: 'questions' }, function(err, Tests) {
            res.status(200).send(Tests);
        })
    });
};

icfesTestController.getAllTestWhitQuestions = async function(req, res) {

    IcfesTest.find(function(err, Tests) {
        Question.populate(Tests, { path: 'questions' }, function(err, Tests) {
            res.status(200).send(Tests);
        })
    });
};


// DELETE ALL ICFESTEST
icfesTestController.deleteIcfesTest = async function(req, res) {
    try {
        clearCache("")
        const delIcfesTest = await IcfesTest.remove();
        res.json(delIcfesTest);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}



//DELETE ICFES_TEST BY ID

icfesTestController.deleteByIdIcfesTest = async function(req, res) {
    try {
        clearCache("")

        const icfesTestId = req.params.icfesTestId;
        const data = await IcfesTest.remove({
            _id: ObjectId(icfesTestId)
        });
        res.json(data);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}




//UPDATE ICFES_TEST

icfesTestController.updateicfesTestId = async function(req, res) {
    try {
        clearCache("")

        const icfesTestId = req.params.icfesTestId;
        const icfesTests = new icfesTestModel(req.body);
        
        var data = {
            title : icfesTests.title,
            description : icfesTests.description,
        }

        const upIcfesTest = await IcfesTest.findByIdAndUpdate(icfesTestId, data,  async (err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error modificando icfesTest'
                });
            }
        });
        res.json(upIcfesTest);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'some error ocurred'
        });
    }
}


module.exports = icfesTestController;