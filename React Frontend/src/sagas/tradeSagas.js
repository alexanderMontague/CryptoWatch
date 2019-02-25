import { put, takeLatest, select } from 'redux-saga/effects';
import { savePortfolio } from '../helpers/requests';
import {
  updatePortfolioSuccess,
  updatePortfolioFailure
} from '../actions/tradeActions';

// Selectors
const getPortfolio = state => state.tradeState.portfolio;
const getBaseCurrency = state => state.tradeState.baseCurrency;

// SAVE USER PORTFOLIO TO DB
function* saveUserPortfolio() {
  const updatedPortfolio = yield select(getPortfolio);
  const baseCurrency = yield select(getBaseCurrency);

  const savePortfolioResponse = yield savePortfolio(
    updatedPortfolio,
    baseCurrency
  );

  if (savePortfolioResponse.error) {
    return yield put(updatePortfolioFailure(savePortfolioResponse));
  }

  yield put(updatePortfolioSuccess(savePortfolioResponse));
}

export function* tradeSaga() {
  yield takeLatest('UPDATE_USER_PORTFOLIO', saveUserPortfolio);
}
