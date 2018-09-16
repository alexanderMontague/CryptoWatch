import axios from 'axios';

export async function convertCurrency(baseCurr, foreignCurr, amount) {
  // Function will convert amount from the base currency to foreign currency based on exhange rate
  // Using CurrencyConverterAPI v6

  await axios
    .get(
      `http://free.currencyconverterapi.com/api/v6/convert?q=${baseCurr}_${foreignCurr}&compact=y`
    )
    .then(response => {
      const exchangeRate = response.data[`${baseCurr}_${foreignCurr}`].val;
      return amount * exchangeRate;
    })
    .catch(error => {
      console.log('HELPER convertCurrency ERROR: ', convertCurrency);
    });
}
