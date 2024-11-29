// Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const cors = require('cors');
const moment = require('moment');
const dotenv = require('dotenv');
const http = require('http');

// Config Files
const httpsOptions = require('./config/https');
const favicon = require('./config/favicon');
const Connection = require('./config/connection');

// Middleware
const userAgent = require('./middleware/useragent');
var checklogin = require("./middleware/userverification.js")

// Initialize App
dotenv.config();
const app = express();
const port = process.env.PORT || 7690;

// Database Connection Middleware
const dbConnection = new Connection();
app.use(dbConnection.Database.bind(dbConnection));

// Set View Engine
app.set('view engine', 'ejs');


// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(cookieParser());
app.use(connectFlash());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'S0m3th1ngV3ryS3cur3',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}));


// Global Variables for Views
app.locals.moment = moment;
app.locals.shortDateFormat = 'Do MMMM, YYYY HH:MM:SS';


// Middleware to Set User Data in Response Locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    const { UserName, token } = req.cookies;
    if (!token || !UserName) {
        res.locals.is_User = false;
        res.locals.user = '';
        res.locals.UserName = '';
        res.locals.Roll = '';
    } else {
        res.locals.is_User = true;
        res.locals.user = token;
        res.locals.UserName = UserName;
        res.locals.Roll = req.session.Roll || 'guest';
    }
    next();
});


// Favicon
favicon(app);



// Static Files
app.use('/css', express.static(__dirname + '/public/css'));



// Routes
app.use('/', userAgent.analyzer, require('./routes/MainRoutes'));



// 404 Error Handler
app.all('*', (req, res) => {
    res.status(404).render('../views/main/error_404.ejs', {
        title: 'Error 404'
    });
});




// Start Server
http.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);
});