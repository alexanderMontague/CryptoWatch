import axios from 'axios';

// External API's

/**
 * Fetch a coin's current price given it's ticker, base currency, and historical data
 * @param {string} ticker
 * @param {string} baseCurrency
 * @param {unix-time string} timeStamp
 */
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

/**
 * Fetch a coin list containing the names and tickers of all supported coins
 */
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

/** Interal API
 *  Response Format:
 *   {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean || null
 *     }
 *   }
 */
const isDev = true;
const BASE_URL = isDev ? 'http://localhost:3003/api/v1' : 'TBD';

/**
 * Save the user's current portfolio to their account
 * @param {TBD} user
 * @param {Object} portfolio
 */
export const savePortfolio = (user, portfolio) => {
  return axios
    .post(`${BASE_URL}/auth/savePortfolio`, {
      portfolio
    })
    .then(res => res)
    .catch(err => ({
      code: 400,
      data: null,
      error: true,
      message: err.message
    }));
};

/**
 * Register a new user given an encoded register user object
 * @param {Base64 String} encodedRegisterData
 */
export const registerUser = encodedRegisterData => {
  return axios
    .post(`${BASE_URL}/public/register`, {
      register: encodedRegisterData
    })
    .then(res => res.data) // response formatted in BE
    .catch(err => ({
      code: 500,
      data: null,
      error: true,
      message: err.message
    }));
};

/**
 * WARNING: DO NOT FUCK WITH THIS
 * IT WILL LITERALLY DELETE ALL USERS IN THE USERS TABLE
 * USE FOR DEV WORK ONLY AND DELETE ASAP
 */
export const deleteAllUsers = () => {
  return axios
    .get(`${BASE_URL}/public/deleteAllUsers`)
    .then(alert('Deleted all users. I hope you meant to do that.'));
};
