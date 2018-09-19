import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const defaultState = {
  showMenu: false,
  baseCurrency: 'USD', // Base currency that all coin price data is fetched from. This is because CryptoCompare API has an abundance of American exchanges to source from
  selectedBaseCurrency: 'CAD', // Base currency the user will select to view prices in this currency,
  portfolio: {}
};

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
