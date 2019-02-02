const axios = require('axios');

function getCurrentCoinPrice(ticker, base = 'CAD') {
  return axios
    .get(`https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${base}`)
    .then(res => res.data)
    .catch(err => err);
}

module.exports = {
  getCurrentCoinPrice,
};
