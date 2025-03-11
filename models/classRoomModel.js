const db = require('../config/db');

class ClassRoomModel {
    static async getAll(limit, offset) {
        const allowedRowsPerPage = [5, 10, 15, 20];
        if (!allowedRowsPerPage.includes(limit)) {
            limit = allowedRowsPerPage[0];
        }
    
        const query = `
            SELECT
                id,
                nom,
                capacite
            FROM class_room
            LIMIT ? OFFSET ?;
        `;
    
        try {
            const [classRooms] = await db.query(query, [limit, offset]);
    
            return classRooms;
        } catch (error) {
            console.error('Error fetching class rooms:', error);
            return [];
        }
    }

    static async getTotalClassRoomCount() {
        const query = 'SELECT COUNT(*) as total FROM class_room';
        const [rows] = await db.query(query);
        return rows[0].total;
    }
}

module.exports = ClassRoomModel;

// { "id": 1, "nom": "Room 101", "capacite": 30 },
// { "id": 2, "nom": "Room 102", "capacite": 25 },
// { "id": 3, "nom": "Room 103", "capacite": 20 },
// { "id": 4, "nom": "Room 104", "capacite": 35 },
// { "id": 5, "nom": "Room 105", "capacite": 40 },
// { "id": 6, "nom": "Room 106", "capacite": 22 },
// { "id": 7, "nom": "Room 107", "capacite": 28 },
// { "id": 8, "nom": "Room 108", "capacite": 32 },
// { "id": 9, "nom": "Room 109", "capacite": 18 },
// { "id": 10, "nom": "Room 110", "capacite": 50 },
// { "id": 11, "nom": "Room 111", "capacite": 26 }
// ];

// const paginatedClassRooms = classRooms.slice(offset, offset + limit);
// return paginatedClassRooms;