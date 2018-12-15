const initialState = {
  loggedIn: false,
  isLoginLoading: false,
  isRegisterLoading: false,
  registerStatus: {}
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return { ...prevState, isRegisterLoading: true };
    case 'REGISTER_SUCCESS':
      return {
        ...prevState,
        isRegisterLoading: false,
        registerStatus: action.payload
      };
    case 'REGISTER_FAILURE':
      return {
        ...prevState,
        isRegisterLoading: false,
        registerStatus: action.payload
      };
    case 'LOGIN_USER':
      return { ...prevState, isLoginLoading: true };
    case 'LOGIN_SUCCESS':
      return { ...prevState, loggedIn: true, isLoginLoading: false };
    case 'LOGIN_FAILURE':
      return { ...prevState, isLoginLoading: false };
    default:
      return prevState;
  }
};

export default authReducer;
