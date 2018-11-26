'use strict';

const router = require('express').Router();
const passport = require('passport');
const { home, register, login } = require('./controllers');

router.route('/').get(home.index);

// debug remove after
router.route('/seeReq').get(home.seeReq);

router.route('/register').post(register.postRegisterUser);

router.route('/login').post(login.postLoginUser);

// WARNING DONT FUCK WITH THIS DEV STUFF ONLY IT WILL DELETE ALL USERS
router.route('/deleteAllUsers').get(home.deleteAllUsers);

module.exports = router;
