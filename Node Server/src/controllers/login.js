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
      return res.json(createResponse(500, err.message, null, true));
    }
    if (!user) {
      return res.json(createResponse(200, info.message, null, true));
    }
    req.logIn(user, err => {
      if (err) {
        return res.json(createResponse(500, err.message, null, true));
      }

      req.session.save(() => {
        return res.json(createResponse(200, 'Successfully Logged In!', user, false));
      });
    });
  })(req, res, next);
};

module.exports = {
  postLoginUser,
};
