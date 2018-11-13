import axios from 'axios';

// External API's
export const getCoinPrice = (ticker, baseCurrency, timeStamp) => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${ticker}&tsyms=${baseCurrency}&ts=${timeStamp}`
    )
    .then(res => {
      return { data: res.data };
    })
    .catch(error => {
      return { error };
    });
};

export const getCoinList = () => {
  return axios
    .get('https://min-api.cryptocompare.com/data/all/coinlist')
    .then(res => {
      return { data: res.data };
    })
    .catch(error => {
      return { error };
    });
};

// Interal API
export const savePortfolio = (user, portfolio) => {
  return axios
    .post('http://localhost:3003/api/v1/auth/savePortfolio', {
      portfolio
    })
    .then(res => res)
    .catch(err => err);
};

export const registerUser = encodedRegisterData => {
  return axios
    .post('http://localhost:3003/api/v1/auth/register', {
      register: {
        ...encodedRegisterData
      }
    })
    .then(res => res)
    .catch(err => err);
};
