export function sucessfulRegisterSelector(state) {
  const {
    authState: { registerStatus: message, data, error }
  } = state;

  return !error && data.username && data.email && message.contains('Success');
}
