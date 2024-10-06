module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:node/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'node/no-unsupported-features/es-syntax': [
            'error',
            {
                ignores: ['modules'],
            },
        ],
    },
    settings: {
        node: {
            tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
        },
    },
};
