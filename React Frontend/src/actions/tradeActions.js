// TRADE ACTIONS

export const selectCoin = coinTicker => {
  return {
    type: 'SELECT_COIN',
    payload: { coinTicker }
  };
};

// Adds to the REDUX portfolio object
export const addToPortfolio = lotDetails => {
  return {
    type: 'ADD_TO_PORTFOLIO',
    payload: { lotDetails }
  };
};

// Adds newly updated portfolio to user in DB
export const updateUserPortfolio = portfolio => {
  return {
    type: 'UPDATE_USER_PORTFOLIO',
    payload: portfolio
  };
};

export const updatePortfolioSuccess = data => ({
  type: 'UPDATE_PORTFOLIO_SUCCESS',
  payload: data
});

export const updatePortfolioFailure = data => ({
  type: 'UPDATE_PORTFOLIO_FAILURE',
  payload: data
});

export const showDetails = () => {
  return {
    type: 'SHOW_DETAILS'
  };
};

export const hideDetails = () => {
  return {
    type: 'HIDE_DETAILS'
  };
};
