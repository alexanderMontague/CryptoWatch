const initialState = {
  loggedIn: false
};

const authReducer = (prevState=initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action.payload);
      return { loggedIn: true };
    default:
      return prevState;
  }
};

export default authReducer;
