// (C) Copyright 2022 Hewlett Packard Enterprise Development LP.

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:grommet/recommended',
  ],
  plugins: ['react', 'jsx', 'jsx-a11y', 'react-hooks', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    it: true,
    expect: true,
    describe: true,
    jest: true,
    document: true,
    test: true,
    window: true,
    fetch: true,
    WebSocket: true,
    alert: true,
  },
  rules: {
    semi: [2, 'always'],
    indent: 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 0,
    'no-useless-concat': 0,
    'max-len': [2, { ignoreUrls: true, ignoreRegExpLiterals: true }],
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-filename-extension': 0,
    'implicit-arrow-linebreak': 0,
    'import/no-named-as-default': 0,
    'import/newline-after-import': 1,
    'react/no-unescaped-entities': 0,
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'operator-linebreak': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-danger': 0,
    'react/prefer-stateless-function': 0,
    'react/no-array-index-key': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-return-assign': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/no-unstable-nested-components': 0,
    'prefer-regex-literals': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
