# @cyansalt/eslint-config-preset

> [!WARNING]
> This package has been deprecated. Use [@cyansalt/eslint-config](https://www.npmjs.com/package/@cyansalt/eslint-config) directly instead.

[![npm](https://img.shields.io/npm/v/@cyansalt/eslint-config-preset.svg)](https://www.npmjs.com/package/@cyansalt/eslint-config-preset)

My ESLint configuration preset.

## Installation

```shell
npm install --save-dev @cyansalt/eslint-config-preset
```

## Usage

```javascript
// .eslintrc.js
module.exports = {
  // ...
  extends: [
    '@cyansalt/preset',
  ],
  // ...
}
```

Or for [Flat Config](https://eslint.org/blog/2022/08/new-config-system-part-1/):

```javascript
// eslint.config.js
import presetConfig from '@cyansalt/eslint-config-preset/flat/index.mjs'

export default {
  // ...
  ...presetConfig,
  // ...
}
```

The ruleset will check your project dependencies and enable available configurations automatically. This eliminates the need for you to know any specific ruleset configuration.

### Vue SFC in TypeScript

By default, Vue SFCs with `lang="ts"` will only have a part of the simplest TS rules in a mixed TS project (without `checkJs: true` specified in `compilerOptions` of `tsconfig.json`), such as `@typescript-eslint/type-annotation-spacing`. For rules that rely on TS language services, such as `@typescript-eslint/no-unnecessary-condition`, the rules can be generated as follows:

```javascript
// .eslintrc.js
const { createVueTsConfig } = require('@cyansalt/eslint-config-preset/vue-utils')

module.exports = {
  // ...
  extends: [
    '@cyansalt/preset',
  ],
  overrides: [
    ...createVueTsConfig({ cwd: __dirname }),
  ],
  // ...
}
```

Or for [Flat Config](https://eslint.org/blog/2022/08/new-config-system-part-1/):

```javascript
// eslint.config.js
import * as url from 'node:url'
import presetConfig from '@cyansalt/eslint-config-preset/flat/index.mjs'
import { createVueTsConfig } from '@cyansalt/eslint-config-preset/flat/vue-utils.mjs'

const dir = url.fileURLToPath(new URL('.', import.meta.url))

export default [
  // ...
  ...presetConfig,
  ...createVueTsConfig({ cwd: dir }),
  // ...
]
```

Rule generation is usually fast (<=1s), but the time it takes for ESLint to use them will grow rapidly with the number of Vue SFC files with `lang="ts"` in your project. Please be careful yourself!

Also see [@cyansalt/eslint-config](https://www.npmjs.com/package/@cyansalt/eslint-config).
