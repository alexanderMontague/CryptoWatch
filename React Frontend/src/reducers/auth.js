const initialState = {
  loggedIn: false,
  isRegisterLoading: false
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return { ...prevState, isRegisterLoading: true };
    case 'REGISTER_SUCCESS':
      console.log('register success in reducer:', action.payload);
      return { ...prevState, isRegisterLoading: false };
    case 'REGISTER_FAILURE':
      console.log('register fail in reducer:', action.payload);
      return { ...prevState, isRegisterLoading: false };
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
