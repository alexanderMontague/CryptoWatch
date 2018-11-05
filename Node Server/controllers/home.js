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

exports.test = (req, res, next) => {
  const user = new User({
    email: 'test@test.ca',
    password: '123456789'
  });

  user.save((err, user) => {
    if (err) {
      return console.log(err);
    }
  });
};
