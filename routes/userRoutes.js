const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// ! No authentication here (as requested)
router.post('/createUser', userController.createUser);
router.post('/login', userController.login);

module.exports = router;