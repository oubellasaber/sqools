const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentController');
const teacherController = require('../controllers/teacherController');
const SubjectController = require('../controllers/subject');
const ClassRoomController = require('../controllers/classRoomController');
const ClassController = require('../controllers/classController');

const router = express.Router();

// Protect all admin routes with authentication middleware
router.use(authMiddleware.isAuthenticated);

// Admin dashboard
router.get('/dashboard', adminController.showDashboard);
router.get('/students-list', studentController.getStudents);
router.get('/student-time-table', studentController.showStudentTimeTable);
router.get('/student-details', studentController.showStudentInfo);
router.get('/student-attendance', studentController.showStudentAttendance);
router.get('/student-exam-results', studentController.showStudentExamResults);
router.get("/teacher-list", teacherController.getTeachers);
router.get("/teacher-details", teacherController.showTeacherInfo);
router.get("/teacher-time-table", teacherController.showTeacherTimeTable);
router.get("/class-list", ClassController.getClasses);
router.get("/class-room-list", ClassRoomController.getClassRooms);
router.get("/subject-list", SubjectController.getSubjects);

// Student route

module.exports = router;