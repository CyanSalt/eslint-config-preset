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
  if (hasInstalledPackage('vue', '>=2.7') || hasInstalledPackage('@vue/composition-api')) {
    presets.push('@cyansalt/eslint-config/vue/ref-macros')
  }
}

let isUsingTS = false
let isPartiallyUsingTS = false

if (hasInstalledPackage('typescript')) {
  isUsingTS = true
  const compilerOptions = getTSCompilerOptions()
  if (compilerOptions && compilerOptions.checkJs) {
    presets.push('@cyansalt/eslint-config/vue/typescript')
  } else {
    isPartiallyUsingTS = true
    presets.push('@cyansalt/eslint-config/vue/typescript/partial')
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
