const User = require('../../models/User');
/**
 * GET /
 * Home page.
 * EACH ROUTE SHOULD HAVE OWN CONTROLLER
 */
index = (req, res) => {
  res.send('HELLO WORLD! you hit "/"');
};

// GET TEST
getTest = (req, res, next) => {
  const user = new User({
    email: 'user@test.ca',
    password: '12345',
  });

  user.save((err, user) => {
    if (err) {
      res.json(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  });
};

// POST TEST
exports.postTest = (req, res, next) => {
  // if (errors) {
  //   res.json(errors);
  // }
  //console.log(req.query);
  res.json(req.body);
};

// POST LOOKUP TEST
exports.postLookup = (req, res) => {
  const { email } = req.body;
  // search by email but only get email and password back
  User.find({ email }, 'email password', (err, user) => {
    if (err) {
      res.json(err);
    }
    res.json(user);
  });
};

exports.postUpdate = (req, res) => {
  User.updateOne({ email: req.body.email }, { email: req.body.newEmail }, (err, raw) => {
    // (searched Document, updated fields, cb)
    if (err) {
      res.send(raw);
    }
    res.send('Success' + JSON.stringify(raw));
  });
};

module.exports = { index, getTest };
