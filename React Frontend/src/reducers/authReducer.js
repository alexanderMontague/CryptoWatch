const initialState = {
  isAuthenticated: false,
  user: null,
  isRegisterLoading: false,
  isLoginLoading: false,
  isLogoutLoading: false,
  registerStatus: {},
  logoutStatus: null
};

const authReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case 'REGISTER_USER':
      return { ...prevState, isRegisterLoading: true, registerStatus: {} };
    case 'REGISTER_SUCCESS':
      return {
        ...prevState,
        isRegisterLoading: false,
        registerStatus: payload
      };
    case 'REGISTER_FAILURE':
      return {
        ...prevState,
        isRegisterLoading: false,
        registerStatus: payload
      };

    case 'LOGIN_USER':
      return { ...prevState, isLoginLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...prevState,
        isLoginLoading: false,
        isAuthenticated: true,
        user: { ...payload.data }
      };
    case 'LOGIN_FAILURE':
      return { ...prevState, isLoginLoading: false, loginStatus: payload };

    case 'LOGOUT_USER':
      return { ...prevState, isLogoutLoading: true };
    case 'LOGOUT_SUCCESS':
      return {
        ...prevState,
        isLogoutLoading: false,
        isAuthenticated: false,
        user: null,
        logoutStatus: payload
      };
    case 'LOGOUT_FAILURE':
      return { ...prevState, isLogoutLoading: false, logoutStatus: payload };

    case 'USER_STATUS_RESPONSE':
      return { ...prevState, ...payload.data };

    default:
      return prevState;
  }
};

export default authReducer;
