import { put, takeLatest, all } from 'redux-saga/effects';
import { registerSuccess, registerFailure } from '../actions/authActions';
import { registerUser } from '../helpers/requests';

function* attemptRegisterUser({ payload }) {
  const registerResponse = yield registerUser(payload);

  if (registerResponse.error) {
    yield put(registerFailure(registerResponse));
    return;
  }

  yield put(registerSuccess(registerResponse));
}
export function* authSaga() {
  yield takeLatest('REGISTER_USER', attemptRegisterUser);
}
