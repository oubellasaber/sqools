const db = require('../config/db');

class Teacher {
  static async getAll(limit, offset) {
    const allowedRowsPerPage = [5, 10, 15, 20];
    if (!allowedRowsPerPage.includes(limit)) {
        limit = allowedRowsPerPage[0];
    }

    const query = `
        SELECT
            p.id,
            u.nom,
            u.prenom,
            CASE u.gender
                WHEN 0 THEN 'Male'
                WHEN 1 THEN 'Female'
                ELSE 'Unknown'
            END AS gender,
            d.nom AS departement,
            u.email,
            u.telephone AS phone
        FROM prof p
        JOIN utilisateur u ON p.id = u.id
        JOIN departement d ON p.departement_id = d.id
        LIMIT ? OFFSET ?;
    `;

    try {
        const [teachers] = await db.query(query, [limit, offset]);

        return teachers;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
    }
  }

    static async getTotalTeachersCount() {
      const query = `SELECT COUNT(*) as total FROM prof`;

      const [rows] = await db.query(query);
      return rows[0].total;
    }

    // static async getTeacherInfo() {
    //     const teacherInfo = {
    //         id: 1,
    //         is_active: true,
    //         img_url: 'teacher_profile_picture.jpg',
    //         nom: 'Oubella',
    //         prenom: 'Saber',
    //         gender: 'Male',
    //         date_naissance: '2005-07-01',
    //         telephone: '+212 705-213259',
    //         email: 'oubellasaber@gmail.com',
    //         adresse_permanente: 'Hay tayert el ouleya bloc D rue 8 N 43',
    //         adresse_actuelle: 'Hay tayert el ouleya bloc D rue 8 N 43'

    //     };

    //     return teacherInfo;
    // }

    static async getTeacherInfo(teacherId) {
      try {
          const query = `
              SELECT
                  u.id,
                  u.nom,
                  u.prenom,
                  CASE gender
                    WHEN 0 THEN 'Homme'
                    WHEN 1 THEN 'Femme'
                    ELSE 'Unknown'
                  END AS gender,
                  DATE_FORMAT(date_naissance, '%d/%m/%Y') as date_naissance,
                  u.telephone,
                  u.email,
                  u.adresse_permanente,
                  u.adresse_actuelle,
                  u.img_url,
                  u.is_active
              FROM utilisateur u
              JOIN prof p ON u.id = p.id
              WHERE u.id = ?;
          `;
  
          const [teacherInfo] = await db.query(query, [teacherId]);
  
          if (teacherInfo.length > 0) {
              return teacherInfo[0];
          } else {
              return { message: "Teacher not found" };
          }
  
      } catch (error) {
          // Handle error (e.g., log it and return an empty object or error message)
          console.error('Error fetching teacher info:', error);
          throw error;
      }
  }

    static async getTeacherDetails(id) {  
      const query = `
          SELECT 
            adresse_permanente,
            adresse_actuelle
          FROM utilisateur
          WHERE id = ?`;

      const [studentDetails] = await db.query(query, [id]);
      return studentDetails[0];
    }

    // static async getTeacherTimeTable(id) {
    //     const teacherTimeTable = {
    //         "timetable": {
    //           "Monday": [
    //             {
    //               "time": "08:00 - 10:00",
    //               "subject": "Prog c",
    //               "type": "Cours",
    //               "class": "GI",
    //               "section": "A",
    //               "room": "Salle 1"
    //             },
    //             {
    //               "time": "10:15 - 12:15",
    //               "subject": "Prog c",
    //               "type": "Cours",
    //               "class": "GI",
    //               "section": "B",
    //               "room": "Salle 1"
    //             },
    //             {
    //               "time": "02:30 - 04:00",
    //               "subject": "Prog c",
    //               "type": "TP",
    //               "class": "GI",
    //               "section": "A - B",
    //               "room": "Salle 08"
    //             }
    //           ],
    //           "Wednesday": [
    //             {
    //               "time": "08:00 - 10:00",
    //               "subject": "Prog c",
    //               "type": "Cours",
    //               "class": "GI",
    //               "section": "A",
    //               "room": "Salle 1"
    //             },
    //             {
    //               "time": "10:15 - 12:15",
    //               "subject": "Prog c",
    //               "type": "Cours",
    //               "class": "GI",
    //               "section": "B",
    //               "room": "Salle 1"
    //             },
    //             {
    //               "time": "02:30 - 04:00",
    //               "subject": "Prog c",
    //               "type": "TP",
    //               "class": "GI",
    //               "section": "A - B",
    //               "room": "Salle 08"
    //             }
    //           ]
    //         }
    //       };          
          
    //       return teacherTimeTable;
    // }

    static async getTeacherTimeTable(teacherId) {
      try {
          // SQL query to fetch the teacher's timetable
          const query = `
              SELECT 
                  DAYNAME(pt.datetime) AS day_of_week,
                  CONCAT(
                      TIME_FORMAT(pt.datetime, '%H:%i'), 
                      ' - ', 
                      TIME_FORMAT(ADDTIME(TIME(pt.datetime), pt.duration), '%H:%i')
                  ) AS time_slot,
                  m.nom AS subject,
                  CASE pt.science_type
                      WHEN 1 THEN 'Cours'
                      WHEN 2 THEN 'TD'
                      WHEN 3 THEN 'TP'
                      ELSE 'Other'
                  END AS type,
                  CONCAT('Prof. ', u_prof.nom) AS professor,
                  CONCAT('Salle ', c.nom) AS room
              FROM prof_timetable pt
              JOIN prof p ON p.id = pt.prof_id
              JOIN utilisateur u_prof ON u_prof.id = p.id
              JOIN filiere_modele_matiere fmm ON fmm.id = pt.filiere_modele_matiere_id
              JOIN matiere m ON m.id = fmm.matiere_id
              JOIN class_room c ON c.id = pt.classroom_id
              WHERE pt.prof_id = ?
              ORDER BY pt.datetime ASC;
          `;
          
          // Execute the query
          const [rows] = await db.query(query, [teacherId]);
          
          // Initialize timetable structure with empty arrays for each day
          const timetable = {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
              Saturday: [],
              Sunday: []
          };
  
          // Process each row from the query results
          rows.forEach((row) => {
              // Add each class to the appropriate day's array
              if (timetable[row.day_of_week]) {
                  timetable[row.day_of_week].push({
                      time: row.time_slot,
                      subject: row.subject,
                      type: row.type,
                      professor: row.professor,
                      room: row.room
                  });
              }
          });
  
          // Return the formatted timetable in the desired JSON format
          return { timetable };
      } catch (error) {
          console.error('Error fetching teacher timetable:', error);
          throw error;
      }
  }
}

module.exports = Teacher;

//const query = 'SELECT * FROM teachers LIMIT ? OFFSET ?';
//const teachers = await db.query(query, [limit, offset]);
//   const teachers = [
//     {
//       "id": 1,
//       "nom": "John",
//       "prenom": "Doe",
//       "gender": "Male",
//       "departement": "dep mathematique",
//       "email": "johndoe@example.com",
//       "phone": "+1234567890"
//     },
//     {
//       "id": 2,
//       "nom": "Jane",
//       "prenom": "Smith",
//       "gender": "Female",
//       "departement": "dep informatique",
//       "email": "janesmith@example.com",
//       "phone": "+0987654321"
//     },
//     {
//       "id": 3,
//       "nom": "Alice",
//       "prenom": "Johnson",
//       "gender": "Female",
//       "departement": "dep mathematique",
//       "email": "alicejohnson@example.com",
//       "phone": "+1122334455"
//     },
//     {
//       "id": 4,
//       "nom": "Robert",
//       "prenom": "Brown",
//       "gender": "Male",
//       "departement": "dep informatique",
//       "email": "robertbrown@example.com",
//       "phone": "+2233445566"
//     },
//     {
//       "id": 5,
//       "nom": "Emily",
//       "prenom": "Davis",
//       "gender": "Female",
//       "departement": "dep mathematique",
//       "email": "emilydavis@example.com",
//       "phone": "+3344556677"
//     },
//     {
//       "id": 6,
//       "nom": "Michael",
//       "prenom": "Wilson",
//       "gender": "Male",
//       "departement": "dep informatique",
//       "email": "michaelwilson@example.com",
//       "phone": "+4455667788"
//     }
//   ]

// const paginatedTeachers = teachers.slice(offset, offset + limit);
// return paginatedTeachers;