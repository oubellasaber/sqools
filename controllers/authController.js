const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

class AuthController {
    // Render the login page (static method)
    static showLogin(req, res) {
        res.render('layouts/auth-layout', {
            title: 'Login', // Pass the title to the layout
            auth_page_path: 'login', // Pass the path to the login page
        });
    }

    // Render the registration page (static method)
    // static showRegister(req, res) {
    //     res.render('auth/register');
    // }

    // Handle user registration (static method)
    // static async register(req, res) {
    //     const { email, password } = req.body;
    //     try {
    //         const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    //         await User.createUser(email, hashedPassword); // Create the user in the database
    //         res.redirect('auth/login');
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Error during registration');
    //     }
    // }

    // Handle user login (static method)
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email); // Find the user by email
            if (user && await bcrypt.compare(password, user.hashed_password)) { // Compare passwords
                req.session.userId = user.id; // Set the session
                res.redirect('admin/dashboard');
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error during login');
        }
    }

    // Handle user logout (static method)
    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('auth/login');
        });
    }
}

module.exports = AuthController; // Export the class itself (no instance needed)