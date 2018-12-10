import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { registerSuccess, registerFailure } from '../actions/authActions';
import { registerUser } from '../helpers/requests';

function* attemptRegisterUser(action) {
  const registerResponse = yield registerUser(action.payload);

  if (registerResponse.error) {
    yield put(registerFailure(registerResponse));
    return;
  }

  yield put(registerSuccess(registerResponse));
}
export function* authSaga() {
  yield takeLatest('REGISTER_USER', attemptRegisterUser);
}
