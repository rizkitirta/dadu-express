var express = require('express');
var router = express.Router();
const registerController = require('../controllers/auth/register');
const loginController = require('../controllers/auth/login');

router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;
