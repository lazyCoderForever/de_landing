module.exports = {
   env: {
      es6: true,
      browser: true,
      node: true,
   },
   extends: ['plugin:prettier/recommended', 'prettier'],
   plugins: ['babel', 'prettier'],
   parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
   },
   rules: {
      'no-var': 'error',
      semi: 'error',
      indent: 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',
      'no-use-before-define': 'error',
      'prettier/prettier': ['error'],
   },
}
