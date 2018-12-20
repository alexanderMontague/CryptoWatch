const initialState = {
  loggedIn: false,
  isRegisterLoading: false,
  isLoginLoading: false,
  isLogoutLoading: false,
  registerStatus: {},
  loginStatus: {},
  logoutStatus: {}
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
      return { ...prevState, isLoginLoading: true, loginStatus: {} };
    case 'LOGIN_SUCCESS':
      return {
        ...prevState,
        loggedIn: true,
        isLoginLoading: false,
        loginStatus: payload
      };
    case 'LOGIN_FAILURE':
      return { ...prevState, isLoginLoading: false, loginStatus: payload };

    case 'LOGOUT_USER':
      return { ...prevState, isLogoutLoading: true, logoutStatus: {} };
    case 'LOGOUT_SUCCESS':
      return {
        ...prevState,
        loggedIn: false,
        isLogoutLoading: false,
        logoutStatus: payload
      };
    case 'LOGOUT_FAILURE':
      return { ...prevState, isLogoutLoading: false, logoutStatus: payload };

    default:
      return prevState;
  }
};

export default authReducer;
