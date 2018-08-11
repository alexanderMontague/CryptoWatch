import { combineReducers } from 'redux';

// const allReducers = combineReducers({
//   reducerOne,
//   reduverTwo
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
      
    // Reducer case where you get other data from the action
    // case 'USE_PARAMS:
    //  do something with action.payload 
    //  const newNumber = action.payload.number
    //  return { ...prevState, number: prevState.number + newNumber }

    default:
      return prevState;
  }
}

export default rootReducer;