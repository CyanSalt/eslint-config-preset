const { getTSCompilerOptions } = require('./ts-utils')
const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt',
  '@cyansalt/eslint-config/import',
  '@cyansalt/eslint-config/unicorn',
  '@cyansalt/eslint-config/galaxy',
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

module.exports = {
  extends: presets,
}
