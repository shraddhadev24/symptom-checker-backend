module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "/"],
      },
    },
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-restricted-globals": "off",
    "no-restricted-syntax": "off",
    "prefer-regex-literals": "off",
    "consistent-return": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  overrides: [{ files: ["*.ts"], rules: { "no-undef": "off" } }],
};
