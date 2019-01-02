var express = require('express');
var router = express.Router();

userController = require('../controllers/userController.js');

/* GET user account routes. */
router.post('/me', userController.loginRequired, userController.me);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
