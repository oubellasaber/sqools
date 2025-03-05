const db = require('../config/db');

class Student {
    static async getAll(limit, offset) {
        const allowedRowsPerPage = [5, 10, 15, 20];
        if (!allowedRowsPerPage.includes(limit)) {
            limit = allowedRowsPerPage[0];
        }

        //const query = 'SELECT * FROM students LIMIT ? OFFSET ?';
        //const students = await db.query(query, [limit, offset]);
        const students = [
            {
                admission_no: 'AD9892434',
                name: 'Janet',
                filiere: 'GI',
                semestre: '1',
                section: '1',
                gender: 'Male',
                dob: '10 Jan 2005'
            },
            {
                admission_no: 'AD9892435',
                name: 'Joann',
                filiere: 'GI',
                semestre: '2',
                section: '2',
                gender: 'Female',
                dob: '15 Feb 2005'
            },
            {
                admission_no: 'AD9892436',
                name: 'Kathleen',
                filiere: 'GI',
                semestre: '3',
                section: '3',
                gender: 'Female',
                dob: '20 Mar 2005'
            },
            {
                admission_no: 'AD9892437',
                name: 'John',
                filiere: 'GI',
                semestre: '4',
                section: '4',
                gender: 'Male',
                dob: '25 Apr 2005'
            },
            {
                admission_no: 'AD9892438',
                name: 'Doe',
                filiere: 'GI',
                semestre: '5',
                section: '5',
                gender: 'Male',
                dob: '30 May 2005'
            },
            {
                admission_no: 'AD9892434',
                name: 'Janet',
                filiere: 'GI',
                semestre: '1',
                section: '1',
                gender: 'Male',
                dob: '10 Jan 2005'
            },
            {
                admission_no: 'AD9892435',
                name: 'Joann',
                filiere: 'GI',
                semestre: '2',
                section: '2',
                gender: 'Female',
                dob: '15 Feb 2005'
            },
            {
                admission_no: 'AD9892436',
                name: 'Kathleen',
                filiere: 'GI',
                semestre: '3',
                section: '3',
                gender: 'Female',
                dob: '20 Mar 2005'
            },
            {
                admission_no: 'AD9892437',
                name: 'John',
                filiere: 'GI',
                semestre: '4',
                section: '4',
                gender: 'Male',
                dob: '25 Apr 2005'
            },
            {
                admission_no: 'AD9892438',
                name: 'Doe',
                filiere: 'GI',
                semestre: '5',
                section: '5',
                gender: 'Male',
                dob: '30 May 2005'
            },
            {
                admission_no: 'AD9892434',
                name: 'Janet',
                filiere: 'GI',
                semestre: '1',
                section: '1',
                gender: 'Male',
                dob: '10 Jan 2005'
            },
            {
                admission_no: 'AD9892435',
                name: 'Joann',
                filiere: 'GI',
                semestre: '2',
                section: '2',
                gender: 'Female',
                dob: '15 Feb 2005'
            },
            {
                admission_no: 'AD9892436',
                name: 'Kathleen',
                filiere: 'GI',
                semestre: '3',
                section: '3',
                gender: 'Female',
                dob: '20 Mar 2005'
            },
            {
                admission_no: 'AD9892437',
                name: 'John',
                filiere: 'GI',
                semestre: '4',
                section: '4',
                gender: 'Male',
                dob: '25 Apr 2005'
            },
            {
                admission_no: 'AD9892438',
                name: 'Doe',
                filiere: 'GI',
                semestre: '5',
                section: '5',
                gender: 'Male',
                dob: '30 May 2005'
            }
        ];
        
        const paginatedStudents = students.slice(offset, offset + limit);
        return paginatedStudents;
    }

    static async getTotalStudentCount() {
        //const query = 'SELECT COUNT(*) as total FROM students';
        //const result = await db.query(query);
        //return result[0].total;
        return 15;
    }

    static async getStudentInfo(id) {
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
        
        // const [studentDetails] = await db.query(query, [id]);
        // return studentDetails;    

        const studentInfo = {
            id: id,
            is_active: true,
            img_url: 'student_profile_picture.jpg',
            nom: 'Oubella',
            prenom: 'Saber',
            gender: 'Male',
            date_naissance: '2005-07-01',
            telephone: '+212 705-213259',
            email: 'oubellasaber@gmail.com',
            adresse_permanente: 'Hay tayert el ouleya bloc D rue 8 N 43',
            adresse_actuelle: 'Hay tayert el ouleya bloc D rue 8 N 43'

        };

        return studentInfo;
    }
    
    static async getStudentDetails(id) {
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
        
        // const [studentDetails] = await db.query(query, [id]);
        // return studentDetails;    

        const studentDetails = {
            adresse_permanente: 'Hay tayert el ouleya bloc D rue 8 N 43',
            adresse_actuelle: 'Hay tayert el ouleya bloc D rue 8 N 43'
        };

        return studentDetails;
    }
    
    static async getStudentTimeTable(id) {
        const studentTimeTable = {
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
          
          return studentTimeTable;
    }

    static async getTotalStudentAttendance(id) {
        return 1;
    }

    static async getStudentAttendance(id) {
        const studentAttendance = [
            {
                modele: "Angalais - TEC",
                subject: "Anglais",
                date: "10/01/2025",
                justified: false,
                justification: null
            },
            {
                modele: "Angalais - TEC",
                subject: "Anglais",
                date: "11/01/2025",
                justified: true,
                justification: "medical treatment"
            }
        ];

        return studentAttendance;
    }

    static async getStudentExamResult(id) {
        const studentExamResults = {
            "semesters": [
              {
                "semester": 1,
                "subjects": [
                  {
                    "name": "Anglais",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 18
                  },
                  {
                    "name": "TEC",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 18
                  },
                  {
                    "name": "Algo",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 18
                  },
                  {
                    "name": "Prog C",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 13
                  },
                  {
                    "name": "CNAO",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 10
                  },
                  {
                    "name": "CLII",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 13
                  },
                  {
                    "name": "Algebre",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 10
                  },
                  {
                    "name": "Analyse",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 10
                  }
                ]
              },
              {
                "semester": 2,
                "subjects": [
                  {
                    "name": "Anglais",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 18
                  },
                  {
                    "name": "TEC",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 18
                  },
                  {
                    "name": "Algo",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 18
                  },
                  {
                    "name": "Prog C",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 13
                  },
                  {
                    "name": "CNAO",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 10
                  },
                  {
                    "name": "CLII",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 13
                  },
                  {
                    "name": "Algebre",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 10
                  },
                  {
                    "name": "Analyse",
                    "max_marks": 20,
                    "min_marks": 12,
                    "marks_obtained": 10
                  }
                ]
              }
            ]
          }
          

        return studentExamResults;
    }
}

module.exports = Student;