const User = require('../../models/User');

/*
*   POST /api/v1/public/register
*
*   REQ: {
*     register: {
*       email: String,
*       username: String,
*       password: String,
*       terms: Boolean
*     }
*   }
*
*   RES: {
*     response: {
*       code: Integer,
*       message: String,
*       error: Boolean
*     }
*   }
*/
exports.postRegisterUser = (req, res) => {
  const { email, username, password, terms } = req.register;
  console.log(req.register);
};
