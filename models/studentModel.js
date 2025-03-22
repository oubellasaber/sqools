const db = require('../config/db')

class Student {
  static async getAll (limit, offset) {
    const allowedRowsPerPage = [5, 10, 15, 20]
    if (!allowedRowsPerPage.includes(limit)) {
      limit = allowedRowsPerPage[0] // Default to first allowed value
    }

    const query = `
        SELECT 
            u.id, 
            CONCAT(u.nom, ' ', u.prenom) AS name,
            f.nom AS filiere,
            sem.semestre_number AS semestre,
            sec.nom AS section,
            CASE u.gender
                WHEN 0 THEN 'Male'
                WHEN 1 THEN 'Female'
                ELSE 'Unknown'
            END AS gender,
            DATE_FORMAT(date_naissance, '%d/%m/%Y') as dob,  -- "DD-MM-YYYY"
            sec.nom AS section_name
        FROM eleve e
        JOIN utilisateur u ON u.id = e.id
        JOIN filiere f ON f.id = e.filiere_id
        JOIN eleve_classe ec ON ec.eleve_id = e.id
        JOIN section sec ON sec.id = ec.section_id
        JOIN classe c ON c.id = sec.classe_id
        JOIN semestre sem ON sem.id = c.semestre_id
        -- Subquery to get the latest eleve_classe entry per student
        WHERE ec.id = (
            SELECT MAX(ec_sub.id) 
            FROM eleve_classe ec_sub 
            WHERE ec_sub.eleve_id = e.id
        )
        ORDER BY u.id  -- You can order by the student ID or any other relevant field
        LIMIT ? OFFSET ?;
    `;

    
    try {
      const [students] = await db.query(query, [limit, offset])
      return students
    } catch (error) {
      console.error('Error fetching students:', error)
      throw error
    }
  }

  static async getTotalStudentCount() {
    const query = 'SELECT COUNT(*) as total FROM eleve';
    const [rows] = await db.query(query);
    return rows[0].total;
  }

  static async getStudentInfo (id) {
    const query = `
        SELECT id,
               is_active,
               img_url,
               nom,
               prenom,
               CASE gender
                  WHEN 0 THEN 'Homme'
                  WHEN 1 THEN 'Femme'
                 ELSE 'Unknown'
               END AS gender,
               DATE_FORMAT(date_naissance, '%d/%m/%Y') as date_naissance,
               telephone,
               email,
               adresse_permanente,
               adresse_actuelle
        FROM utilisateur
        WHERE id = ?;`;

    const [studentDetails] = await db.query(query, [id]);
    console.log(studentDetails);
    return studentDetails[0];
  }

  static async getStudentDetails (id) {
    const query = `
        SELECT adresse_permanente,
               adresse_actuelle
        FROM utilisateur
        WHERE id = ?`;

     const [studentDetails] = await db.query(query, [id]);
     return studentDetails[0];
  }

  // static async getStudentTimeTable (id) {
  //   const studentTimeTable = {
  //     timetable: {
  //       Monday: [
  //         {
  //           time: '08:00 - 10:00',
  //           subject: 'English',
  //           type: 'Cours',
  //           professor: 'Prof.',
  //           room: 'Salle 1'
  //         },
  //         {
  //           time: '10:00 - 12:00',
  //           subject: 'French & TEC',
  //           type: 'Cours',
  //           professor: 'Prof.',
  //           room: 'Salle 1'
  //         }
  //       ],
  //       Tuesday: [
  //         {
  //           time: '08:00 - 10:00',
  //           subject: 'Alg',
  //           type: 'Cours',
  //           professor: 'Prof. Rachidi',
  //           room: 'Salle 1'
  //         },
  //         {
  //           time: '10:00 - 12:00',
  //           subject: 'Prog C',
  //           type: 'Cours',
  //           professor: 'Prof. Rachidi',
  //           room: 'Salle 1'
  //         }
  //       ],
  //       Wednesday: [
  //         {
  //           time: '08:00 - 10:00',
  //           subject: 'CNAO',
  //           type: 'Cours',
  //           professor: 'Prof. Hamout',
  //           room: 'Salle 1'
  //         },
  //         {
  //           time: '10:00 - 12:00',
  //           subject: 'CLII',
  //           type: 'Cours',
  //           professor: 'Prof. SABRI',
  //           room: 'Salle 1'
  //         }
  //       ],
  //       Thursday: [
  //         {
  //           time: '08:00 - 10:00',
  //           subject: 'Algebra',
  //           type: 'Cours',
  //           professor: 'Prof. Elmrabty',
  //           room: 'Salle 1'
  //         },
  //         {
  //           time: '10:00 - 12:00',
  //           subject: 'Analysis',
  //           type: 'Cours',
  //           professor: 'Prof. Tifroute',
  //           room: 'Salle 1'
  //         }
  //       ],
  //       Friday: [],
  //       Saturday: []
  //     }
  //   }

  //   return studentTimeTable
  // }

  static async getStudentTimeTable(id) {
    try {
      const query = `
          SELECT 
              DAYNAME(pt.datetime) AS day_of_week,
              -- Format the time slots
              CONCAT(
                  TIME_FORMAT(pt.datetime, '%H:%i'), 
                  ' - ', 
                  TIME_FORMAT(
                      ADDTIME(TIME(pt.datetime), pt.duration), 
                      '%H:%i'
                  )
              ) AS time_slot,
              -- Get subject name
              m.nom AS subject,
              -- Get science type (convert to readable format - assumes 1=Cours, 2=TD, 3=TP)
              CASE pt.science_type
                  WHEN 1 THEN 'Cours'
                  WHEN 2 THEN 'TD'
                  WHEN 3 THEN 'TP'
                  ELSE 'Other'
              END AS type,
              -- Get professor name
              CONCAT('Prof. ', u_prof.nom) AS professor,
              -- Get classroom name
              CONCAT('Salle ', c.nom) AS room
          FROM eleve e
          -- Join with utilisateur table
          JOIN utilisateur u ON u.id = e.id
          -- Join with eleve_classe to get the student's classes, using the most recent class (last entry)
          JOIN (
              SELECT eleve_id, MAX(id) AS last_class_id
              FROM eleve_classe
              GROUP BY eleve_id
          ) AS last_class ON last_class.eleve_id = e.id
          JOIN eleve_classe ec ON ec.id = last_class.last_class_id
          -- Join with section and classe to get the class and section details
          JOIN section sec ON sec.id = ec.section_id
          JOIN classe cls ON cls.id = sec.classe_id
          -- Join with filiere to get the student’s filiere
          JOIN filiere f ON f.id = e.filiere_id
          -- Join with semestre to get the current semester
          JOIN semestre sem ON sem.id = cls.semestre_id
          -- Join with filiere_modele to get the model for the filiere
          JOIN filiere_modele fm ON fm.filiere_id = f.id
          -- Join filiere_modele_matiere to match the subject by semestre_num
          JOIN filiere_modele_matiere fmm ON fmm.filiere_modele_id = fm.id AND fmm.semestre_num = sem.semestre_number
          JOIN matiere m ON m.id = fmm.matiere_id
          -- Join with prof for professor details (if needed, you can select professor's name too)
          JOIN prof p ON p.id = fmm.prof_id
          JOIN utilisateur u_prof ON u_prof.id = p.id 
          -- Join with prof_timetable to get scheduling information
          JOIN prof_timetable pt ON pt.prof_id = p.id 
          AND pt.filiere_modele_matiere_id = fmm.id
          -- Join with classroom for classroom details
          JOIN class_room c ON c.id = fmm.classroom_id
          WHERE e.id = ?
          ORDER BY pt.datetime ASC;
      `;
  
      const [rows] = await db.query(query, [id]);
  
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
      for (const row of rows) {
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
      }
  
      // Return the formatted timetable in the desired JSON format
      return { timetable };
    } catch (error) {
      console.error('Error fetching student timetable:', error);
      throw error;
    }
  }
  

  static async getTotalStudentAttendance (id) {
    const query = `SELECT COUNT(*) as total FROM absence where personne_id = ?`;

    const [rows] = await db.query(query, [id]);
    return rows[0].total;
  }

  static async getStudentAttendance(id, limit, offset) {
    const query = `
      SELECT 
          mo.nom AS modele,
          ma.nom AS subject,
          DATE_FORMAT(a.date_absence, '%d/%m/%Y') AS date,
          CASE 
              WHEN a.justifie = 1 THEN TRUE
              ELSE FALSE
          END AS justified,
          a.justification
      FROM absence a
      JOIN filiere_modele_matiere fmm ON fmm.id = a.filiere_modele_matiere_id
      JOIN matiere ma ON ma.id = fmm.matiere_id
      JOIN filiere_modele fm ON fm.id = fmm.filiere_modele_id
      JOIN modele mo ON mo.id = fm.modele_id
      WHERE personne_id = ?
      LIMIT ?
      OFFSET ?;`

    const [studentAttendance] = await db.query(query, [id, limit, offset]);
    
    return studentAttendance.map(attendance => ({
        modele: attendance.modele,
        subject: attendance.subject,
        date: attendance.date,
        justified: !!attendance.justified,
        justification: attendance.justification
    }));
 }

  // const studentAttendance = [
    //   {
    //     modele: 'Angalais - TEC',
    //     subject: 'Anglais',
    //     date: '10/01/2025',
    //     justified: false,
    //     justification: null
    //   },
    //   {
    //     modele: 'Angalais - TEC',
    //     subject: 'Anglais',
    //     date: '11/01/2025',
    //     justified: true,
    //     justification: 'medical treatment'
    //   }
    // ]

//   static async getStudentExamResult (id) {
//     const studentExamResults = {
//       semesters: [
//         {
//           semester: 1,
//           subjects: [
//             {
//               name: 'Anglais',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 18
//             },
//             {
//               name: 'TEC',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 18
//             },
//             {
//               name: 'Algo',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 18
//             },
//             {
//               name: 'Prog C',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 13
//             },
//             {
//               name: 'CNAO',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 10
//             },
//             {
//               name: 'CLII',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 13
//             },
//             {
//               name: 'Algebre',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 10
//             },
//             {
//               name: 'Analyse',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 10
//             }
//           ]
//         },
//         {
//           semester: 2,
//           subjects: [
//             {
//               name: 'Anglais',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 18
//             },
//             {
//               name: 'TEC',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 18
//             },
//             {
//               name: 'Algo',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 18
//             },
//             {
//               name: 'Prog C',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 13
//             },
//             {
//               name: 'CNAO',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 10
//             },
//             {
//               name: 'CLII',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 13
//             },
//             {
//               name: 'Algebre',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 10
//             },
//             {
//               name: 'Analyse',
//               max_marks: 20,
//               min_marks: 12,
//               marks_obtained: 10
//             }
//           ]
//         }
//       ]
//     }

//     return studentExamResults
//   }
// }

static async getStudentExamResult(id) {
  const query = `
      SELECT 
          s.semestre_number as semester,
          m.nom as name,
          20 as max_marks,
          12 as min_marks,
          n.score as marks_obtained
      FROM eleve e
      JOIN note n ON n.eleve_id = e.id
      JOIN filiere_modele_matiere fmm ON fmm.id = n.filiere_modele_matiere_id
      JOIN matiere m ON m.id = fmm.matiere_id
      JOIN semestre s ON s.id = (
          SELECT classe.semestre_id 
          FROM eleve_classe 
          JOIN section ON section.id = eleve_classe.section_id
          JOIN classe ON classe.id = section.classe_id
          WHERE eleve_classe.eleve_id = e.id
      )
      WHERE e.id = ?
      ORDER BY s.semestre_number, m.nom`;

  const results = await db.query(query, [id]);

  // Group results by semester
  const semesterMap = results[0].reduce((acc, result) => {
      if (!acc[result.semester]) {
          acc[result.semester] = {
              semester: result.semester,
              subjects: []
          };
      }
      
      acc[result.semester].subjects.push({
          name: result.name,
          max_marks: result.max_marks,
          min_marks: result.min_marks,
          marks_obtained: result.marks_obtained
      });
      
      return acc;
  }, {});

  return {
      semesters: Object.values(semesterMap)
  };
}
}

module.exports = Student

