const router = require('express').Router();

//CONTROLLER LIST
const question = require('./Controller/question.controller');
const icfesModule = require('./Controller/icfesModule.controller');
const icfesTest = require('./Controller/icfesTest.controller');
const auth = require('./model/AuthLdap');
const usuario = require('./Controller/user.controller') ;
//ADDRESSING LIST
//QUESTION 
router.get('/question', question.getAll);
router.get('/question/:questionId', question.getQuestionById);
router.get('/question/:icfesModuleId', question.getByIcfesModul);
router.get('/question/:icfesModuleId/:amount', question.getRandomByModule);
router.post('/question', question.post);
router.post('/questionUpdate/:questionId', question.updateQuestion);
router.delete('/questionDelete', question.deleteQuestion)
router.delete('/questionDelete/:questionId', question.deleteByIdQuestion)

//AUTENTHICATION

//router.get('/ldap',auth.t);
router.get('/login', usuario.authentication)

//MODULE
router.get('/module', icfesModule.getAllModules);
router.get('/moduleWithTests', icfesModule.getModulesWithTests);
router.post('/module', icfesModule.createModule);
router.post('/moduleAll', icfesModule.saveAllModule);
router.post('/moduleUpdate/:moduleId',icfesModule.updateModule);
router.delete('/moduleDelete',icfesModule.deleteModules);
router.delete('/moduleDelete/:moduleId',icfesModule.deleteByIdModule);

//ICFES TEST
router.get('/icfesTest', icfesTest.getAllTestWhitQuestions);
router.get('/icfesTest/:testId', icfesTest.getTestWhitQuestions);
router.get('/icfesTest/moduleId/:moduleId', icfesTest.getTestByModule);
router.post('/icfesTest', icfesTest.post);
router.post('/icfesTestUpdate/:icfesTestId',icfesTest.updateicfesTestId);//UpdateIcfesTest
router.delete('/icfesTestDelete',icfesTest.deleteIcfesTest);
router.delete('/icfesTestDelete/:icfesTestId',icfesTest.deleteByIdIcfesTest);



module.exports = router;