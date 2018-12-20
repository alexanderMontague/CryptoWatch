import { combineReducers } from 'redux';
import authState from './authReducer';
import tradeState from './tradeReducer';
import interfaceState from './interfaceReducer';

const rootReducer = combineReducers({
  tradeState,
  authState,
  interfaceState
});

export default rootReducer;
