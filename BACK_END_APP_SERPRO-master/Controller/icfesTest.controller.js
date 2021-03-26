require('../database/db.connection');
const { ObjectId } = require('mongodb');
const icfesTestModel = require('../model/icfesTest.model');
const IcfesTest = require('../model/icfesTest.model');
const Question = require('../model/question.model');

const icfesTestController = {};

//RETURN 
icfesTestController.getTestByModule = async function(req, res) {
    try {
        const moduleId = req.params.moduleId;
        const data = await icfesTestModel.find({
           moduleId: ObjectId(moduleId)
        });
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


module.exports = icfesTestController;