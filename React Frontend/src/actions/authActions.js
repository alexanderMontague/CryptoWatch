export const registerUser = (data) => ({
  type: 'REGISTER_USER',
  data,
});

export const registerSuccess = (data) => ({
  type: 'REGISTER_SUCCESS',
  data,
});

export const registerFailed = (data) => ({
  type: 'REGISTER_FAILED',
  data,
});