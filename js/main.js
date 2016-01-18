
/*
00     00   0000000   000  000   000
000   000  000   000  000  0000  000
000000000  000000000  000  000 0 000
000 0 000  000   000  000  000  0000
000   000  000   000  000  000   000
 */
module.exports = {
  extnames: ['.json', '.cson', '.noon', '.plist', '.yml', '.yaml'],
  extensions: ['json', 'cson', 'noon', 'plist', 'yml', 'yaml'],
  stringify: require('./stringify'),
  load: require('./load'),
  save: require('./save'),
  find: require('./find'),
  get: require('./get'),
  regexp: require('./regexp')
};
