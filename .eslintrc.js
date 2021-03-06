module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {},
    extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
    rules: {
        "@typescript-eslint/no-non-null-assertion": 0,
    },
}
