console.log('in controller index.js', require('./home').index);
module.exports = {
  // controllerName: require('./controllerPath'),
  index: require('./home'),
  getTest: require('./home'),
  portfolio: require('./portfolio'),
};
