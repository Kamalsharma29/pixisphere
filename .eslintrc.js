/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'eslint:recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@next/next/no-img-element': 'off',
  },
};
