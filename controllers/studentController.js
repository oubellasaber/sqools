const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');

class StudentController {
    static async getStudents(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = userModel.findById(req.session.userId);
            const students = await studentModel.getAll(limit, offset);
            const total = await studentModel.getTotalStudentCount();
            const totalPages = Math.ceil(total / limit);

            res.render('layouts/app-layout', {
                title: 'Students list',
                page_path: 'admin/student-list',
                user,
                students,
                total,
                totalPages,
                currentPage: page,
                limit
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static async showStudentInfo(req, res) {
        try {
            // if (!req.session.userId || !req.session.studentId) {
            //     return res.status(404).send('Not Found'); // Respond with 404 if parameters are missing
            // }
    
            const user = await userModel.findById(req.session.userId);
            const studentInfo = await studentModel.getStudentInfo(req.session.studentId);
            const studentDetails = await studentModel.getStudentDetails(req.session.studentId);
    
            if (!user || !studentInfo) {
                return res.status(404).send('Not Found'); // Respond with 404 if user or student not found
            }
    
            // If all is fine, render the page with the details
            res.render('layouts/app-layout', {
                title: 'Student details',
                page_path: 'admin/student-details',
                student_page_path: 'student-details-tab',
                user,
                studentInfo,
                studentDetails
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async showStudentTimeTable(req, res) {
        try {
            // if (!req.session.userId || !req.session.studentId) {
            //     return res.status(404).send('Not Found'); // Respond with 404 if parameters are missing
            // }
    
            const user = await userModel.findById(req.session.userId);
            const studentInfo = await studentModel.getStudentInfo(req.session.studentId);
            const studentTimeTable = await studentModel.getStudentTimeTable(req.session.studentId);
    
            if (!user || !studentInfo) {
                return res.status(404).send('Not Found'); // Respond with 404 if user or student not found
            }
    
            // If all is fine, render the page with the details
            res.render('layouts/app-layout', {
                title: 'Student Time table',
                page_path: 'admin/student-details',
                student_page_path: 'student-time-table-tab',
                user,
                studentInfo,
                studentTimeTable
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async showStudentAttendance(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = userModel.findById(req.session.userId);
            const student_attendance = await studentModel.getStudentAttendance(limit, offset);
            const total = await studentModel.getTotalStudentAttendance();
            const studentInfo = await studentModel.getStudentInfo(req.session.studentId);
            const totalPages = Math.ceil(total / limit);

            res.render('layouts/app-layout', {
                title: 'Student Attendance',
                page_path: 'admin/student-details',
                student_page_path: 'student-attendance-tab',
                user,
                studentInfo,
                student_attendance,
                total,
                totalPages,
                currentPage: page,
                limit
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async showStudentExamResults(req, res) {
        try {
            const user = userModel.findById(req.session.userId);
            const studentInfo = await studentModel.getStudentInfo(req.session.studentId);
            const studentExamResults = await studentModel.getStudentExamResult(req.session.studentId);

            res.render('layouts/app-layout', {
                title: 'Student Exam Results',
                page_path: 'admin/student-details',
                student_page_path: 'student-exam-results-tab',
                user,
                studentInfo,
                studentExamResults
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    
}

module.exports = StudentController;