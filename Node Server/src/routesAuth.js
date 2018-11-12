'use strict';

const router = require('express').Router();
// const multer = require('multer');  // for file upload
// const middleware = require('./middleware'); // for when we need middleware

const { portfolio } = require('./controllers');

router.route('/savePortfolio').post(portfolio.savePortfolio);

module.exports = router;
