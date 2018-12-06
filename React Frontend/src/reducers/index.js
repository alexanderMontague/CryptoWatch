import { combineReducers } from 'redux';
import loginState from './login';
import tradeState from './trade';

const rootReducer = combineReducers({
  tradeState,
  loginState
});

export default rootReducer;
