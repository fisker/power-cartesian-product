/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjVjK
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  env: {},
  parserOptions: {},
  extends: ['@fisker'],
  settings: {},
  rules: {
    'no-restricted-exports': 'off',
  },
  plugins: [],
  globals: {},
  overrides: [
    {
      files: ['benchmarks/*', 'examples/*', 'test/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
