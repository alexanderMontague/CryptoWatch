export const registerUser = data => ({
  type: 'REGISTER_USER',
  payload: data
});

export const registerSuccess = data => ({
  type: 'REGISTER_SUCCESS',
  payload: data
});

export const registerFailed = data => ({
  type: 'REGISTER_FAILED',
  payload: data
});
