var express = require('express');
var router = express.Router();

valuesController = require('../controllers/valuesController.js');
userController = require('../controllers/userController.js');

/* GET sample data. */
router.get('/samplevalue', userController.loginRequired, valuesController.samplevalue);
router.get('/sampleuser', userController.loginRequired, valuesController.sampleuser);

module.exports = router;