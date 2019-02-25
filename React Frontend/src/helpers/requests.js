import axios from 'axios';

// External API's
/**
 * Fetch a coin's current price given it's ticker and base currency
 * @param {string} ticker
 * @param {string} baseCurrency
 * @param {unix-time string} timeStamp
 */
export const getCoinPrice = (
  ticker,
  baseCurrency = 'CAD'
  //timeStamp = moment().unix()
) => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/price?fsym=${ticker}&tsyms=${baseCurrency}`
    )
    .then(res => {
      return res.data.Response === 'Error' ? null : res.data[baseCurrency];
    })
    .catch(error => {
      console.error(error.message);
      return { error };
    });
};

/**
 * Fetch a coin's historic price given it's ticker, base currency, and unix time stamp
 * @param {string} ticker
 * @param {string} baseCurrency
 * @param {unix-time string} timeStamp
 */
export const getHistoricCoinPrice = (
  ticker,
  baseCurrency = 'CAD',
  timeStamp
) => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${ticker}&tsyms=${baseCurrency}&ts=${timeStamp}`
    )
    .then(res => {
      return res.data.Response === 'Error'
        ? null
        : res.data[ticker][baseCurrency];
    })
    .catch(error => {
      console.error(error.message);
      return { error };
    });
};

export const getCoinFullInfo = (
  ticker,
  baseCurrency = 'CAD',
  display = false
) => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=${baseCurrency}`
    )
    .then(res => {
      return res.data.Response === 'Error'
        ? null
        : {
            ...res.data.RAW[ticker][baseCurrency],
            fromSymbol: res.data.DISPLAY[ticker][baseCurrency].FROMSYMBOL
          };
    })
    .catch(error => {
      console.error(error.message);
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
 *       // error can be true even if the call succeeds
 *       // used to differentiate happy vs bad path and outside errors
 *     }
 *   }
 */
const isDev = true;
const BASE_URL = isDev ? 'http://localhost:3003/api/v1' : 'TBD';

/**
 * Save the user's current portfolio to their account
 * @param {Object} portfolio
 */
export const savePortfolio = (portfolio, baseCurrency = 'CAD') => {
  return axios
    .post(
      `${BASE_URL}/auth/savePortfolio`,
      {
        portfolio,
        baseCurrency
      },
      { withCredentials: true, credentials: 'include' }
    )
    .then(res => res.data)
    .catch(err => ({
      code: 500,
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
    .post(
      `${BASE_URL}/public/register`,
      {
        register: encodedRegisterData
      },
      { withCredentials: true, credentials: 'include' }
    )
    .then(res => res.data) // response formatted in BE
    .catch(err => ({
      code: 500,
      data: null,
      error: true,
      message: err.message
    }));
};

/**
 * Login a user given an encoded login object
 * @param {Base64 String} encodedLoginData
 */
export const loginUser = encodedLoginData => {
  return axios
    .post(
      `${BASE_URL}/public/login`,
      {
        login: encodedLoginData,
        username: '___', // dummy username for passport
        password: '___' // dummy password for passport
      },
      { withCredentials: true, credentials: 'include' }
    )
    .then(res => res.data) // response formatted in BE
    .catch(err => ({
      code: 500,
      data: null,
      error: true,
      message: err.message
    }));
};

/**
 * Attempt to logout a user
 */
export const logoutUser = () => {
  return axios
    .get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
      credentials: 'include'
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
 * Get a user's authentication status
 */
export const userStatus = () => {
  return axios
    .get(`${BASE_URL}/public/getStatus`, {
      withCredentials: true,
      credentials: 'include'
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
 * Fetch the current user's details
 */
export const seeUserReq = () => {
  return axios
    .get(`${BASE_URL}/public/seeReq`, {
      withCredentials: true,
      credentials: 'include'
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
 * TODO: DELETE THIS ASAP
 * WARNING: DO NOT FUCK WITH THIS
 * IT WILL LITERALLY DELETE ALL USERS IN THE USERS TABLE
 * USE FOR DEV WORK ONLY AND DELETE ASAP
 */
export const deleteAllUsers = () => {
  return axios
    .get(`${BASE_URL}/public/deleteAllUsers`)
    .then(alert('Deleted all users. I hope you meant to do that.'));
};
