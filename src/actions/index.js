// ACTIONS
// TODO: abstract action types to constants

export const toggleMenu = () => {
  return {
    type: 'TOGGLE_MENU'
  };
};

export const selectCoin = coinTicker => {
  return {
    type: 'SELECT_COIN',
    payload: { ticker: coinTicker }
  };
};

export const addToPortfolio = lotDetails => {
  return {
    type: 'ADD_TO_PORTFOLIO',
    payload: { lotDetails }
  };
};

// Example of action sending other data, and getting a param
// export const useParam = (newNumParam) => {
//   return {
//     type: 'TOGGLE_MENU',
//     payload: { number: newNumParam }
//   }
// };
