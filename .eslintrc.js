module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-alert': 'off',
    'operator-assignment': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
