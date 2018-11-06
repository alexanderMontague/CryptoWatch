const User = require('../models/User');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  // res.render('home', {
  //   title: 'Home'
  // });
  res.send('HELLO WORLD! you hit "/"');
};

// GET TEST
exports.getTest = (req, res, next) => {
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
