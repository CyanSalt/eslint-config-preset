const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt/eslint-config/galaxy',
]

if (hasInstalledPackage('vue')) {
  presets.push('@cyansalt/eslint-config/galaxy/vue')
}

module.exports = {
  extends: presets,
}
