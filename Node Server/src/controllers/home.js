const User = require('../../models/User');
/**
 * GET /
 * Home page.
 * EACH ROUTE SHOULD HAVE OWN CONTROLLER
 */
index = (req, res) => {
  res.send('HELLO WORLD! you hit "/"');
};

/**
 * GET /deleteAllUsers
 * DO NOT FUCK WITH THIS
 * DELETE ASAP
 */
deleteAllUsers = (req, res) => {
  User.remove({}, err => {
    console.log('delete all users error: ' + err);
    res.send('Successfully deleted all users. I hope you meant to do that');
  });
};

// example of updating user
exports.postUpdate = (req, res) => {
  User.updateOne({ email: req.body.email }, { email: req.body.newEmail }, (err, raw) => {
    // (searched Document, updated fields, cb)
    if (err) {
      res.send(raw);
    }
    res.send('Success' + JSON.stringify(raw));
  });
};

module.exports = { index, deleteAllUsers };
