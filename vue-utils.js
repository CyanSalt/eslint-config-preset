const fs = require('fs')
const fastglob = require('fast-glob')

function createVueTsConfig(options) {
  const scriptTs = 'lang="ts"'
  const vueTsFiles = fastglob.sync(['**/*.vue', '!**/node_modules/**'], options)
    .filter(file => fs.readFileSync(file, 'utf8').includes(scriptTs))
  return [
    {
      files: vueTsFiles,
      extends: [
        require.resolve('@cyansalt/eslint-config/typescript/index.js'),
      ],
      parser: require.resolve('vue-eslint-parser'),
    },
  ]
}

module.exports = {
  createVueTsConfig,
}
