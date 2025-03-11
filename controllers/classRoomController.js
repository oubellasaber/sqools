const userModel = require('../models/userModel');
const classRoomModel = require('../models/classRoomModel');

class ClassRoomController {
    static async getClassRooms(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
    
        try {
            const user = await userModel.findById(req.session.userId);
            const classRooms = await classRoomModel.getAll(limit, offset);
            const total = await classRoomModel.getTotalClassRoomCount();
            const totalPages = Math.ceil(total / limit);

            res.render('layouts/app-layout', {
                title: 'Class rooms list',
                page_path: 'admin/class-room-list',
                user,
                classRooms,
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

module.exports = ClassRoomController;