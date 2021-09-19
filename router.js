const router = require('express').Router();

//CONTROLLER LIST
const question = require('./Controller/question.controller');
const icfesModule = require('./Controller/icfesModule.controller');
const icfesTest = require('./Controller/icfesTest.controller');
const usuario = require('./services/user.service') ;
const profile = require('./Controller/profile.controller');
const AllVisitSession = require('./Controller/allVisitSession.controller');
const score = require('./Controller/score.controler');



//ADDRESSING LIST
//QUESTION 

router.get('/question',usuario.isAccessGrantedLogin, question.getAllQuestions);
router.get('/question/:questionId',usuario.isAccessGrantedLogin, question.getQuestionById);
router.get('/question/:icfesModuleId',usuario.isAccessGrantedLogin, question.getQuestionByModuleId);
router.get('/question/:icfesModuleId/:amount', usuario.isAccessGrantedLogin,question.getRandomByModule);
router.post('/question', usuario.isAccessGrantedDocente,question.createQuestion);
router.post('/questionUpdate/:questionId',usuario.isAccessGrantedDocente, question.updateQuestion);
router.delete('/questionDelete',usuario.isAccessGrantedDocente, question.deleteAllQuestion);
router.delete('/questionDelete/:questionId', usuario.isAccessGrantedDocente,question.deleteByIdQuestion);

//AUTENTHICATION

//router.get('/ldap',auth.t);
router.post('/login', usuario.authentication);
router.get('/logout', usuario.destroySession);

//MODULE
router.get('/module',usuario.isAccessGrantedLogin, icfesModule.getAllModules);
router.get('/moduleWithTests',usuario.isAccessGrantedLogin, icfesModule.getModulesWithTests);
router.post('/module', usuario.isAccessGrantedDocente, icfesModule.createModule);
router.post('/moduleAll',usuario.isAccessGrantedDocente, icfesModule.saveAllModule);
router.post('/moduleUpdate/:moduleId',usuario.isAccessGrantedDocente,icfesModule.updateModule);
router.delete('/moduleDelete',usuario.isAccessGrantedDocente,icfesModule.deleteAllModules);
router.delete('/moduleDelete/:moduleId',usuario.isAccessGrantedDocente,icfesModule.deleteByIdModule);

//ICFES TEST
router.get('/icfesTest',usuario.isAccessGrantedLogin, icfesTest.getAllTestWhitQuestions);
router.get('/icfesTest/:testId',usuario.isAccessGrantedLogin, icfesTest.getTestWhitQuestions);
router.get('/icfesTest/moduleId/:moduleId', usuario.isAccessGrantedLogin,icfesTest.getTestByModule);
router.post('/icfesTest',usuario.isAccessGrantedDocente, icfesTest.createIcfesTest);
router.post('/icfesTestUpdate/:icfesTestId',usuario.isAccessGrantedDocente,icfesTest.updateicfesTestId);//UpdateIcfesTest
router.delete('/icfesTestDelete',usuario.isAccessGrantedDocente,icfesTest.deleteAllIcfesTest);
router.delete('/icfesTestDelete/:icfesTestId',usuario.isAccessGrantedDocente,icfesTest.deleteByIdIcfesTest);

/* PROFILE USER */

router.get('/users', usuario.isAccessGrantedDocente, profile.getAllUsers );
router.get('/users/:userId', usuario.isAccessGrantedDocente, profile.getUsersById);
router.post('/userUpdate/:userId', usuario.isAccessGrantedLogin, profile.userUpdateImage);




/* Save All Visit Session */
router.get('/GetAllVisitSession', AllVisitSession.getAllVistitSession );
router.post('/SaveAllVisitSession', AllVisitSession.SaveAllVisitSession);
router.post('/GetSessionByid/:userEmail', AllVisitSession.VisitSessionById );



/* score */
router.post('/Grade', score.postScore);

module.exports = router;