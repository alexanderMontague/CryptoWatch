import { combineReducers } from 'redux';
import loginReducer from './login'
import niceReducerBud from './shit'

const rootReducer = combineReducers({
   niceReducerBud,
   loginReducer,
});

export default rootReducer;
