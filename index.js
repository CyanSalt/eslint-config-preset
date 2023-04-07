const { hasBabelConfigFile } = require('./babel-utils')
const { getTSCompilerOptions } = require('./ts-utils')
const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt',
  '@cyansalt/eslint-config/import',
  '@cyansalt/eslint-config/unicorn',
]

let isUsingTS = false
let isPartiallyUsingTS = false

const isUsingVue = hasInstalledPackage('vue')

if (hasInstalledPackage('typescript')) {
  isUsingTS = true
  const compilerOptions = getTSCompilerOptions()
  if (compilerOptions && compilerOptions.checkJs && !(isUsingVue && compilerOptions.jsx)) {
    presets.push('@cyansalt/eslint-config/typescript')
  } else {
    isPartiallyUsingTS = true
    presets.push('@cyansalt/eslint-config/typescript/partial')
  }
}

if (hasBabelConfigFile()) {
  if (isPartiallyUsingTS) {
    presets.push('@cyansalt/eslint-config/babel/partial')
  } else if (!isUsingTS) {
    presets.push('@cyansalt/eslint-config/babel')
  }
}

if (hasInstalledPackage('react')) {
  presets.push(require.resolve('./react.js'))
}

if (isUsingVue) {
  presets.push(require.resolve('./vue.js'))
}

presets.push(require.resolve('./galaxy.js'))

module.exports = {
  extends: presets,
}
