const { getCurrentCoinPrice } = require('../helpers/requests');

async function getCurrPortfolioValue(portfolio) {
  delete portfolio.historicTotalValue; // only get keys of coins
  // TODO delete portfolio. curr val

  // get current price of single coin in portfolio
  let currCoinPrices = {};
  for (const coin in portfolio) {
    currCoinPrices[coin] = (await getCurrentCoinPrice(coin, 'CAD')).CAD; // TODO: get base from user db
  }

  // get total amount of coins per crypto in portfolio

  return currCoinPrices;
}

module.exports = {
  getCurrPortfolioValue,
};
