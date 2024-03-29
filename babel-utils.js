function hasBabelConfigFile() {
  try {
    const babel = require('@babel/core')
    const config = babel.loadPartialConfig()
    return config.hasFilesystemConfig()
  } catch (err) {
    return false
  }
}

module.exports = {
  hasBabelConfigFile,
}
