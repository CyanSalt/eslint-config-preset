const { hasInstalledPackage } = require('./utils')

const presets = []

if (hasInstalledPackage('vue', '>=3.x')) {
  presets.push('@cyansalt/eslint-config/vue')
  presets.push('@cyansalt/eslint-config/vue/scoped-css')
} else {
  presets.unshift('@cyansalt/eslint-config/vue/v2')
  presets.push('@cyansalt/eslint-config/vue/scoped-css/v2')
}

if (hasInstalledPackage('typescript')) {
  presets.push('@cyansalt/eslint-config/vue/typescript')
}

module.exports = {
  extends: presets,
}
