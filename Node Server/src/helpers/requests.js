const axios = require('axios');

function getCurrentCoinPrice(ticker, base) {
  return axios
    .get(`https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${base}`)
    .then(res => res.data)
    .catch(err => err);
}

module.exports = {
  getCurrentCoinPrice,
};
