import { all } from 'redux-saga/effects';
import { authSaga } from './authSagas';
import { tradeSaga } from './tradeSagas';

export default function* rootSaga() {
  yield all([authSaga(), tradeSaga()]);
}
