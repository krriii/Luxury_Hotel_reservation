const express= require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const server=express();

// Session configuration
server.use(session({
    secret: '1234',  // Replace with a strong, unique secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using https
  }));


server.set('view engine', 'ejs');
// server.set('views', 'views');


server.set('views', path.join(__dirname, 'views'));

//middleware
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to make session data available to all views
server.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

  //routes
const indexRoutes = require('./routes/index'); 
const adminRoutes = require('./routes/admin'); 

// Use the routes
server.use(indexRoutes); 
server.use(adminRoutes); 

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { 
        pageTitle: 'Error', 
        error: 'An error occurred while processing your request.' 
    });
});

// 404 Not Found middleware
server.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
//const port = process.env.PORT || 3002;

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// Sync models with database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        // Start the server after successful database sync
        server.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log('This error occurred', error);
    });



module.exports = server;