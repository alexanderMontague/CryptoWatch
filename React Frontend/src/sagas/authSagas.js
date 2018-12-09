import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { registerSuccess, registerFailed } from '../actions/authActions';
import { registerUser } from '../helpers/requests';

function* attemptRegisterUser(action) {
  const response = yield registerUser(action.payload);

  console.log('response:', response);
  yield put(registerSuccess(response));
  console.log('data:', action.payload);
}
export function* authSaga() {
  yield takeLatest('REGISTER_USER', attemptRegisterUser);
}
