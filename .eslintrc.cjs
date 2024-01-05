// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { readdirSync, existsSync } = require("fs");
const { join } = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    "packages/typescript-compat/*/dist/**",
    "packages/*/dist/**",
    "packages/*/.tmp/**",
    "node_modules/**",
  ],
  plugins: ["@typescript-eslint", "n", "import"],
  // Rules and settings that do not require a non-default parser
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "error",
    "import/no-duplicates": "off",
  },
  settings: {},
  overrides: [
    ...readdirSync("packages", { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join("packages", entry.name))
      .filter((dir) => existsSync(join(dir, "tsconfig.json")))
      .map((dir) => {
        return {
          files: [join(dir, "src/**/*.ts")],
          parser: "@typescript-eslint/parser",
          parserOptions: {
            project: "./tsconfig.json",
            tsconfigRootDir: dir,
          },
          settings: {
            "import/resolver": {
              typescript: {
                project: "packages/*/tsconfig.json",
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
            "@typescript-eslint/no-unnecessary-boolean-literal-compare":
              "error",
            "@typescript-eslint/no-invalid-void-type": "error",
            "@typescript-eslint/no-base-to-string": "error",
            "import/no-cycle": "error",
            "import/no-duplicates": "off",
          },
        };
      }),
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
