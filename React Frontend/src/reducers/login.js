const initialState = {
  loggedIn: false
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
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
