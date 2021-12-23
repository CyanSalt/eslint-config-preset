const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt/eslint-config/react',
]

if (hasInstalledPackage('react', '>=16.0.0')) {
  presets.push('@cyansalt/eslint-config/react/hooks')
}

module.exports = {
  extends: presets,
}
