//Dependencies_____________________________________|
// Series of npm packages that we will use to give our server useful functionality
const express = require('express');
//The below points our server to a series of "route" files.
const routes = require('./controllers');
// Import the connection object
const sequelize = require('./config/connection');
//Creates path request and response
const path = require('path');
//Imports the custom helper methods
const helpers = require('./utils/helpers');
//Incorporates the custom helper methods
const hbs = exphbs.create({ helpers });
//Imports express-handlers
const exphbs = require('express-handlebars');
//Imports express-session
const session = require('express-session');
//Dependencies________________________________________|

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

//Imports session sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//Set up sessions with cookies
const sess = {
    secret: 'Super secret secret',
    cookie: { maxAge: 86400 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Sets up session to handle session data
app.use(session(sess));
app.use(express.json());
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up the routes
app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  