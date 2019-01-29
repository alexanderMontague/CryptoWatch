const { getCurrentCoinPrice } = require('../helpers/requests');

function getCurrPortfolioValue(portfolio) {
  const coinsInPortfolio = Object.keys(portfolio);
  getCurrentCoinPrice(coinsInPortfolio[0], 'CAD').then(res => console.log(res));
}

module.exports = {
  getCurrPortfolioValue,
};
