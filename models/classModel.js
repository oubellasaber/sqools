const db = require('../config/db');

class Class {
    static async getAll(limit, offset) {
    try {
        // Validate limit with allowed values
        const allowedRowsPerPage = [5, 10, 15, 20];
        if (!allowedRowsPerPage.includes(limit)) {
            limit = allowedRowsPerPage[0];
        }

        // SQL query to fetch classes with pagination
        const query = `
            SELECT 
                c.id, 
                c.nom, 
                f.nom AS filiere, 
                sem.semestre_number AS semestre
            FROM classe c
            JOIN filiere f ON f.id = c.filiere_id
            JOIN semestre sem ON sem.id = c.semestre_id
            LIMIT ? OFFSET ?;
        `;

        // Execute the query
        const [rows] = await db.query(query, [limit, offset]);

        // Return the paginated classes
        return rows;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
}

    static async getTotalClassCount() {
        const query = 'SELECT COUNT(*) as total FROM classe';
        const [rows] = await db.query(query);
        return rows[0].total;
    }
}

module.exports = Class;