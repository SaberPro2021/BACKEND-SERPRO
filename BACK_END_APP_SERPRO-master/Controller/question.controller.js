require('../database/db.connection');
const { ObjectId } = require('mongodb');
const Question = require('../model/question.model');


//CONTROLLER'S STATEMENT
const QuestionController = {};

//FIND AND RETURN ALL QUESTIONS
QuestionController.getAll = async function(req, res) {
   try{
        const questions = await Question.find();
        res.json(questions);

   }catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'error ocurred making the query'
        });
   }
};

//FIND AND RETURN ALL THE QUESTIONS OF A MODULE
QuestionController.getByIcfesModul = async function(req, res) {
    const icfesModuleId = req.params.icfesModuleId;

    try{
         const questions = await Question.find({"icfesModuleId":icfesModuleId});
         res.json(questions);
 
    }catch (err){
         console.log(err);
         res.status(500).send({
             message: 'some error ocurred'
         });
    }
 };

//CREATE A NEW QUESTION
QuestionController.post = async function(req,res){
    if(req.body){
        const question = new Question(req.body);
        question.save((err,savedDoc)=>{
            if(err){
                console.log (err);
                res.status(500).send({
                    message:'error insertando preguntas'
                });
            }else {
                res.send(savedDoc);
            }
        });
    }else {
        res.status(500).send({
            message:'error, the body is empty'
        });
    }  
};

//SEARCH AND RETURN RANDOM QUESTIONS IN A DEFINED QUANTITY AND MODULE
QuestionController.getRandomByModule = async function(req, res) {
    const icfesModule = req.params.icfesModuleId;
    const numberQuestions = parseInt(req.params.amount);

    try{
        const questions = await Question.aggregate(
            [
                { $match: {icfesModuleId: ObjectId(icfesModule)}},
                {
                    $sample: {size: numberQuestions}
                }
            ]
        );
        const pruebaAleatoria = {
            title: 'PRUEBA ALEATORIA',
            questions
        }
        res.json(pruebaAleatoria);
 
    }catch(err){
         console.log(err);
         res.status(500).send({
             message: 'some error ocurred'
         });
    }
 };

module.exports = QuestionController; 