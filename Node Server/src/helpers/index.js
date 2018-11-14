// Decodes and Parses encoded body information
const decodeBody = bodyObject => {
  return JSON.parse(new Buffer(bodyObject, 'base64').toString('ascii'));
};

module.exports = {
  decodeBody,
};
