const db = require('../config/db');

class SubjectModel {
    static async getAll(limit, offset) {
        const allowedRowsPerPage = [5, 10, 15, 20];
        if (!allowedRowsPerPage.includes(limit)) {
            limit = allowedRowsPerPage[0];
        }

        const query = `
        SELECT
            m.id,
            m.nom AS matiere,
            mo.nom AS modele,
            f.nom AS filiere,
            CONCAT(u.prenom, ' ', u.nom) AS prof,
            c.nom AS class_room
        FROM matiere m
        JOIN filiere_modele_matiere fmm ON m.id = fmm.matiere_id
        JOIN filiere_modele fm ON fmm.filiere_modele_id = fm.id
        JOIN filiere f ON fm.filiere_id = f.id
        JOIN modele mo ON fm.modele_id = mo.id
        JOIN utilisateur u on u.id = fmm.prof_id
        JOIN class_room c ON fmm.classroom_id = c.id
        ORDER BY m.id
        LIMIT ? OFFSET ?;`;
        
        const [subjects] = await db.query(query, [limit, offset]);

        return subjects;
    }

    static async getTotalSubjectCount() {
        const query = 'SELECT COUNT(*) as total FROM matiere';
        const [rows] = await db.query(query);
        return rows[0].total;
    }
}

module.exports = SubjectModel;

// const subjects = [
        //     { "id": 1, "matiere": "Maths", "modele": "Theoretical", "filiere": "Science", "prof": "Dr. Smith", "class_room": "101" },
        //     { "id": 2, "matiere": "Physics", "modele": "Practical", "filiere": "Science", "prof": "Dr. Brown", "class_room": "102" },
        //     { "id": 3, "matiere": "History", "modele": "Theoretical", "filiere": "Arts", "prof": "Ms. Green", "class_room": "103" },
        //     { "id": 4, "matiere": "Economics", "modele": "Theoretical", "filiere": "Commerce", "prof": "Mr. White", "class_room": "104" },
        //     { "id": 5, "matiere": "Chemistry", "modele": "Practical", "filiere": "Science", "prof": "Dr. Adams", "class_room": "105" },
        //     { "id": 6, "matiere": "Geography", "modele": "Theoretical", "filiere": "Arts", "prof": "Mr. Black", "class_room": "106" },
        //     { "id": 7, "matiere": "Business Studies", "modele": "Theoretical", "filiere": "Commerce", "prof": "Ms. Blue", "class_room": "107" },
        //     { "id": 8, "matiere": "Biology", "modele": "Practical", "filiere": "Science", "prof": "Dr. Yellow", "class_room": "108" },
        //     { "id": 9, "matiere": "Literature", "modele": "Theoretical", "filiere": "Arts", "prof": "Mr. Pink", "class_room": "109" },
        //     { "id": 10, "matiere": "Accounting", "modele": "Theoretical", "filiere": "Commerce", "prof": "Ms. Violet", "class_room": "110" },
        //     { "id": 11, "matiere": "Statistics", "modele": "Practical", "filiere": "Science", "prof": "Dr. Grey", "class_room": "111" }
        //   ];
        
        // const paginatedSubjects = subjects.slice(offset, offset + limit);