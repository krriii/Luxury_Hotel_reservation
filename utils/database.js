const Sequelize = require('sequelize');

// Database configuration
const db = {
    host: 'localhost',
    user: 'root',
    database: 'luxury_hotel_reservation',
    password: '1234',
    dialect: 'mysql',
};

// Database connection
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    // Additional options
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // Disable logging of SQL queries in console (optional)
    logging: false
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
