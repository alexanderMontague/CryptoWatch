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
    payload: { coinTicker }
  };
};

export const addToPortfolio = lotDetails => {
  return {
    type: 'ADD_TO_PORTFOLIO',
    payload: { lotDetails }
  };
};

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

// Example of action sending other data, and getting a param
// export const useParam = (newNumParam) => {
//   return {
//     type: 'TOGGLE_MENU',
//     payload: { number: newNumParam }
//   }
// };
