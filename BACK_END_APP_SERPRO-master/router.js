const router = require('express').Router();

//CONTROLLER LIST
const question = require('./Controller/question.controller');
const icfesModule = require('./Controller/icfesModule.controller');
const icfesTest = require('./Controller/icfesTest.controller');

//ADDRESSING LIST

//QUESTION 
router.get('/question', question.getAll);
router.get('/question/:icfesModuleId', question.getByIcfesModul);
router.get('/question/:icfesModuleId/:amount', question.getRandomByModule);
router.post('/question', question.post);

//MODULE
router.get('/module', icfesModule.getAll);
router.get('/moduleWithTests', icfesModule.getModulesWithTests);
router.post('/module', icfesModule.post);
router.post('/moduleAll', icfesModule.saveAll);

//ICFES TEST
router.get('/icfesTest', icfesTest.getAllTestWhitQuestions);
router.get('/icfesTest/:testId', icfesTest.getTestWhitQuestions);
router.get('/icfesTest/moduleId/:moduleId', icfesTest.getTestByModule);
router.post('/icfesTest', icfesTest.post);

module.exports = router;