const db = require('../config/db');

class User {
    // Find a user by email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM utilisateur WHERE email = ?', [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM utilisateur WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Create a new user
    static async createUser(email, password) {
        // table schema changed
        // const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        // return result.insertId;
    }
}

module.exports = User;