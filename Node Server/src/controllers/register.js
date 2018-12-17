const User = require('../../models/User');
const { decodeBody, createResponse } = require('../helpers');
const { requiredFields, validateEmailAndUsername } = require('../helpers/validations');

/*
 *   POST /api/v1/public/register
 *
 *   ENCODED
 *   REQ: {
 *     register: {
 *       email: String,
 *       username: String,
 *       passwordOne: String,
 *       passwordTwo: String,
 *       terms: Boolean
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
async function postRegisterUser(req, res) {
  const registerFields = decodeBody(req.body.register);
  const requiredErrors = requiredFields(registerFields);

  if (requiredErrors) {
    res.json(requiredErrors);
    return;
  }

  const { email, username, passwordOne, terms = null, portfolio = {} } = registerFields;
  const emailUsernameTaken = await validateEmailAndUsername(email, username);

  if (emailUsernameTaken) {
    res.json(emailUsernameTaken);
    return;
  }

  const newUser = new User({
    email,
    username,
    password: passwordOne, // password is validated
    terms, // will reimplement on the FE if needed
    portfolio,
  });

  newUser.save((err, newUser) => {
    if (err) {
      res.json(createResponse(500, 'Error while registering', err, true));
      return;
    }
    res.json(createResponse(200, 'Successfully Registered! You may now log in.', null, false));
  });
}

module.exports = {
  postRegisterUser,
};
