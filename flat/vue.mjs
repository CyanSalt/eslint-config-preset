import babelConfig from '@cyansalt/eslint-config/flat/vue/babel/index.mjs'
import babelPartialConfig from '@cyansalt/eslint-config/flat/vue/babel/partial.mjs'
import vueConfig from '@cyansalt/eslint-config/flat/vue/index.mjs'
import reactivityTransformConfig from '@cyansalt/eslint-config/flat/vue/reactivity-transform.mjs'
import scopedCssConfig from '@cyansalt/eslint-config/flat/vue/scoped-css/index.mjs'
import scopedCssV2Config from '@cyansalt/eslint-config/flat/vue/scoped-css/v2.mjs'
import typescriptConfig from '@cyansalt/eslint-config/flat/vue/typescript/index.mjs'
import typescriptJsxConfig from '@cyansalt/eslint-config/flat/vue/typescript/jsx.mjs'
import typescriptPartialConfig from '@cyansalt/eslint-config/flat/vue/typescript/partial.mjs'
import v2Config from '@cyansalt/eslint-config/flat/vue/v2.mjs'
import { hasBabelConfigFile } from './babel-utils.mjs'
import { getTSCompilerOptions } from './ts-utils.mjs'
import { hasInstalledPackage } from './utils.mjs'

let isUsingTS = false
let isPartiallyUsingTS = false
let isUsingJSX = false

if (hasInstalledPackage('typescript')) {
  isUsingTS = true
  const compilerOptions = getTSCompilerOptions()
  isUsingJSX = Boolean(compilerOptions) && compilerOptions.jsx
  isPartiallyUsingTS = !compilerOptions || !compilerOptions.checkJs || isUsingJSX
}

export default [
  ...(
    hasInstalledPackage('vue', '>=3.x') ? [
      ...vueConfig,
      ...scopedCssConfig,
    ] : [
      ...v2Config,
      ...scopedCssV2Config,
    ]
  ),
  ...(
    hasInstalledPackage('@vue-macros/reactivity-transform') || hasInstalledPackage('unplugin-vue-macros')
      ? reactivityTransformConfig : []
  ),
  ...(
    isUsingTS ? (
      isPartiallyUsingTS ? typescriptPartialConfig : typescriptConfig
    ) : []
  ),
  ...(
    isUsingJSX ? typescriptJsxConfig : []
  ),
  ...(
    hasBabelConfigFile() ? (
      isPartiallyUsingTS ? babelPartialConfig : babelConfig
    ) : []
  ),
]
