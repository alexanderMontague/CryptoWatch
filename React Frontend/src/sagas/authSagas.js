import { put, takeLatest } from 'redux-saga/effects';
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  userStatusResponse
} from '../actions/authActions';
import { hideDetails } from '../actions/tradeActions';
import {
  registerUser,
  loginUser,
  logoutUser,
  userStatus
} from '../helpers/requests';

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
function* attemptLogoutUser() {
  const logoutResponse = yield logoutUser();

  if (logoutResponse.error) {
    return yield put(logoutFailure(logoutResponse));
  }

  yield put(hideDetails());
  yield put(logoutSuccess(logoutResponse));
}

// GET STATUS
function* getUserStatus() {
  const userStatusData = yield userStatus();

  yield put(userStatusResponse(userStatusData));
}

export function* authSaga() {
  yield takeLatest('REGISTER_USER', attemptRegisterUser);
  yield takeLatest('LOGIN_USER', attemptLoginUser);
  yield takeLatest('LOGOUT_USER', attemptLogoutUser);
  yield takeLatest('GET_USER_STATUS', getUserStatus);
}
