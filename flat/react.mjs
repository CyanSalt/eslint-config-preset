import reactHooksConfig from '@cyansalt/eslint-config/flat/react/hooks.mjs'
import reactConfig from '@cyansalt/eslint-config/flat/react/index.mjs'
import { hasInstalledPackage } from './utils.mjs'

export default [
  ...reactConfig,
  ...(
    hasInstalledPackage('react', '>=16.0.0') ? reactHooksConfig : []
  ),
]
