module.exports = {
  root: true,
  extends: [
    require.resolve('./index.js'),
  ],
  rules: {
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-optional-catch-binding': 'off',
  },
}
