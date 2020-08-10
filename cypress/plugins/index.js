const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on) => {
  let pending = Promise.resolve();
  const webpackOptions = require('../../webpack.config.js');
  const preprocessor = webpackPreprocessor({webpackOptions});
  
  on('file:preprocessor', async (...args) => {
    await pending;
    pending = preprocessor(...args);
    return pending;
  });
  
  on('task', {
      failed: require('cypress-failed-log/src/failed')(),
  });
 
};

module.exports = (on, config) => {
  allureWriter(on, config);
  return config;
};
