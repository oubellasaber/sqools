SELECT 
    json_object(
        'total_students', (SELECT COUNT(*) FROM eleve),
        'active_students', (SELECT COUNT(*) FROM utilisateur WHERE is_active  = 1 AND role = 1),
        'inactive_students', (SELECT COUNT(*) FROM utilisateur WHERE is_active  = 0 AND role = 1),
        'total_teachers', (SELECT COUNT(*) FROM prof),
        'active_teachers', (SELECT COUNT(*) FROM utilisateur WHERE is_active  = 1 AND role = 2),
        'inactive_teachers', (SELECT COUNT(*) FROM utilisateur WHERE is_active  = 0 AND role = 2)
    ) AS result;

WITH RankedSemesters AS (
    SELECT
        c.id AS classe_id, 
        s.id AS semestre_id,
        f.nom AS filiere,
        s.semestre_number,
        ROW_NUMBER() OVER (PARTITION BY f.id ORDER BY s.start_date DESC) AS `rank`
    FROM 
        classe c
    JOIN 
        filiere f ON f.id = c.filiere_id
    JOIN 
        semestre s ON s.id = c.semestre_id
),
RankedStudents AS (
    SELECT 
        u.id AS student_id,
        u.nom, 
        u.prenom,
        f.nom AS filiere,
        s.semestre_number AS semestre,
        AVG(n.score) AS avg_grade,
        ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY AVG(n.score) DESC) AS student_rank
    FROM 
        utilisateur u
    JOIN 
        eleve e ON u.id = e.id
    JOIN 
        classe c ON e.filiere_id = c.filiere_id
    JOIN 
        filiere f ON f.id = c.filiere_id
    JOIN 
        semestre s ON s.id = c.semestre_id
    JOIN 
        note n ON n.eleve_id = e.i
    GROUP BY 
        u.id, u.nom, u.prenom, f.nom, s.semestre_number, c.id
)
SELECT 
    rs.filiere,
    rs.semestre_number AS semestre,
    rstu.nom,
    rstu.prenom,
    rstu.avg_grade
FROM 
    RankedSemesters rs
JOIN 
    RankedStudents rstu 
ON 
    rs.filiere = rstu.filiere 
    AND rs.semestre_number = rstu.semestre
WHERE 
    rs.rank <= 2 
    AND rstu.student_rank <= 2;

WITH RankedSemesters AS (
    SELECT
        c.id AS classe_id, 
        s.id AS semestre_id,
        f.nom AS filiere,
        s.semestre_number,
        ROW_NUMBER() OVER (PARTITION BY f.id ORDER BY s.start_date DESC) AS `rank`
    FROM 
        classe c
    JOIN 
        filiere f ON f.id = c.filiere_id
    JOIN 
        semestre s ON s.id = c.semestre_id
), 
ClassAverages AS (
    SELECT 
        ec.section_id AS classe_id,
        n.filiere_modele_matiere_id,
        AVG(n.score) AS moyenne_matiere
    FROM note n
    JOIN eleve_classe ec ON n.eleve_id = ec.eleve_id
    JOIN filiere_modele_matiere fmm ON n.filiere_modele_matiere_id = fmm.id
    JOIN RankedSemesters rs ON ec.section_id = rs.classe_id
    WHERE rs.rank IN (1, 2)-- Prend uniquement le semestre le plus récent par filière 
    GROUP BY ec.section_id, n.filiere_modele_matiere_id
),
ProfessorRanking AS (
    SELECT 
        fmm.prof_id,
        AVG(ca.moyenne_matiere) AS moyenne_prof
    FROM ClassAverages ca
    JOIN filiere_modele_matiere fmm ON ca.filiere_modele_matiere_id = fmm.id
    GROUP BY fmm.prof_id
    ORDER BY moyenne_prof DESC
    LIMIT 2
)
SELECT 
    p.id AS prof_id,
    u.nom,
    u.prenom,
    pr.moyenne_prof
FROM ProfessorRanking pr
JOIN prof p ON pr.prof_id = p.id
JOIN utilisateur u ON p.id = u.id;
1️⃣ Ranked Semesters (Using ROW_NUMBER)
Goal: Identify the latest semester for each filière.
Method:
Used ROW_NUMBER() with PARTITION BY f.id to group by filière.
Ordered semesters by s.start_date DESC to ensure the most recent semester gets rank = 1.
Reason: This ensures we only process data from the latest semester when calculating averages.
2️⃣ Class Averages Calculation
Goal: Compute the average scores per subject for each class.
Method:
Filtered the dataset to only include classes from the latest semester (rs.rank = 1).
Used AVG(n.score) to compute the average per subject per class.
Reason: This avoids outdated data and keeps calculations relevant.
3️⃣ Professor Ranking
Goal: Rank professors based on their students' average scores.
Method:
Linked the subjects (filiere_modele_matiere) to professors.
Aggregated class averages by professor.
Ordered results by descending AVG(moyenne_matiere), keeping only the top 2 professors.
Reason: This identifies which professors had the best student performance.
4️⃣ Final Selection of Top Professors
Goal: Retrieve professor details.
Method:
Joined prof and utilisateur tables to fetch names and IDs.
Reason: Ensures that results are human-readable and easily usable in an application.
