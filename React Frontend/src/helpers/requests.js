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
    .get('https://min-api.cryptocompare.com/data/all/coinlist')
    .then(response => {
      return { data: response.data };
    })
    .catch(error => {
      return { error };
    });
};

export const savePortfolio = (user, portfolio) => {
  return axios
    .post('http://localhost:3003/api/v1/auth/savePortfolio', {
      portfolio
    })
    .then(response => {
      return { data: response.data }; // todo send back better info from response
    })
    .catch(error => {
      return { error };
    });
};
