/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const multer = require('multer');
const cors = require('cors');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.keys' });

/**
 * Setup Authentication
 */
const passportConfig = require('./config/passport');

/**
 * Get Routes
 */
const authRoutes = require('./src/routesAuth');
const publicRoutes = require('./src/routesPublic');

/**
 * Setup / Initialization
 */
const app = express();
const BASE_URL = '/api/v1';

/**
 * Connect to MongoDB.
 */
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => chalk.green('✓ MongoDB Connected'))
  .catch(err => console.log('MongoDB Error: ', err));

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3003);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  // no idea about this too but could also be useful
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    // store: new MongoStore({
    //   url: process.env.MONGODB_URI,
    //   autoReconnect: true,
    // }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors()); // todo set CORS up
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use((req, res, next) => {
  // no idea but may be useful
  // After successful login, redirect back to the intended page
  if (!req.user && req.path !== '/login' && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
    console.log('HERE ONE');
    req.session.returnTo = req.originalUrl;
  } else if (req.user && (req.path === '/account' || req.path.match(/^\/api/))) {
    console.log('HERE TWO');
    req.session.returnTo = req.originalUrl;
  }
  next();
});
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// For public requests
app.use(BASE_URL + '/public', publicRoutes);

// For authenticated requests
app.use(BASE_URL + '/auth', authRoutes);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
