function hasBabelConfigFile() {
  try {
    const babel = require('@babel/core')
    const config = babel.loadPartialConfig()
    return config.hasFilesystemConfig()
    // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (err) {
    return false
  }
}

module.exports = {
  hasBabelConfigFile,
}
