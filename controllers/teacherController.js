const userModel = require('../models/userModel');
const adminDashboardModel = require('../models/adminDashboardModel');
const teacherModel = require('../models/teacherModel');

class TeacherController {
    // Render the admin dashboard
    static async getTeachers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = await userModel.findById(req.session.userId);
            const teachers = await teacherModel.getAll(limit, offset);
            const total = await teacherModel.getTotalTeachersCount();
            const totalPages = Math.ceil(total / limit);

            res.render('layouts/app-layout', {
                title: 'Teachers list',
                page_path: 'admin/teacher-list',
                user,
                teachers,
                total,
                totalPages,
                currentPage: page,
                limit
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async showTeacherInfo(req, res) {
        try {
            const teacherId = req.query.teacherId;
            if (!teacherId) {
                return res.status(404).send('Not Found');
            }
    
            const user = await userModel.findById(req.session.userId);
            const teacherInfo = await teacherModel.getTeacherInfo(teacherId);
            const teacherDetails = await teacherModel.getTeacherDetails(teacherId);
    
            if (!user || !teacherInfo) {
                return res.status(404).send('Not Found'); // Respond with 404 if user or student not found
            }
    
            // If all is fine, render the page with the details
            res.render('layouts/app-layout', {
                title: 'Teacher details',
                page_path: 'admin/teacher-details',
                teacher_page_path: 'teacher-details-tab',
                user,
                teacherInfo,
                teacherDetails
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async showTeacherTimeTable(req, res) {
        try {
            const teacherId = req.query.teacherId;
            if (!teacherId) {
                return res.status(404).send('Not Found');
            }
    
            const user = await userModel.findById(req.session.userId);
            const teacherInfo = await teacherModel.getTeacherInfo(teacherId);
            const teacherTimeTable = await teacherModel.getTeacherTimeTable(teacherId);
    
            if (!user || !teacherInfo) {
                return res.status(404).send('Not Found'); // Respond with 404 if user or student not found
            }
    
            // If all is fine, render the page with the details
            res.render('layouts/app-layout', {
                title: 'Teacher Time table',
                page_path: 'admin/teacher-details',
                teacher_page_path: 'teacher-time-table-tab',
                user,
                teacherInfo,
                teacherTimeTable
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = TeacherController;