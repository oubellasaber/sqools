const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');

class StudentController {
    static async getStudents(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = await userModel.findById(req.session.userId);
            const students = await studentModel.getAll(limit, offset);
            console.log(students.length)
            const total = await studentModel.getTotalStudentCount();
            console.log(total);
            const totalPages = Math.ceil(total / limit);
            console.log(totalPages);

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
            const studentId = req.query.studentId;
            if (!studentId) {
                return res.status(404).send('Not Found'); // Respond with 404 if parameters are missing
            }
    
            const user = await userModel.findById(req.session.userId);
            const studentInfo = await studentModel.getStudentInfo(studentId);
            const studentDetails = await studentModel.getStudentDetails(studentId);
    
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
            const studentId = req.query.studentId;
            if (!studentId) {
                return res.status(404).send('Not Found'); // Respond with 404 if parameters are missing
            }

            const user = await userModel.findById(req.session.userId);
            const studentInfo = await studentModel.getStudentInfo(studentId);
            const studentTimeTable = await studentModel.getStudentTimeTable(studentId);
    
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
        const studentId = req.query.studentId;
        if (!studentId) {
            return res.status(404).send('Not Found'); // Respond with 404 if parameters are missing
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = userModel.findById(req.session.userId);
            const student_attendance = await studentModel.getStudentAttendance(studentId, limit, offset);
            const total = await studentModel.getTotalStudentAttendance();
            const studentInfo = await studentModel.getStudentInfo(studentId);
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
        const studentId = req.query.studentId;
        if (!studentId) {
            return res.status(404).send('Not Found'); // Respond with 404 if parameters are missing
        }

        try {
            const user = userModel.findById(req.session.userId);
            const studentInfo = await studentModel.getStudentInfo(studentId);
            const studentExamResults = await studentModel.getStudentExamResult(studentId);

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