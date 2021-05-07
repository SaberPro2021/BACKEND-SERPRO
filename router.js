const router = require('express').Router();

//CONTROLLER LIST
const question = require('./Controller/question.controller');
const icfesModule = require('./Controller/icfesModule.controller');
const icfesTest = require('./Controller/icfesTest.controller');
const usuario = require('./services/user.service') ;
//ADDRESSING LIST
//QUESTION 

router.get('/question',usuario.isAccessGrantedLogin, question.getAll);
router.get('/question/:questionId',usuario.isAccessGrantedLogin, question.getQuestionById);
router.get('/question/:icfesModuleId',usuario.isAccessGrantedLogin, question.getByIcfesModul);
router.get('/question/:icfesModuleId/:amount', usuario.isAccessGrantedLogin,question.getRandomByModule);
router.post('/question', usuario.isAccessGrantedDocente,question.post);
router.post('/questionUpdate/:questionId',usuario.isAccessGrantedDocente, question.updateQuestion);
router.delete('/questionDelete',usuario.isAccessGrantedDocente, question.deleteQuestion)
router.delete('/questionDelete/:questionId', usuario.isAccessGrantedDocente,question.deleteByIdQuestion)

//AUTENTHICATION

//router.get('/ldap',auth.t);
router.get('/login', usuario.authentication)

//MODULE
router.get('/module',usuario.isAccessGrantedLogin, icfesModule.getAllModules);
router.get('/moduleWithTests',usuario.isAccessGrantedLogin, icfesModule.getModulesWithTests);
router.post('/module', usuario.isAccessGrantedDocente, icfesModule.createModule);
router.post('/moduleAll',usuario.isAccessGrantedDocente, icfesModule.saveAllModule);
router.post('/moduleUpdate/:moduleId',usuario.isAccessGrantedDocente,icfesModule.updateModule);
router.delete('/moduleDelete',usuario.isAccessGrantedDocente,icfesModule.deleteModules);
router.delete('/moduleDelete/:moduleId',usuario.isAccessGrantedDocente,icfesModule.deleteByIdModule);

//ICFES TEST
router.get('/icfesTest',usuario.isAccessGrantedLogin, icfesTest.getAllTestWhitQuestions);
router.get('/icfesTest/:testId',usuario.isAccessGrantedLogin, icfesTest.getTestWhitQuestions);
router.get('/icfesTest/moduleId/:moduleId', usuario.isAccessGrantedLogin,icfesTest.getTestByModule);
router.post('/icfesTest',usuario.isAccessGrantedDocente, icfesTest.post);
router.post('/icfesTestUpdate/:icfesTestId',usuario.isAccessGrantedDocente,icfesTest.updateicfesTestId);//UpdateIcfesTest
router.delete('/icfesTestDelete',usuario.isAccessGrantedDocente,icfesTest.deleteIcfesTest);
router.delete('/icfesTestDelete/:icfesTestId',usuario.isAccessGrantedDocente,icfesTest.deleteByIdIcfesTest);



module.exports = router;