'use strict';

const router = require('express').Router();
// const multer = require('multer');  // for file upload
// const middleware = require('./middleware'); // for when we need middleware

const { index, getTest, register } = require('./controllers');

router.route('/').get(index.index);

router.route('/getTest').get(getTest.getTest);

router.route('/register').post(register.postRegisterUser);

module.exports = router;
