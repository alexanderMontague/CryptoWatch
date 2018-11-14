'use strict';

const router = require('express').Router();
// const multer = require('multer');  // for file upload
// const middleware = require('./middleware'); // for when we need middleware

const { home, register } = require('./controllers');

router.route('/').get(home.index);

router.route('/register').post(register.postRegisterUser);

// WARNING DONT FUCK WITH THIS DEV STUFF ONLY IT WILL DELETE ALL USERS
router.route('/deleteAllUsers').get(home.deleteAllUsers);

module.exports = router;
