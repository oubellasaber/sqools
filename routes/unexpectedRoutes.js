const express = require('express');
const authController = require('../controllers/authController');
const AdminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', AdminController.showDashboard);

module.exports = router;