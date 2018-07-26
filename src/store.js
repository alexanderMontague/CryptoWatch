import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const defaultState = {
  showMenu: false,
  testVal: 10
}

const enhancers = compose(
  window.devToolsExtension()
)

const store = createStore(rootReducer, defaultState, enhancers);

export default store;