const User = require('../../models/User');
const { createResponse } = require('../helpers');
const { updatePortfolio } = require('../repositories').user;

async function savePortfolio(req, res) {
  if (!req.isAuthenticated() || !req.user) {
    return res.json(createResponse(200, 'User not logged in', null, true));
  }

  // get updated current portfolio worth when new coin is added
  const newPortfolio = await updatePortfolio(req.body.portfolio, req.body.baseCurrency);

  User.findOneAndUpdate({ _id: req.user.id }, { portfolio: newPortfolio }, (err, user) => {
    if (err) {
      return res.json(createResponse(400, err.message, null, true));
    }

    return res.json(
      createResponse(200, 'Successfully updated portfolio', req.body.portfolio, false)
    );
  });
}

module.exports = {
  savePortfolio,
};
