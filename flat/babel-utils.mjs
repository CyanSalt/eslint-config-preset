import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export function hasBabelConfigFile() {
  try {
    const babel = require('@babel/core')
    const config = babel.loadPartialConfig()
    return config.hasFilesystemConfig()
  } catch (err) {
    return false
  }
}
