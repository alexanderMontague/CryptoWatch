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
