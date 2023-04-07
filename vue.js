const { hasBabelConfigFile } = require('./babel-utils')
const { getTSCompilerOptions } = require('./ts-utils')
const { hasInstalledPackage } = require('./utils')

const presets = []

if (hasInstalledPackage('vue', '>=3.x')) {
  presets.push('@cyansalt/eslint-config/vue')
  presets.push('@cyansalt/eslint-config/vue/scoped-css')
} else {
  presets.unshift('@cyansalt/eslint-config/vue/v2')
  presets.push('@cyansalt/eslint-config/vue/scoped-css/v2')
}

if (hasInstalledPackage('@vue-macros/reactivity-transform') || hasInstalledPackage('unplugin-vue-macros')) {
  presets.push('@cyansalt/eslint-config/vue/reactivity-transform')
}

let isUsingTS = false
let isPartiallyUsingTS = false

if (hasInstalledPackage('typescript')) {
  isUsingTS = true
  const compilerOptions = getTSCompilerOptions()
  if (compilerOptions && compilerOptions.checkJs && !compilerOptions.jsx) {
    presets.push('@cyansalt/eslint-config/vue/typescript')
  } else {
    isPartiallyUsingTS = true
    presets.push('@cyansalt/eslint-config/vue/typescript/partial')
    if (compilerOptions && compilerOptions.jsx) {
      presets.push('@byted-star/eslint-config/vue/typescript/jsx')
    }
  }
}

if (hasBabelConfigFile()) {
  if (isPartiallyUsingTS) {
    presets.push('@cyansalt/eslint-config/vue/babel/partial')
  } else if (!isUsingTS) {
    presets.push('@cyansalt/eslint-config/vue/babel')
  }
}

module.exports = {
  extends: presets,
}
