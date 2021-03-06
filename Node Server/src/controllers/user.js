const { createResponse } = require('../helpers');

/* GET /api/v1/public/seeReq
 *   RES: {
 *     isAuthenticated: Bool,
 *     session: Object,
 *     sessionID: string
 *   }
 */
const seeReq = (req, res) => {
  const portfolio = req.user && req.user.portfolio;

  const infoStuff = {
    isAuthenticated: req.isAuthenticated(),
    session: req.session,
    sessionID: req.sessionID,
    portfolio,
  };

  res.json(createResponse(200, null, { ...infoStuff }, false));
  return;
};

module.exports = {
  seeReq,
};
