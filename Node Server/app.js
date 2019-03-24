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

const whitelist = [
  'http://localhost:3000',
  'https://cryptowatch-d0d48.firebaseapp.com/',
  'https://crypto-watch.ca',
  undefined,
]; // Undefined for Postman
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('You are not whitelisted'));
    }
  },
  preflightContinue: true,
  credentials: true,
};

/**
 * Connect to MongoDB.
 */
console.log('MONGO URI', process.env.MONGODB_URI);

mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log(chalk.green('✓'), 'MongoDB Connected!'))
  .catch(err => console.log('MongoDB Error: ', err));

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3003);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 3.6e6, httpOnly: false, secure: false }, // expires after 1 hour
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors(corsOptions)); // todo set CORS up
app.disable('x-powered-by');

app.use((req, res, next) => {
  console.log('session', req.session, 'id', req.session.id);
  // Refresh user cookie with every request
  req.session._garbage = Date();
  req.session.touch();
  //res.locals.user = req.user || null;
  // no idea but may be useful
  // After successful login, redirect back to the intended page
  //console.log('req user: ', req.user, 'req.session: ', req.session, 'res locals', res.locals);
  // if (!req.user && req.path !== '/login' && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
  //   console.log('HERE ONE');
  //   req.session.returnTo = req.originalUrl;
  // } else if (req.user && (req.path === '/account' || req.path.match(/^\/api/))) {
  //   req.session.returnTo = req.originalUrl;
  // }
  next();
});

// For public requests
app.use(BASE_URL + '/public', cors(corsOptions), publicRoutes);

// For authenticated requests
app.use(BASE_URL + '/auth', cors(corsOptions), authRoutes);

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
