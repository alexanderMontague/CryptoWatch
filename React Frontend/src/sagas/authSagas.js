import { put, takeLatest, all } from 'redux-saga/effects';

function* postUser() {
  const response = yield call('https://newsapi.org/v1/articles?')
}
export default function* authSaga() {
  yield takeLatest('REGISTER_USER', postUser)
}
