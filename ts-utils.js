const path = require('path')
const { getNearestPackageJson } = require('./utils')

function getTSCompilerOptions() {
  const nearestPackageJson = getNearestPackageJson()
  if (!nearestPackageJson) return undefined
  const tsConfigPath = path.join(path.dirname(nearestPackageJson), './tsconfig.json')
  try {
    const ts = require('typescript')
    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
    const { options } = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './')
    return options
  // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (err) {
    return undefined
  }
}

module.exports = {
  getTSCompilerOptions,
}
