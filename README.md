# @cyansalt/eslint-config-preset

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

The ruleset will check your project dependencies and enable available configurations automatically. This eliminates the need for you to know any specific ruleset configuration.

Also see [@cyansalt/eslint-config](https://www.npmjs.com/package/@cyansalt/eslint-config).
