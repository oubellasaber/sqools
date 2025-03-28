const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
//router.get('/register', authController.showRegister);
//router.post('/register', authController.register);

module.exports = router;