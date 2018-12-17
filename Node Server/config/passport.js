const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
const { decodeBody } = require('../src/helpers');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Username and Password.
 */
passport.use(
  new LocalStrategy({ passReqToCallback: true }, (req, dummyUsername, dummyPassword, done) => {
    const { identifier, password } = decodeBody(req.body.login);

    User.findOne({ username: identifier.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: `Username/Email not found. Register instead!` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }

        return done(null, false, { message: 'Invalid username/email or password.' });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Authenticated');
  res.send('AUTHENTICATED');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    console.log('No token');
    res.send('No Token');
    //res.redirect(`/auth/${provider}`);
  }
};
