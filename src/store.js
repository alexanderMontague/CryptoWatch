import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const defaultState = {
  showMenu: false
};

const enhancers = compose(window.devToolsExtension());

const store = createStore(
  rootReducer,
  +defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
