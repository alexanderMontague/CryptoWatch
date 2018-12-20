import { put, takeLatest, all } from 'redux-saga/effects';
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure
} from '../actions/authActions';
import { registerUser, loginUser, logoutUser } from '../helpers/requests';

// REGISTER
function* attemptRegisterUser({ payload }) {
  const registerResponse = yield registerUser(payload);

  if (registerResponse.error) {
    return yield put(registerFailure(registerResponse));
  }

  yield put(registerSuccess(registerResponse));
}

// LOGIN
function* attemptLoginUser({ payload }) {
  const loginResponse = yield loginUser(payload);

  if (loginResponse.error) {
    return yield put(loginFailure(loginResponse));
  }

  yield put(loginSuccess(loginResponse));
}

// LOGOUT
function* attemptLogoutUser({ payload }) {
  const logoutResponse = yield logoutUser(payload);

  if (logoutResponse.error) {
    return yield put(logoutFailure(logoutResponse));
  }

  yield put(logoutSuccess(logoutResponse));
}

export function* authSaga() {
  yield takeLatest('REGISTER_USER', attemptRegisterUser);
  yield takeLatest('LOGIN_USER', attemptLoginUser);
  yield takeLatest('LOGOUT_USER', attemptLogoutUser);
}
