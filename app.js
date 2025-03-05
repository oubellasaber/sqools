const express = require('express');
require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // Session store for raw MySQL
const db = require('./config/db'); // Your MySQL connection pool
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Create a MySQL session store
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        },
    },
});

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 86400000 },
}));

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the "public" folder

// View engine setup
app.set('view engine', 'ejs'); // Use EJS as the templating engine
app.set('views', 'views'); // Set the views directory

// Routes
app.use('/', authRoutes); // Use the auth routes
app.use('/admin', adminRoutes); // Admin routes

// Start server
const PORT = 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));