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
  if (hasInstalledPackage('@vue/composition-api')) {
    presets.push('@cyansalt/eslint-config/vue/script-setup')
  }
}

let isPartiallyUsingTS = false

if (hasInstalledPackage('typescript')) {
  const compilerOptions = getTSCompilerOptions()
  // Enable partially only when declared as `false` explicitly
  if (compilerOptions && compilerOptions.checkJs === false) {
    isPartiallyUsingTS = true
    presets.push('@cyansalt/eslint-config/vue/typescript/partial')
  } else {
    presets.push('@cyansalt/eslint-config/vue/typescript')
  }
}

if (hasBabelConfigFile()) {
  if (isPartiallyUsingTS) {
    presets.push('@cyansalt/eslint-config/vue/babel/partial')
  } else {
    presets.push('@cyansalt/eslint-config/vue/babel')
  }
}

module.exports = {
  extends: presets,
}
