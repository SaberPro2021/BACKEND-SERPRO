const gradesModel = require('../model/grades.model');
const { ObjectId } = require('mongodb');


require('../database/db.connection');

const Grades = {};
 
Grades.postGrades = async function(req, res) {
    console.log("que trae req -- > ",req.body.userId);
    if (req.body) {
        const gradesModels = new gradesModel(req.body);
        gradesModels.save((err, response) => {
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

module.exports = Grades;