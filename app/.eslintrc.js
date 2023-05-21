module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'max-len': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'camelcase': 'off'
  },
  ignorePatterns: ['**test.js', '**stories.js'],
};
