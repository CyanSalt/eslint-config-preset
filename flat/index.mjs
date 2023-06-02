import babelConfig from '@cyansalt/eslint-config/flat/babel/index.mjs'
import babelPartialConfig from '@cyansalt/eslint-config/flat/babel/partial.mjs'
import importConfig from '@cyansalt/eslint-config/flat/import.mjs'
import jsConfig from '@cyansalt/eslint-config/flat/index.mjs'
import typescriptConfig from '@cyansalt/eslint-config/flat/typescript/index.mjs'
import typescriptPartialConfig from '@cyansalt/eslint-config/flat/typescript/partial.mjs'
import unicornConfig from '@cyansalt/eslint-config/flat/unicorn.mjs'
import { hasBabelConfigFile } from './babel-utils.mjs'
import galaxyConfig from './galaxy.mjs'
import reactConfig from './react.mjs'
import { getTSCompilerOptions } from './ts-utils.mjs'
import { hasInstalledPackage } from './utils.mjs'
import vueConfig from './vue.mjs'

let isUsingTS = false
let isPartiallyUsingTS = false

const isUsingVue = hasInstalledPackage('vue')

if (hasInstalledPackage('typescript')) {
  isUsingTS = true
  const compilerOptions = getTSCompilerOptions()
  isPartiallyUsingTS = !compilerOptions || !compilerOptions.checkJs || (isUsingVue && compilerOptions.jsx)
}

export default [
  ...jsConfig,
  ...importConfig,
  ...unicornConfig,
  ...(
    isUsingTS ? (
      isPartiallyUsingTS ? typescriptPartialConfig : typescriptConfig
    ) : []
  ),
  ...(
    hasBabelConfigFile() ? (
      isPartiallyUsingTS ? babelPartialConfig : babelConfig
    ) : []
  ),
  ...(
    hasInstalledPackage('react') ? reactConfig : []
  ),
  ...(
    isUsingVue ? vueConfig : []
  ),
  ...galaxyConfig,
]
