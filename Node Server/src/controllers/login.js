const User = require('../../models/User');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

/*
*   POST /api/v1/public/login
*
*   ENCODED
*   REQ: {
*     login: {
*       email: String || null,
*       username: String || null,
*       password: String,
*     }
*   }
*
*   RES: {
*     response: {
*       code: Integer,
*       message: String,
*       data: Object || Array || null,
*       error: Boolean || null
*     }
*   }
*/

postLoginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('No User!', info);
      res.send('No User!');
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      res.json(`req.body: ${JSON.stringify(req.body)} successfully logged in! User: ${user}`);
    });
  })(req, res, next);
};

module.exports = {
  postLoginUser,
};
