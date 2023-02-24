const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt/eslint-config/galaxy',
]

if (hasInstalledPackage('vue')) {
  if (hasInstalledPackage('vue', '>=2.7')) {
    presets.push('@cyansalt/eslint-config/galaxy/vue')
  } else {
    presets.push('@cyansalt/eslint-config/galaxy/vue/v2')
  }
}

if (hasInstalledPackage('@vue-macros/reactivity-transform') || hasInstalledPackage('unplugin-vue-macros')) {
  presets.push('@cyansalt/eslint-config/galaxy/vue/reactivity-transform')
}

module.exports = {
  extends: presets,
}
