module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.eslint.json",
    },
    extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
    rules: {
        "@typescript-eslint/quotes": ["error", "double"],
        camelcase: "error",
        semi: ["error", "never"],
        indent: ["error", 4],
        "no-console": "error",
    },
}
