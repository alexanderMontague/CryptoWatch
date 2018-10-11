import { combineReducers } from 'redux';

// const allReducers = combineReducers({
//   reducerOne,
//   reducerTwo
// });

const rootReducer = (prevState, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...prevState,
        showMenu: !prevState.showMenu
      };

    case 'SELECT_COIN':
      return {
        ...prevState,
        selectedCoin: action.payload.coinTicker
      };

    case 'ADD_TO_PORTFOLIO':
      const { ticker, imageURL, details } = action.payload.lotDetails;
      const prevPortfolio = prevState.portfolio;

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

export default rootReducer;
