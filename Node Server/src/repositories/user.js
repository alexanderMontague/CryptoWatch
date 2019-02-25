const { getMultipleCoinInfo } = require('../helpers/requests');

// DEPRECATED
async function getCurrPortfolioValue(portfolio, userBaseCurrency) {
  // only get keys of coins
  delete portfolio.meta;

  // get current prices of all coins in portfolio
  //const currCoinPrices = await getMultipleCoinPrices(Object.keys(portfolio), userBaseCurrency);

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

// WILL mutate portfolio!
async function updatePortfolio(portfolio, userBaseCurrency = 'CAD') {
  // as this function mutates portfolio, create a portfolio clone to get coin prices
  const portfolioCoins = { ...portfolio };
  delete portfolioCoins.meta;

  // get current prices of all coins in portfolio
  const currCoinInfo = await getMultipleCoinInfo(Object.keys(portfolioCoins), userBaseCurrency);
  const currCoinPrices = {};
  const currCoinAmounts = {};

  // calculate current coin prices
  Object.keys(currCoinInfo).forEach(coin => {
    currCoinPrices[coin] = currCoinInfo[coin][userBaseCurrency].PRICE;
  });

  // update all other portfolio info
  for (const coin in portfolio) {
    if (coin !== 'meta') {
      // update each coin in portfolio with current price
      portfolio[coin].currentPrice = currCoinPrices[coin];

      // get total amount of coins for each asset
      currCoinAmounts[coin] = portfolio[coin].totalCoinAmount;

      // update 24 hour change for each coin
      portfolio[coin].change24HourDollar = currCoinInfo[coin][userBaseCurrency].CHANGE24HOUR;
      portfolio[coin].change24HourPercent = currCoinInfo[coin][userBaseCurrency].CHANGEPCT24HOUR;
    }
  }

  // calculate the total current portfolio worth
  portfolio.meta.currentTotalValue = Object.keys(portfolioCoins).reduce(
    (currentPortfolioValue, coin) => {
      return currentPortfolioValue + currCoinPrices[coin] * currCoinAmounts[coin];
    },
    0
  );

  return portfolio;
}

module.exports = {
  getCurrPortfolioValue,
  updatePortfolio,
};
