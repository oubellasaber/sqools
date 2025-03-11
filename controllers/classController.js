const userModel = require('../models/userModel');
const classModel = require('../models/classModel');

class ClassController {
    static async getClasses(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = await userModel.findById(req.session.userId);
            const classes = await classModel.getAll(limit, offset);
            const total = await classModel.getTotalClassCount();
            const totalPages = Math.ceil(total / limit);

            res.render('layouts/app-layout', {
                title: 'Classes list',
                page_path: 'admin/class-list',
                user,
                classes,
                total,
                totalPages,
                currentPage: page,
                limit
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}

module.exports = ClassController;