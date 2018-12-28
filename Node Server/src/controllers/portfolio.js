const User = require('../../models/User');
const { createResponse } = require('../helpers');

savePortfolio = (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.json(createResponse(200, 'User not logged in', null, true));
  }

  User.findOneAndUpdate({ _id: req.user.id }, { portfolio: req.body.portfolio }, (err, user) => {
    if (err) {
      return res.json(createResponse(400, err.message, null, true));
    }

    return res.json(
      createResponse(200, 'Successfully updated portfolio', req.user.portfolio, false)
    );
  });
};

module.exports = {
  savePortfolio,
};
