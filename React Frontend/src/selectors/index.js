export const sucessfulRegisterSelector = state => {
  const {
    registerStatus: { message = '', data = {}, error = false }
  } = state.authState;

  return !error && data.username && data.email && message.includes('Success');
};
