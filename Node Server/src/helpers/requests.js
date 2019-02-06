const axios = require('axios');
const moment = require('moment');

function getCurrentCoinPrice(ticker, base = 'CAD') {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${ticker}&tsyms=${base}&ts=${moment().unix()}`
    )
    .then(res => res.data[ticker][base])
    .catch(err => err);
}

module.exports = {
  getCurrentCoinPrice,
};
