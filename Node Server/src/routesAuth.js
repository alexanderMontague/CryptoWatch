'use strict';

const router = require('express').Router();

const { portfolio, auth } = require('./controllers');

router.route('/logout').get(auth.logoutUser);

router.route('/savePortfolio').post(portfolio.savePortfolio);

module.exports = router;
