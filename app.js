const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var mysql = require('mysql2');
require('dotenv').config();
const path = require('path');
const expressValidator = require('express-validator');
var connection = require('express-myconnection');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');
const app = express();
const indexRoutes = require('./routes/index');
const playerRoutes = require('./routes/player.routes');
const homeRoutes = require('./routes/index.routes');
const port = 3000;



// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER, // your mysql user
    password : process.env.MYSQLPASSWORD, // your mysql password
    database:process.env.MYSQLDATABASE // your database name
});

app.use(
    connection(mysql, {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER, // your mysql user
        password : process.env.MYSQLPASSWORD, // your mysql password
        port : process.env.MYSQLPORT, //port mysql
        database:process.env.MYSQLDATABASE // your database name
    }, 'pool') //or single

);


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs');
app.set('view engine', 'jade'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(session({ secret: "secretpass123456" }));
app.use(flash());
app.use(fileUpload()); // configure fileupload
app.use(expressValidator())
    // routes for the app
app.use('/', indexRoutes);
app.use('/main', homeRoutes);
app.use('/player', playerRoutes);
app.get('*', function(req, res, next) {
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
