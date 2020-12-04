/*
 * decaffeinate suggestions:
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Path from 'path';

module.exports = (() => {
  switch (Path.extname(__filename)) {
    // case '.coffee': return require('./src/monkey');
    default: return require('./src/monkey');
  }
})();
