const User = require('../../models/User');
const { decodeBody } = require('../helpers');
const { requiredFields } = require('../helpers/validations');

/*
*   POST /api/v1/public/register
*
*   ENCODED / Stringafied
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
*       error: Boolean || null
*     }
*   }
*/
postRegisterUser = (req, res) => {
  const registerFields = decodeBody(req.body.register);
  const { email, username, passwordOne, passwordTwo, terms } = registerFields;

  console.log(registerFields);
  // requiredFields(registerFields);
  const newUser = new User({
    email,
    username,
    password: passwordOne, // for now until validation
    terms,
  });

  // before: do checking to see if existing user already exists

  newUser.save((err, newUser) => {
    if (err) {
      res.json(err);
    }
    res.json(newUser);
  });
};

module.exports = {
  postRegisterUser,
};
