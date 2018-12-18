const passport = require('passport');
const { createResponse, decodeBody } = require('../helpers');

/*
 *   POST /api/v1/public/login
 *
 *   ENCODED
 *   REQ: {
 *     login: {
 *       identifier: String,
 *       password: String,
 *     }
 *   }
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
postLoginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.json(createResponse(500, err.message, null, true));
      return;
    }
    if (!user) {
      res.json(createResponse(200, info.message, null, true));
      return;
    }
    req.logIn(user, err => {
      if (err) {
        res.json(createResponse(500, err.message, null, true));
        return;
      }

      res.cookie('userId', user.id);

      res.json(createResponse(200, 'Successfully Logged In!', user, false));
      return;
    });
  })(req, res, next);
};

module.exports = {
  postLoginUser,
};
