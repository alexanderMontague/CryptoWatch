import { combineReducers } from 'redux';
import authState from './auth';
import tradeState from './trade';
import interfaceState from './interface';

const rootReducer = combineReducers({
  tradeState,
  authState,
  interfaceState
});

export default rootReducer;
