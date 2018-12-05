const initialState = {
  loggedIn: false,
  loginModalOpen: false,
};

const authReducer = (prevState=initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...prevState, loggedIn: true };
    case 'SIGNUP_SUCCESS':
      console.log(action.payload);
      return prevState;
    case 'OPEN_LOGIN_MODAL':
      return { ...prevState, loginModalOpen: true };
    case 'CLOSE_LOGIN_MODAL':
      return { ...prevState, loginModalOpen: false };
    default:
      return prevState;
  }
};

export default authReducer;
