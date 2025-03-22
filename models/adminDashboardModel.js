const db = require('../config/db'); // Your database connection

class AdminDashboardModel {
    static async getAdminDashboard() {
        try {
            // const result = await db.query(`
            //     WITH RankedSemesters AS (
            //         SELECT
            //             c.id AS classe_id, 
            //             s.id AS semestre_id,
            //             f.nom AS filiere,
            //             s.semestre_number,
            //             ROW_NUMBER() OVER (PARTITION BY f.id ORDER BY s.start_date DESC) AS \`rank\`
            //         FROM 
            //             classe c
            //         JOIN 
            //             filiere f ON f.id = c.filiere_id
            //         JOIN 
            //             semestre s ON s.id = c.semestre_id
            //     ),
            //     RankedStudents AS (
            //         SELECT 
            //             u.id AS student_id,
            //             u.nom, 
            //             u.prenom,
            //             f.nom AS filiere,
            //             s.semestre_number AS semestre,
            //             AVG(n.score) AS avg_grade,
            //             ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY AVG(n.score) DESC) AS student_rank
            //         FROM 
            //             utilisateur u
            //         JOIN 
            //             eleve e ON u.id = e.id
            //         JOIN 
            //             classe c ON e.filiere_id = c.filiere_id
            //         JOIN 
            //             filiere f ON f.id = c.filiere_id
            //         JOIN 
            //             semestre s ON s.id = c.semestre_id
            //         JOIN 
            //             note n ON n.eleve_id = e.id
            //         GROUP BY 
            //             u.id, u.nom, u.prenom, f.nom, s.semestre_number, c.id
            //     ),
            //     BestPerformingStudents AS (
            //         SELECT 
            //             rstu.nom AS fullname,
            //             rstu.filiere,
            //             rstu.semestre
            //         FROM RankedSemesters rs
            //         JOIN RankedStudents rstu 
            //         ON rs.filiere = rstu.filiere AND rs.semestre_number = rstu.semestre
            //         WHERE rs.rank <= 2 AND rstu.student_rank <= 2
            //     ),
            //     ClassAverages AS (
            //         SELECT 
            //             ec.section_id AS classe_id,
            //             n.filiere_modele_matiere_id,
            //             AVG(n.score) AS moyenne_matiere
            //         FROM note n
            //         JOIN eleve_classe ec ON n.eleve_id = ec.eleve_id
            //         JOIN filiere_modele_matiere fmm ON n.filiere_modele_matiere_id = fmm.id
            //         JOIN RankedSemesters rs ON ec.section_id = rs.classe_id
            //         WHERE rs.rank IN (1, 2)
            //         GROUP BY ec.section_id, n.filiere_modele_matiere_id
            //     ),
            //     ProfessorRanking AS (
            //         SELECT 
            //             fmm.prof_id,
            //             AVG(ca.moyenne_matiere) AS moyenne_prof
            //         FROM ClassAverages ca
            //         JOIN filiere_modele_matiere fmm ON ca.filiere_modele_matiere_id = fmm.id
            //         GROUP BY fmm.prof_id
            //         ORDER BY moyenne_prof DESC
            //         LIMIT 2
            //     ),
            //     BestPerformingTeachers AS (
            //         SELECT 
            //             u.nom AS fullname,
            //             d.nom AS dep
            //         FROM ProfessorRanking pr
            //         JOIN prof p ON pr.prof_id = p.id
            //         JOIN utilisateur u ON p.id = u.id
            //         JOIN departement d ON p.departement_id = d.id
            //     )
            //     SELECT 
            //         JSON_OBJECT(
            //             'total_students', (SELECT COUNT(*) FROM eleve),
            //             'active_students', (SELECT COUNT(*) FROM utilisateur WHERE is_active = 1 AND role = 1),
            //             'inactive_students', (SELECT COUNT(*) FROM utilisateur WHERE is_active = 0 AND role = 1),
            //             'total_teachers', (SELECT COUNT(*) FROM prof),
            //             'active_teachers', (SELECT COUNT(*) FROM utilisateur WHERE is_active = 1 AND role = 2),
            //             'inactive_teachers', (SELECT COUNT(*) FROM utilisateur WHERE is_active = 0 AND role = 2),
            //             'best_performers_students', (SELECT JSON_ARRAYAGG(JSON_OBJECT('fullname', fullname, 'filiere', filiere, 'semestre', semestre)) FROM BestPerformingStudents),
            //             'best_performers_teachers', (SELECT JSON_ARRAYAGG(JSON_OBJECT('fullname', fullname, 'dep', dep)) FROM BestPerformingTeachers)
            //         ) AS result;
            // `);

            const result = {
                total_students: 20,
                active_students: 20,
                inactive_students: 0,
                total_teachers: 7,
                active_teachers: 7,
                inactive_teachers: 0,
                best_performers_students: [
                    {
                        fullname: "BATTAH Sara",
                        filiere: "GI",
                        semestre: 1
                    },
                    {
                        fullname: " ARJDAL HECHAM",
                        filiere: "GI",
                        semestre: 1
                    }
                ],
                best_performers_teachers: [
                    {
                        fullname: "Youssef Rachidi",
                        dep: "informatique"
                    },
                    {
                        fullname: "Hamza Hamout",
                        dep: "informatique"
                    }
                ]
            };

            return result;
            //return result[0]; // Adjust based on your DB library (e.g., MySQL, PostgreSQL)
        } catch (error) {
            console.error('Error fetching admin dashboard:', error);
            throw error;
        }
    }
}

module.exports = AdminDashboardModel;

// const result = {
            //     total_students: 364,
            //     active_students: 3652,
            //     inactive_students: 2,
            //     total_teachers: 284,
            //     active_teachers: 254,
            //     inactive_teachers: 30,
            //     best_performers_students: [
            //         {
            //             fullname: "Saber OUBELLA",
            //             filiere: "GI",
            //             semestre: 4
            //         },
            //         {
            //             fullname: "Ayoub Didi",
            //             filiere: "GI",
            //             semestre: 4
            //         }
            //     ],
            //     best_performers_teachers: [
            //         {
            //             fullname: "Asimi Younness",
            //             dep: "informatique"
            //         },
            //         {
            //             fullname: "Sabri",
            //             dep: "informatique"
            //         }
            //     ]
            // };

