console.log('in controller index.js', require('./home').index);
module.exports = {
  // controllerName: require('./controllerPath'),
  index: require('./home').index,
  getTest: require('./home').getTest,
};
