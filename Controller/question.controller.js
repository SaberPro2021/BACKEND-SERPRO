require('../database/db.connection');
const { ObjectId } = require('mongodb');
const questionModel = require('../model/question.model');
const Question = require('../model/question.model');
const clearCache = require('../services/cache.service')


//CONTROLLER'S STATEMENT 
const QuestionController = {};

//FIND AND RETURN ALL QUESTIONS METHOD GET
QuestionController.getAllQuestions = async function(req, res) {
   try{
        const questions = await Question.find().cache("Question");
        res.json(questions);

   }catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'error, QuestionController.getAllQuestions'
        });
   }
};
//FIND AND RETURN BY YD QUESTIONS
QuestionController.getQuestionById = async function(req, res) {
    try{
        const questionId = req.params.questionId;
        const data = await Question.find({
            _id: ObjectId(questionId)
        }).cache(questionId);
        res.send(data);
 
    }catch (err) {
         console.log(err);
         res.status(500).send({
             message: 'error, QuestionController.getQuestionById'
         });
    }
 };

 

//FIND AND RETURN ALL THE QUESTIONS OF A MODULE
QuestionController.getQuestionByModuleId = async function(req, res) {
    const icfesModuleId = req.params.icfesModuleId;

    try{
         const questions = await Question.find({"icfesModuleId":icfesModuleId}).cache(icfesModuleId);
         res.json(questions);
 
    }catch (err){
         console.log(err);
         res.status(500).send({
             message: 'error, QuestionController.getQuestionByModuleId'
         });
    }
 };

//CREATE A NEW QUESTION
QuestionController.createQuestion = async function(req,res){
    if(req.body){
        clearCache("Question")

        const question = new Question(req.body);
        console.log(question);
      
        question.save((err,savedDoc)=>{
            if(err){
                console.log (err);
                res.status(500).send({
                    message:'error insert, QuestionController.createQuestion'
                });
            }else {
                res.send(savedDoc);
            }
        });
    }else {
        res.status(500).send({
            message:'error, QuestionController.createQuestion'
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
             message: 'error, QuestionController.getRandomByModule'
         });
    }
 };



 // DELETE ALL QUESTIONS
 QuestionController.deleteAllQuestion = async function(req, res) {
    try {
        clearCache("Question")

        const delQuestion = await Question.remove();
        res.json(delQuestion);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'error,  QuestionController.deleteAllQuestion'
        });
    }
}



//DELETE QUESTION BY ID

QuestionController.deleteByIdQuestion = async function(req, res) {
    try {
        clearCache("Question")

        const questionId = req.params.questionId;

        const data = await Question.remove({

            _id: ObjectId(questionId)

        });
        res.json(data);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'error, QuestionController.deleteByIdQuestion'
        });
    }
}

//UPDATE ICFES_TEST

QuestionController.updateQuestion = async function(req, res) {
    try {
        clearCache("Question")

        const questionId = req.params.questionId;
        const Questions = new questionModel(req.body);
        
        var data = {
            title : Questions.title,
            statement : Questions.statement,
        }

        const upQuestion = await Question.findByIdAndUpdate(questionId, data,  async (err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error update QuestionController.updateQuestion'
                });
            }
        });
        res.json(upQuestion);
    } catch (err) { 
        console.log(err);
        res.status(500).send({
            message: 'error, QuestionController.updateQuestion '
        });
    }
}

module.exports = QuestionController; 