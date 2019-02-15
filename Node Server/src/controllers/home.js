const User = require('../../models/User');

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

module.exports = { deleteAllUsers };
