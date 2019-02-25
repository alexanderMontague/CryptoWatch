const passport = require('passport');
const { getMultipleCoinPrices } = require('../helpers/requests');
const { createResponse } = require('../helpers');
const { updatePortfolio } = require('../repositories').user;

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
function loginUser(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json(createResponse(200, 'Already logged in!', null, true));
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json(createResponse(500, err.message, null, true));
    }
    if (!user) {
      return res.json(createResponse(200, info.message, null, true));
    }
    req.logIn(user, async err => {
      if (err) {
        return res.json(createResponse(500, err.message, null, true));
      }

      const { password, ...userObject } = user._doc;

      if (userObject.portfolio) {
        // Update portfolio current value, each coin current price, and 24 hr prices
        // WILL mutate portfolio
        userObject.portfolio = await updatePortfolio(userObject.portfolio, userObject.baseCurrency);
      }

      req.session.save(() => {
        return res.json(createResponse(200, 'Successfully Logged In!', userObject, false));
      });
    });
  })(req, res, next);
}

/*
 *   GET /api/v1/auth/logout
 *
 *   REQ: NULL
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
function logoutUser(req, res) {
  if (!req.isAuthenticated()) {
    return res.json(createResponse(200, 'You are not logged in!', null, true));
  }

  req.logOut();
  return res.json(createResponse(200, 'Successfully logged out.', null, false));
}

/*
 *   GET /api/v1/public/getStatus
 *
 *   REQ: NULL
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
async function getStatus(req, res) {
  if (req.isAuthenticated()) {
    const { password, ...userObject } = req.user._doc;

    // Update portfolio current value, each coin current price, and 24 hr prices
    // WILL mutate portfolio
    userObject.portfolio = await updatePortfolio(userObject.portfolio, userObject.baseCurrency);

    return res.json(
      createResponse(
        200,
        'User is Authenticated',
        {
          isAuthenticated: true,
          user: userObject,
        },
        false
      )
    );
  }
  return res.json(
    createResponse(
      200,
      'User is NOT Authenticated',
      {
        isAuthenticated: false,
        user: null,
      },
      false
    )
  );
}

module.exports = {
  loginUser,
  logoutUser,
  getStatus,
};
