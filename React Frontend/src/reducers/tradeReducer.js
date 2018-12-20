const initialState = {
  showDetails: false,
  baseCurrency: 'USD', // Base currency that all coin price data is fetched from. This is because CryptoCompare API has an abundance of American exchanges to source from
  selectedBaseCurrency: 'CAD', // Base currency the user will select to view prices in this currency,
  portfolio: {}
};

const tradeState = (prevState = initialState, action) => {
  switch (action.type) {
    case 'SELECT_COIN':
      return {
        ...prevState,
        selectedCoin: action.payload.coinTicker
      };

    case 'ADD_TO_PORTFOLIO':
      const { ticker, imageURL, details } = action.payload.lotDetails;
      const prevPortfolio = JSON.parse(JSON.stringify(prevState.portfolio)); // creates deep immutable copy
      if (!prevPortfolio[ticker]) {
        // check if coin is in portfolio first
        // if not create the base object structure and add the first lot
        const newCoinAsset = {
          ticker,
          imageURL,
          lots: [{ ...details }]
        };
        return {
          ...prevState,
          portfolio: { ...prevPortfolio, [ticker]: newCoinAsset }
        };
      }
      // if coin is already in portfolio, add new lot
      const newCoinAsset = prevPortfolio[ticker];
      newCoinAsset.lots.push({ ...details });
      return {
        ...prevState,
        portfolio: { ...prevPortfolio, [ticker]: newCoinAsset }
      };

    case 'SHOW_DETAILS':
      return { ...prevState, showDetails: true };

    case 'HIDE_DETAILS':
      return { ...prevState, showDetails: false };

    default:
      return prevState;
  }
};

export default tradeState;
