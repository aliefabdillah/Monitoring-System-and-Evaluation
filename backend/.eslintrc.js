module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'always',
        jsx: 'always',
        ts: 'always',
        tsx: 'always',
      },
    ],
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
  },
};
