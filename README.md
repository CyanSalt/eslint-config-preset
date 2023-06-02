# @cyansalt/eslint-config-preset

[![npm](https://img.shields.io/npm/v/@cyansalt/eslint-config-preset.svg)](https://www.npmjs.com/package/@cyansalt/eslint-config-preset)

My ESLint configuration preset.

## Installation

```shell
npm install --save-dev @cyansalt/eslint-config-preset
```

## Usage

```javascript
// .eslintrc.js
module.exports {
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
import presetConfig from '@cyansalt/eslint-config-preset/flat/index.mjs';

export default {
  // ...
  ...presetConfig,
  // ...
};
```

The ruleset will check your project dependencies and enable available configurations automatically. This eliminates the need for you to know any specific ruleset configuration.

Also see [@cyansalt/eslint-config](https://www.npmjs.com/package/@cyansalt/eslint-config).
