module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ["dist",'.eslintrc.js', 'src/migrations/'],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // Add your custom rules here
    'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
    "@typescript-eslint/no-unused-vars": "error",
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase']
      }
    ]
  },
};