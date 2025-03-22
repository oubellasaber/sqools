const userModel = require('../models/userModel');
const subjectModel = require('../models/subjectModel');

class SubjectController {
    static async getSubjects(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = await userModel.findById(req.session.userId);
            const subjects = await subjectModel.getAll(limit, offset);
            const total = await subjectModel.getTotalSubjectCount();
            const totalPages = Math.ceil(total / limit);

            res.render('layouts/app-layout', {
                title: 'Subjects list',
                page_path: 'admin/subject-list',
                user,
                subjects,
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

module.exports = SubjectController;