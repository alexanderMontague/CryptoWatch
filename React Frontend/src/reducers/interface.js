const initialState = {
  showModal: false,
  showMenu: false
};

const interfaceReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return { ...prevState, showModal: !prevState.showModal };
    case 'TOGGLE_MENU':
      return { ...prevState, showMenu: !prevState.showMenu };
    default:
      return prevState;
  }
};

export default interfaceReducer;
