import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* postUser() {
  const response = yield axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data);
  console.log(response);
}
export function* authSaga() {
  yield takeLatest('REGISTER_USER', postUser);
}
