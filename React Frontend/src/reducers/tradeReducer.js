import { getHistoricPortfolioValue } from '../helpers';

const initialState = {
  showDetails: false,
  baseCurrency: 'CAD', // TODO: Fetch from user object if valid
  portfolio: {
    historicTotalValue: 0,
    currentTotalValue: 0
  }
};

const tradeState = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case 'SELECT_COIN':
      return {
        ...prevState,
        selectedCoin: payload.coinTicker
      };

    case 'ADD_TO_PORTFOLIO':
      const { ticker, imageURL, details, currentPrice } = payload.lotDetails;
      const prevPortfolio = JSON.parse(JSON.stringify(prevState.portfolio)); // creates deep immutable copy
      if (!prevPortfolio[ticker]) {
        // check if coin is in portfolio first
        // if not create the base object structure and add the first lot
        const newCoinAsset = {
          ticker,
          imageURL,
          currentPrice,
          totalCoinAmount: Number(details.amountBought),
          lots: [{ ...details }]
        };

        // calculate the total historic price with updated portfolio
        let updatedPortfolio = { ...prevPortfolio, [ticker]: newCoinAsset };
        const historicTotalValue = getHistoricPortfolioValue(updatedPortfolio);
        updatedPortfolio = { ...updatedPortfolio, historicTotalValue };

        return {
          ...prevState,
          portfolio: updatedPortfolio
        };
      }

      // if coin is already in portfolio
      const newCoinAsset = prevPortfolio[ticker];
      // calculate the total coin amount
      newCoinAsset.totalCoinAmount =
        Number(newCoinAsset.totalCoinAmount) + Number(details.amountBought);
      // add a new lot
      newCoinAsset.lots.push({ ...details });
      // update current price
      newCoinAsset.currentPrice = currentPrice;

      // calculate the total historic price with updated portfolio
      let updatedPortfolio = { ...prevPortfolio, [ticker]: newCoinAsset };
      const historicTotalValue = getHistoricPortfolioValue(updatedPortfolio);
      updatedPortfolio = { ...updatedPortfolio, historicTotalValue };

      return {
        ...prevState,
        portfolio: updatedPortfolio
      };

    case 'SHOW_DETAILS':
      return { ...prevState, showDetails: true };

    case 'HIDE_DETAILS':
      return { ...prevState, showDetails: false };

    // update user portfolio with one in DB on login
    case 'LOGIN_SUCCESS':
      return { ...prevState, portfolio: payload.data.portfolio || {} };

    // hide previous portfolio on logout
    case 'LOGOUT_SUCCESS':
      return { ...prevState, portfolio: {} };

    // update portfolio if user is already logged in and refreshes
    case 'USER_STATUS_RESPONSE':
      const portfolio = payload.data.isAuthenticated
        ? payload.data.user.portfolio || {}
        : {};
      return { ...prevState, portfolio };

    // update portfolio when save to DB is successful
    case 'UPDATE_PORTFOLIO_SUCCESS':
      return { ...prevState, portfolio: payload.data };

    default:
      return prevState;
  }
};

export default tradeState;
