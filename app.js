const express= require('express');
const path = require('path');
const bodyParser = require('body-parser');

const server=express();

server.set('view engine', 'ejs');
// server.set('views', 'views');

server.set('views', path.join(__dirname, 'views'));

server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path.join(__dirname, 'public')));


const indexRoutes = require('./routes/index'); 
const adminRoutes = require('./routes/admin'); 

// Use the routes
server.use(indexRoutes); 
server.use(adminRoutes); 

const port = process.env.PORT || 3002;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
