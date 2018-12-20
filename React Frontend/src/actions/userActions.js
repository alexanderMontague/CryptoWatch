export const loadUserData = () => ({
  type: 'LOAD_USER_DATA'
});

export const loadUserDataSuccess = data => ({
  type: 'LOAD_USER_DATA_SUCCESS',
  payload: data
});

export const loadUserDataFailure = data => ({
  type: 'LOAD_USER_DATA_FAILURE',
  payload: data
});
