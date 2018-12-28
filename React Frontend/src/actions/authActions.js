// Auth/identity Actions

// REGISTER
export const registerUser = data => ({
  type: 'REGISTER_USER',
  payload: data
});

export const registerSuccess = data => ({
  type: 'REGISTER_SUCCESS',
  payload: data
});

export const registerFailure = data => ({
  type: 'REGISTER_FAILURE',
  payload: data
});

// LOGIN
export const loginUser = data => ({
  type: 'LOGIN_USER',
  payload: data
});

export const loginSuccess = data => ({
  type: 'LOGIN_SUCCESS',
  payload: data
});

export const loginFailure = data => ({
  type: 'LOGIN_FAILURE',
  payload: data
});

// LOGOUT
export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});

export const logoutSuccess = data => ({
  type: 'LOGOUT_SUCCESS',
  payload: data
});

export const logoutFailure = data => ({
  type: 'LOGOUT_FAILURE',
  payload: data
});

// GET USER STATUS
export const getUserStatus = () => ({
  type: 'GET_USER_STATUS'
});

export const userStatusResponse = data => ({
  type: 'USER_STATUS_RESPONSE',
  payload: data
});
