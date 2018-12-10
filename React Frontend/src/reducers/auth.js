const initialState = {
  loggedIn: false,
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
    case 'LOGIN_SUCCESS':
      return { ...prevState, loggedIn: true };
    case 'SIGNUP_SUCCESS':
      // todo signup stuff
      return prevState;
    default:
      return prevState;
  }
};

export default authReducer;
