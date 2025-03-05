const db = require('../config/db');

class Teacher {
    static async getAll(limit, offset) {
        const allowedRowsPerPage = [5, 10, 15, 20];
        if (!allowedRowsPerPage.includes(limit)) {
            limit = allowedRowsPerPage[0];
        }

        //const query = 'SELECT * FROM teachers LIMIT ? OFFSET ?';
        //const teachers = await db.query(query, [limit, offset]);
        const teachers = [
            {
              "id": 1,
              "nom": "John",
              "prenom": "Doe",
              "gender": "Male",
              "departement": "dep mathematique",
              "email": "johndoe@example.com",
              "phone": "+1234567890"
            },
            {
              "id": 2,
              "nom": "Jane",
              "prenom": "Smith",
              "gender": "Female",
              "departement": "dep informatique",
              "email": "janesmith@example.com",
              "phone": "+0987654321"
            },
            {
              "id": 3,
              "nom": "Alice",
              "prenom": "Johnson",
              "gender": "Female",
              "departement": "dep mathematique",
              "email": "alicejohnson@example.com",
              "phone": "+1122334455"
            },
            {
              "id": 4,
              "nom": "Robert",
              "prenom": "Brown",
              "gender": "Male",
              "departement": "dep informatique",
              "email": "robertbrown@example.com",
              "phone": "+2233445566"
            },
            {
              "id": 5,
              "nom": "Emily",
              "prenom": "Davis",
              "gender": "Female",
              "departement": "dep mathematique",
              "email": "emilydavis@example.com",
              "phone": "+3344556677"
            },
            {
              "id": 6,
              "nom": "Michael",
              "prenom": "Wilson",
              "gender": "Male",
              "departement": "dep informatique",
              "email": "michaelwilson@example.com",
              "phone": "+4455667788"
            }
          ]
        
        const paginatedTeachers = teachers.slice(offset, offset + limit);
        return paginatedTeachers;
    }

    static async getTotalTeachersCount() {
        // query the db here
        return 5;
    }

    static async getTeacherInfo() {
        const teacherInfo = {
            id: 1,
            is_active: true,
            img_url: 'teacher_profile_picture.jpg',
            nom: 'Oubella',
            prenom: 'Saber',
            gender: 'Male',
            date_naissance: '2005-07-01',
            telephone: '+212 705-213259',
            email: 'oubellasaber@gmail.com',
            adresse_permanente: 'Hay tayert el ouleya bloc D rue 8 N 43',
            adresse_actuelle: 'Hay tayert el ouleya bloc D rue 8 N 43'

        };

        return teacherInfo;
    }

    static async getTeacherDetails(id) {
        // const query = `
        //     SELECT id, 
        //            is_active, 
        //            img_url, 
        //            nom, 
        //            prenom, 
        //            CASE 
        //                WHEN gender = 0 THEN 'male' 
        //                ELSE 'female' 
        //            END AS gender, 
        //            date_naissance, 
        //            telephone, 
        //            email,
        //            adresse_permanente,
        //            adresse_actuelle    
        //     FROM utilisateur 
        //     WHERE id = ?`;
        
        // const [teacherDetails] = await db.query(query, [id]);
        // return teacherDetails;    

        const teacherDetails = {
            adresse_permanente: 'Hay tayert el ouleya bloc D rue 8 N 43',
            adresse_actuelle: 'Hay tayert el ouleya bloc D rue 8 N 43'
        };

        return teacherDetails;
    }

    static async getTeacherTimeTable(id) {
        const teacherTimeTable = {
            "timetable": {
              "Monday": [
                {
                  "time": "08:00 - 10:00",
                  "subject": "English",
                  "type": "Cours",
                  "professor": "Prof.",
                  "room": "Salle 1"
                },
                {
                  "time": "10:00 - 12:00",
                  "subject": "French & TEC",
                  "type": "Cours",
                  "professor": "Prof.",
                  "room": "Salle 1"
                }
              ],
              "Tuesday": [
                {
                  "time": "08:00 - 10:00",
                  "subject": "Alg",
                  "type": "Cours",
                  "professor": "Prof. Rachidi",
                  "room": "Salle 1"
                },
                {
                  "time": "10:00 - 12:00",
                  "subject": "Prog C",
                  "type": "Cours",
                  "professor": "Prof. Rachidi",
                  "room": "Salle 1"
                }
              ],
              "Wednesday": [
                {
                  "time": "08:00 - 10:00",
                  "subject": "CNAO",
                  "type": "Cours",
                  "professor": "Prof. Hamout",
                  "room": "Salle 1"
                },
                {
                  "time": "10:00 - 12:00",
                  "subject": "CLII",
                  "type": "Cours",
                  "professor": "Prof. SABRI",
                  "room": "Salle 1"
                }
              ],
              "Thursday": [
                {
                  "time": "08:00 - 10:00",
                  "subject": "Algebra",
                  "type": "Cours",
                  "professor": "Prof. Elmrabty",
                  "room": "Salle 1"
                },
                {
                  "time": "10:00 - 12:00",
                  "subject": "Analysis",
                  "type": "Cours",
                  "professor": "Prof. Tifroute",
                  "room": "Salle 1"
                }
              ],
              "Friday": [],
              "Saturday": []
            }
          };
          
          return teacherTimeTable;
    }
}

module.exports = Teacher;