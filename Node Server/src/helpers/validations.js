const User = require('../../models/User');
const { createResponse } = require('./index');

const requiredFields = registerFields => {
  const { email, username, passwordOne, passwordTwo, terms } = registerFields;
  const passwordErrors = validatePasswords(passwordOne, passwordTwo);
  // possibly have terms?

  if (!username) {
    return createResponse(200, 'Username required for register!', null, true);
  } else if (!email) {
    return createResponse(200, 'Email required for register!', null, true);
  }

  if (passwordErrors) {
    return passwordErrors;
  }

  return null;
};

async function validateEmailAndUsername(email, username) {
  let validationResponse = null;

  await User.find({ username }, (err, document) => {
    if (err) {
      validationResponse = createResponse(500, 'Error while registering', err, true);
    }
    if (document.length > 0) {
      validationResponse = createResponse(
        200,
        'A user with that username or email already exists!',
        null,
        true
      );
    }
  });

  await User.find({ email }, (err, document) => {
    if (err) {
      validationResponse = createResponse(500, 'Error while registering', err, true);
    }
    if (document.length > 0) {
      validationResponse = createResponse(
        200,
        'A user with that username or email already exists!',
        null,
        true
      );
    }
  });

  return validationResponse;
}

const validatePasswords = (passwordOne, passwordTwo) => {
  if (!passwordOne) {
    return createResponse(200, 'Password required for register!', null, true);
  } else if (!passwordTwo) {
    return createResponse(200, 'Please confirm password!', null, true);
  } else if (passwordOne !== passwordTwo) {
    return createResponse(200, 'Passwords must match!', null, true);
  }
  // todo check password rules?
  return null;
};

module.exports = {
  requiredFields,
  validateEmailAndUsername,
  validatePasswords,
};
