const { getCurrentCoinPrice } = require('../helpers/requests');

async function getCurrPortfolioValue(portfolio, userBaseCurrency) {
  // only get keys of coins
  delete portfolio.meta;

  // get current price of single coin in portfolio
  let currCoinPrices = {};
  for (const coin in portfolio) {
    currCoinPrices[coin] = await getCurrentCoinPrice(coin, userBaseCurrency);
  }

  // get total amount of coins per crypto in portfolio
  let currCoinAmounts = {};
  for (const coin in portfolio) {
    currCoinAmounts[coin] = portfolio[coin].totalCoinAmount;
  }

  // calculate the total current portfolio price
  return Object.keys(portfolio).reduce((currentPortfolioValue, coin) => {
    return currentPortfolioValue + currCoinPrices[coin] * currCoinAmounts[coin];
  }, 0);
}

module.exports = {
  getCurrPortfolioValue,
};
