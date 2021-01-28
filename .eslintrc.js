module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['plugin:prettier/recommended', 'prettier'],
    plugins: ['babel', 'prettier'],
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error'],
    },
}
