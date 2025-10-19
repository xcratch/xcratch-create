module.exports = {
  root: true,
  plugins: [],
  extends: [
    "eslint:recommended",
  ],
  env: {
    es6: true,
    "node": true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
};
