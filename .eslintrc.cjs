module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['server/**/*.js'],
      env: { node: true, browser: false },
    },
    {
      files: ['client/**/*.{js,jsx}'],
      env: { browser: true, node: false },
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
};
