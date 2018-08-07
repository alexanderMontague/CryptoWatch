// ACTIONS

export const toggleMenu = () => {  
  return {
    type: 'TOGGLE_MENU',
  }
};

export const selectCoin = coinTicker => {  
  return {
    type: 'SELECT_COIN',
    payload: { ticker: coinTicker }
  }
}

// Example of action sending other data, and getting a param
// export const useParam = (newNumParam) => {  
//   return {
//     type: 'TOGGLE_MENU',
//     payload: { number: newNumParam }
//   }
// };
