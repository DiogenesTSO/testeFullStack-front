module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'space-before-blocks': 0,
    'block-spacing': 0,
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    quotes: 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'no-useless-escape': 0,
    'prefer-promise-reject-errors': 0,
  },
}
