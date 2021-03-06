const axios = require('axios');
const moment = require('moment');

// Decodes and Parses encoded body information
const decodeBody = bodyObject => {
  return JSON.parse(new Buffer(bodyObject, 'base64').toString('ascii'));
};

/*  Formats a response to be sent back
 *  response: {
 *    code: Integer,
 *    message: String,
 *    data: Object || Array || null,
 *    error: Boolean || null
 *  }
 */
const createResponse = (code, message, data, error) => {
  return {
    code,
    message,
    data,
    error,
  };
};

module.exports = {
  decodeBody,
  createResponse,
};
