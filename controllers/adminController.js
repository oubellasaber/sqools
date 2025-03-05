const userModel = require('../models/userModel');
const adminDashboardModel = require('../models/adminDashboardModel');

class AdminController {
    // Render the admin dashboard
    static async showDashboard(req, res) {
        const user = await userModel.findById(req.session.userId);
        const dashboard = await adminDashboardModel.getAdminDashboard();

        res.render('layouts/app-layout', {
            title: 'Admin Dashboard',
            page_path: 'admin/dashboard',
            user: user,
            admin_dashboard: dashboard
        });
    }

    static async showStudentsList(req, res) {
        const user = await userModel.findById(req.session.userId);
        res.render('layouts/app-layout', {
            title: 'Students list',
            page_path: 'admin/student-list',
            user: user
        });
    }
}

module.exports = AdminController;