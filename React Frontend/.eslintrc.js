module.exports = {
  env: {
    es6: true,
    browser: true,
    amd: true,
    node: true
  },
  extends: ["plugin:prettier/recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  globals: {
    CONFIG: false,
    GlobalID: false,
    AdaChaperone: false
  },
  rules: {
    // Temporary rules
    "react/prop-types": [1],
    "react/no-find-dom-node": [1],
    "react/no-deprecated": [1],
    'eol-last': [2],
    'no-trailing-spaces': [2],
    "arrow-parens": [2, "as-needed"],
    "array-bracket-newline": [
      "error",
      {
        multiline: true
      }
    ],
    "array-bracket-spacing": ["error", "never"],
    "brace-style": ["error"],
    "comma-spacing": ["error"],
    "comma-dangle": ["error"],
    curly: ["error"],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    "object-shorthand": ["error", "properties"],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false
      }
    ],
    "quote-props": ["error", "as-needed"],
  }
};

