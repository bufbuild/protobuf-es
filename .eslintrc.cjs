module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  ignorePatterns: ["packages/*/dist/**"],
  plugins: ["@typescript-eslint", "n", "import"],
  // Rules and settings that do not require a non-default parser
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "error",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx,cts,mts}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: "tsconfig.json",
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "@typescript-eslint/strict-boolean-expressions": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/array-type": "off", // we use complex typings, where Array is actually more readable than T[]
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-base-to-string": "error",
      },
    },
    // For scripts and configurations, use Node.js rules
    {
      files: ["**/*.{js,mjs,cjs}"],
      parserOptions: {
        ecmaVersion: 13, // ES2022 - https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
      },
      extends: ["eslint:recommended", "plugin:n/recommended"],
      rules: {
                  "n/shebang": "off", // this rule reports _any_ shebang outside of an npm binary as an error
                  "n/prefer-global/process": "off",
                  "n/no-process-exit": "off",
                  "n/exports-style": ["error", "module.exports"],
                  "n/file-extension-in-import": ["error", "always"],
                  "n/prefer-global/buffer": ["error", "always"],
                  "n/prefer-global/console": ["error", "always"],
                  "n/prefer-global/url-search-params": ["error", "always"],
                  "n/prefer-global/url": ["error", "always"],
                  "n/prefer-promises/dns": "error",
                  "n/prefer-promises/fs": "error",
                  "n/no-unsupported-features/node-builtins": "error",
                  "n/no-unsupported-features/es-syntax": "error",
      },
    },
  ],
};
