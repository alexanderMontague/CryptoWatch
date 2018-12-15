const User = require('../../models/User');
const passport = require('passport');
const createResponse = require('../helpers');

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
      res.json(createResponse(500, err, null, true));
    }
    if (!user) {
      // standardize error codes
      res.json(createResponse(200, info.msg, null, false));
    }
    req.logIn(user, err => {
      if (err) {
        res.json(createResponse(500, err, null, true));
      }
      res.json(createResponse(200, 'Successfully Logged In!', user, false));
    });
  })(req, res, next);
};

module.exports = {
  postLoginUser,
};
