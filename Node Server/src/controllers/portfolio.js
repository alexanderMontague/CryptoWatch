const User = require('../../models/User');

savePortfolio = (req, res) => {
  const user = new User({
    email: 'portfolio@test.ca',
    password: '12345',
    portfolio: req.body.portfolio,
  });

  user.save((err, user) => {
    if (err) {
      res.json(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(user.portfolio);
  });
};

module.exports = {
  savePortfolio,
};
