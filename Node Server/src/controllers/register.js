const User = require('../../models/User');

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
*       terms: String (true / false)
*     }
*   }
*
*   RES: {
*     response: {
*       code: Integer,
*       message: String,
*       error: Boolean || null
*     }
*   }
*/
postRegisterUser = (req, res) => {
  //res.send(req.body);
  res.send(new Buffer(req.body.register, 'base64').toString('ascii'));
};

module.exports = {
  postRegisterUser,
};
