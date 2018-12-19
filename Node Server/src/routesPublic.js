'use strict';

const router = require('express').Router();
const passport = require('passport');
const { home, register, auth } = require('./controllers');

router.route('/').get(home.index);

// debug remove after
router.route('/seeReq').get(home.seeReq);

router.route('/register').post(register.registerUser);

router.route('/login').post(auth.loginUser);

// WARNING DONT FUCK WITH THIS DEV STUFF ONLY IT WILL DELETE ALL USERS
router.route('/deleteAllUsers').get(home.deleteAllUsers);

module.exports = router;
