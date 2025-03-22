const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Protect all admin routes with authentication middleware
router.use(authMiddleware.isAuthenticated);

// Student dashboard
router.get('/dashboard', studentController.showStudentDashboard);
router.get('/students-list', studentController.getStudents);
router.get('/student-time-table', studentController.showStudentTimeTable);
router.get('/student-details', studentController.showStudentInfo);
router.get('/student-attendance', studentController.showStudentAttendance);
router.get('/student-exam-results', studentController.showStudentExamResults);

module.exports = router;