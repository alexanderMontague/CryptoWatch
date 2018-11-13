import axios from 'axios';

// Function will convert amount from the base currency to foreign currency based on exhange rate
// Using CurrencyConverterAPI v6
export const convertCurrency = (baseCurr, foreignCurr, amount) => {
  return axios
    .get(
      `http://free.currencyconverterapi.com/api/v6/convert?q=${baseCurr}_${foreignCurr}&compact=y`
    )
    .then(response => {
      const exchangeRate = response.data[`${baseCurr}_${foreignCurr}`].val;
      return { data: amount * exchangeRate };
    })
    .catch(error => {
      return { error };
    });
};

// Function takes redux portfolio and coin being added to see if coin is already in the portfolio
export const isInPortfolio = (state, searchCoin) => {
  for (const coin in state) {
    if (coin === searchCoin) {
      return true;
    }
  }
  return false;
};

// Add commas to seperate thousandths
export const numberWithCommas = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Base64 Encode Function
// Can encode objects, arrays or strings
export const encodeBase64 = plainData => {
  let formattedData = plainData;
  if (typeof plainData === Object || typeof plainData === Array) {
    formattedData = JSON.stringify(plainData);
  }
  return btoa(JSON.stringify(formattedData));
};
