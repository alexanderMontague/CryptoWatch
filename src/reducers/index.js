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
        selectedCoin: action.payload.ticker
      };

    case 'ADD_TO_PORTFOLIO':
      const { ticker, details } = action.payload.lotDetails;
      const prevCoinsInPortfolio = prevState.coinsInPortfolio;

      if (!prevCoinsInPortfolio[ticker]) {
        // check if coin is in portfolio first
        // if not create the base object structure and add the first lot
        const newCoinAsset = {
          ticker,
          lots: [{ ...details }]
        };
        return {
          ...prevState,
          coinsInPortfolio: { ...prevCoinsInPortfolio, [ticker]: newCoinAsset }
        };
      }
      // if coin is already in portfolio, add new lot
      let newCoinAsset = prevCoinsInPortfolio[ticker];
      newCoinAsset.lots.push({ ...details });
      return {
        ...prevState,
        coinsInPortfolio: { ...prevCoinsInPortfolio, [ticker]: newCoinAsset }
      };

    // Reducer case where you get other data from the action
    // case 'USE_PARAMS:
    //  do something with action.payload
    //  const newNumber = action.payload.number
    //  return { ...prevState, number: prevState.number + newNumber }

    default:
      return prevState;
  }
};

export default rootReducer;
