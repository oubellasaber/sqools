const db = require('../config/db'); // Your database connection

class AdminDashboardModel {
    static async getAdminDashboard() {
        try {
            // const result = await db.query(`
            //     SELECT action, timestamp 
            //     FROM activities 
            //     ORDER BY timestamp DESC LIMIT 10;
            // `);

            const result = {
                total_students: 3654,
                active_students: 3652,
                inactive_students: 2,
                total_teachers: 284,
                active_teachers: 254,
                inactive_teachers: 30,
                best_performers_students: [
                    {
                        fullname: "Saber OUBELLA",
                        filiere: "GI",
                        semestre: 4
                    },
                    {
                        fullname: "Ayoub Didi",
                        filiere: "GI",
                        semestre: 4
                    }
                ],
                best_performers_teachers: [
                    {
                        fullname: "Asimi Younness",
                        dep: "informatique"
                    },
                    {
                        fullname: "Sabri",
                        dep: "informatique"
                    }
                ]
            };
            return result; // Assuming this returns an array of activity objects
        } catch (err) {
            console.error('Error fetching admin dashbaord:', err);
            throw err;
        }
    }
}

module.exports = AdminDashboardModel;