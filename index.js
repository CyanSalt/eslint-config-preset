const { getTSCompilerOptions } = require('./ts-utils')
const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt',
  '@cyansalt/eslint-config/import',
  '@cyansalt/eslint-config/unicorn',
]

if (hasInstalledPackage('typescript')) {
  const compilerOptions = getTSCompilerOptions()
  // Enable partially only when declared as `false` explicitly
  if (compilerOptions && compilerOptions.checkJs === false) {
    presets.push('@cyansalt/eslint-config/typescript/partial')
  } else {
    presets.push('@cyansalt/eslint-config/typescript')
  }
}

if (hasInstalledPackage('@babel/eslint-parser')) {
  presets.push('@cyansalt/eslint-config/babel')
}

if (hasInstalledPackage('react')) {
  presets.push(require.resolve('./react.js'))
}

if (hasInstalledPackage('vue')) {
  presets.push(require.resolve('./vue.js'))
}

if (hasInstalledPackage('@vue/cli-service')) {
  presets.push('@cyansalt/eslint-config/import/vue-cli')
}

presets.push(require.resolve('./galaxy.js'))

module.exports = {
  extends: presets,
}
