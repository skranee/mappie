import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "warn",
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./src"]],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      },
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    env: {
      jest: true,
    },
    rules: {
      "no-console": "off",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
);
