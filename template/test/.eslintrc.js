module.exports = {
  root: true,
  plugins: ["mocha"],
  extends: ["plugin:mocha/recommended"],
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  parserOptions: {
    sourceType: "module",
  },
};
