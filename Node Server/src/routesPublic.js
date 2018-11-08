'use strict';

const router = require('express').Router();
// const multer = require('multer');  // for file upload
// const middleware = require('./middleware'); // for when we need middleware

const { index, getTest } = require('./controllers');
console.log('in pub routes', index);
router.route('/').get(index);

router.route('/getTest').get(getTest);

module.exports = router;
