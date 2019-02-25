const axios = require('axios');

/**
 * Fetch a coin's current price given it's ticker and base currency
 * @param {string} ticker
 * @param {string} baseCurrency
 */
function getCurrentCoinPrice(ticker, base = 'CAD') {
  return axios
    .get(`https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${base}`)
    .then(res => res.data[base])
    .catch(err => err);
}

/**
 * Fetch coin data for multiple coins given an array of coins
 * @param {array} coins [ "ticker", "ticker", ...]
 * @param {string} baseCurrency
 */
function getMultipleCoinInfo(coins, base = 'CAD') {
  // if a portfoio is empty, or there was an error
  if (coins.length === 0) {
    return null;
  }

  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins.join(',')}&tsyms=${base}`
    )
    .then(res => {
      if (res.data.Response === 'Error') {
        return null;
      }

      return res.data.RAW;
    })
    .catch(err => err);
}

module.exports = {
  getCurrentCoinPrice,
  getMultipleCoinInfo,
};
