import jsConfig from '@cyansalt/eslint-config/flat/galaxy/index.mjs'
import typescriptConfig from '@cyansalt/eslint-config/flat/galaxy/typescript.mjs'
import vueConfig from '@cyansalt/eslint-config/flat/galaxy/vue/index.mjs'
import vueReactivityTransformConfig from '@cyansalt/eslint-config/flat/galaxy/vue/reactivity-transform.mjs'
import vueV2Config from '@cyansalt/eslint-config/flat/galaxy/vue/v2.mjs'
import { hasInstalledPackage } from './utils.mjs'

export default [
  ...jsConfig,
  ...(
    hasInstalledPackage('typescript') ? typescriptConfig : []
  ),
  ...(
    hasInstalledPackage('vue') ? (
      hasInstalledPackage('vue', '>=2.7') ? vueConfig : vueV2Config
    ) : []
  ),
  ...(
    hasInstalledPackage('@vue-macros/reactivity-transform') || hasInstalledPackage('unplugin-vue-macros')
      ? vueReactivityTransformConfig : []
  ),
]
