module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // プロジェクトに合わせたルールを追加
    '@typescript-eslint/no-var-requires': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'no-unused-vars': 'warn', 
    'react/react-in-jsx-scope': 'off',
  },
};
