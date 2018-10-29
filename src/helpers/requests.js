import axios from 'axios';

export const getCoinPrice = (ticker, baseCurrency, timeStamp) => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${ticker}&tsyms=${baseCurrency}&ts=${timeStamp}`
    )
    .then(response => {
      return { data: response.data };
    })
    .catch(error => {
      return { error };
    });
};

export const getCoinList = () => {
  return axios
    .get('xhttps://min-api.cryptocompare.com/data/all/coinlist')
    .then(response => {
      return { data: response.data };
    })
    .catch(error => {
      return { error };
    });
};
