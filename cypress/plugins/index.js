const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const fs = require('fs');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);

  on('task', {
      failed: require('cypress-failed-log/src/failed')(),
  })
};
