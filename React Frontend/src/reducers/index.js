import { combineReducers } from 'redux';
import loginState from './login';
import tradeState from './trade';
import interfaceState from './interface';

const rootReducer = combineReducers({
  tradeState,
  loginState,
  interfaceState
});

export default rootReducer;
