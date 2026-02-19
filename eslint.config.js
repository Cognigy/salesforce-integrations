import { defineConfig, globalIgnores } from "eslint/config";
import { fixupPluginRules } from "@eslint/compat";
import lwcConfig from "@salesforce/eslint-config-lwc";
import auraPlugin from "@salesforce/eslint-plugin-aura";
import jestPlugin from "eslint-plugin-jest";
import prettierConfig from "eslint-config-prettier";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "**/lwc/**/*.css",
    "**/lwc/**/*.html",
    "**/lwc/**/*.json",
    "**/lwc/**/*.svg",
    "**/lwc/**/*.xml",
    "**/aura/**/*.auradoc",
    "**/aura/**/*.cmp",
    "**/aura/**/*.css",
    "**/aura/**/*.design",
    "**/aura/**/*.evt",
    "**/aura/**/*.json",
    "**/aura/**/*.svg",
    "**/aura/**/*.tokens",
    "**/aura/**/*.xml",
    "**/aura/**/*.app",
    ".sfdx",
    ".storybook",
    "storybook-static",
    "node_modules"
  ]),

  ...lwcConfig.configs.recommended,

  prettierConfig,

  {
    files: ["**/*.test.js"],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "@lwc/lwc/no-unexpected-wire-adapter-usages": "off"
    }
  },

  {
    files: ["**/*.stories.js"],
    plugins: {
      storybook: storybookPlugin
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
      "@lwc/lwc/no-unexpected-wire-adapter-usages": "off",
      "@lwc/lwc/no-async-operation": "off"
    }
  },

  {
    files: ["**/aura/**/*.js"],
    plugins: {
      "@salesforce/aura": fixupPluginRules(auraPlugin)
    },
    rules: {
      "@salesforce/aura/aura-api": "error",
      "@salesforce/aura/ecma-intrinsics": "error",
      "@salesforce/aura/secure-document": "error",
      "@salesforce/aura/secure-window": "error",
      "vars-on-top": "off",
      "no-unused-expressions": "off"
    }
  },

  {
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: "latest",
      sourceType: "module"
    }
  }
]);
