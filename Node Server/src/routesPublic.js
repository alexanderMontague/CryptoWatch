'use strict';

const router = require('express').Router();
const { home, register, auth, user } = require('./controllers');

router.route('/seeReq').get(user.seeReq);

router.route('/register').post(register.registerUser);

router.route('/login').post(auth.loginUser);

router.route('/getStatus').get(auth.getStatus);

// TODO: DELETE WARNING DONT FUCK WITH THIS DEV STUFF ONLY IT WILL DELETE ALL USERS
// router.route('/deleteAllUsers').get(home.deleteAllUsers);

module.exports = router;
