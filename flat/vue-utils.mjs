import * as fs from 'fs'
import typescriptConfig from '@cyansalt/eslint-config/flat/typescript/index.mjs'
import * as fastglob from 'fast-glob'
import vueEslintParser from 'vue-eslint-parser'

export function createVueTsConfig(options) {
  const scriptTs = 'lang="ts"'
  const vueTsFiles = fastglob.sync(['**/*.vue', '!**/node_modules/**'], options)
    .filter(file => fs.readFileSync(file, 'utf8').includes(scriptTs))
  return [
    ...typescriptConfig,
    {
      files: vueTsFiles,
      languageOptions: {
        parser: vueEslintParser,
      },
    },
  ]
}
