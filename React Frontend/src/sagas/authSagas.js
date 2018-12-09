import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { registerSuccess, registerFailed } from '../actions/authActions';

function* registerUser(action) {
  const response = yield axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data)
    .catch(err => {});

  console.log('response:', response);
  yield put(registerSuccess(response));

  console.log('data:', action.payload);
}
export function* authSaga() {
  yield takeLatest('REGISTER_USER', registerUser);
}
