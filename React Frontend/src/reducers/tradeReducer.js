import { getHistoricPortfolioValue } from '../helpers';

const initialState = {
  showDetails: false,
  baseCurrency: 'USD', // Base currency that all coin price data is fetched from. This is because CryptoCompare API has an abundance of American exchanges to source from
  selectedBaseCurrency: 'CAD', // Base currency the user will select to view prices in this currency,
  portfolio: {
    historicTotalValue: 0
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
      const { ticker, imageURL, details } = payload.lotDetails;
      const prevPortfolio = JSON.parse(JSON.stringify(prevState.portfolio)); // creates deep immutable copy
      if (!prevPortfolio[ticker]) {
        // check if coin is in portfolio first
        // if not create the base object structure and add the first lot
        const newCoinAsset = {
          ticker,
          imageURL,
          lots: [{ ...details }],
          totalCoinAmount: Number(details.amountBought)
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

      // if coin is already in portfolio, add new lot
      const newCoinAsset = prevPortfolio[ticker];
      newCoinAsset.totalCoinAmount =
        Number(newCoinAsset.totalCoinAmount) + Number(details.amountBought);
      newCoinAsset.lots.push({ ...details });

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

    default:
      return prevState;
  }
};

export default tradeState;
