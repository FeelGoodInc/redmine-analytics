import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic                       from '@stylistic/eslint-plugin';
import stylisticJs                     from '@stylistic/eslint-plugin-js';
import stylisticTs                     from '@stylistic/eslint-plugin-ts';
import stylisticJsx                    from '@stylistic/eslint-plugin-jsx';
import typescriptEslint                from '@typescript-eslint/eslint-plugin';
import tsParser                        from '@typescript-eslint/parser';
import path                            from 'node:path';
import { fileURLToPath }               from 'node:url';
import js                              from '@eslint/js';
import { FlatCompat }                  from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([
    "**/.next",
    "**/node_modules",
    "**/.vscode",
    "**/.idea",
    "**/eslint.config.mjs",
    "**/tsconfig.json",
  ]),
  {
    extends: compat.extends(
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ),
    plugins: {
      "@stylistic": stylistic,
      "@stylistic/js": stylisticJs,
      "@stylistic/ts": stylisticTs,
      "@stylistic/jsx": stylisticJsx,
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@next/next/no-img-element": "off",
      // TS
      "@typescript-eslint/array-type": ["error", {
        default: "array",
      }],
      "@stylistic/ts/member-delimiter-style": "warn",
      //"@typescript-eslint/ban-types": "error", // deprecated
      "@typescript-eslint/no-restricted-types": "error",
      "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",

      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-module-boundary-types": ["warn", {
          allowArgumentsExplicitlyTypedAsAny: true,
      }],
      "@typescript-eslint/no-explicit-any": "off",
      "@stylistic/ts/padding-line-between-statements": [
        "error",
        // imports / exports
        { blankLine: "never", prev: "*", next: "import" },
        { blankLine: "always", prev: "*", next: "export" },
        // variables
        { blankLine: "always", prev: ["const", "let"], next: ["return", "expression"] },
        { blankLine: "never", prev: "singleline-const", next: "singleline-const" },
        // if
        { blankLine: "always", prev: ["const", "let"], next: "if" },
        { blankLine: "always", prev: "if", next: ["return", "expression", "if", "switch", "while"] },
        { blankLine: "always", prev: "expression", next: "if" },
        // switch
        { blankLine: "always", prev: ["const", "let"], next: "switch" },
        { blankLine: "always", prev: "switch", next: ["return", "expression", "if", "switch", "while"] },
        { blankLine: "always", prev: "expression", next: "switch" },
        // while
        { blankLine: "always", prev: ["const", "let"], next: "while" },
        { blankLine: "always", prev: "while", next: ["return", "expression", "if", "switch", "while"] },
        { blankLine: "always", prev: "expression", next: "while" },
        // expressions
        { blankLine: "never",  prev: "expression", next: "expression" },
        { blankLine: "always", prev: "multiline-expression", next: "expression" },
        { blankLine: "always", prev: "expression", next: "multiline-expression" },
        // return
        { blankLine: "always", prev: "*", next: "return" }
      ],
      // JS
      "@stylistic/js/array-bracket-spacing": ["warn", "always", {
        singleValue: true,
        objectsInArrays: false,
        arraysInArrays: false,
      }],
      "@stylistic/js/arrow-spacing": "error",
      "@stylistic/js/block-spacing": "error",
      "@stylistic/js/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/js/comma-spacing": ["warn", {
          before: false,
          after: true,
      }],
      "@stylistic/js/computed-property-spacing": ["error", "never"],
      "@stylistic/js/dot-location": ["error", "property"],
      "@stylistic/js/indent": ["warn", 2, {
          SwitchCase: 1,
          VariableDeclarator: "first",
          MemberExpression: 0,
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
      }],
      "@stylistic/js/key-spacing": ["error", {
        beforeColon: false,
        afterColon: true,
        mode: "minimum",
      }],
      "@stylistic/js/keyword-spacing": ["error", {
        before: true,
        after: true,
      }],
      "@stylistic/js/max-len": ["error", {
        code: 130,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }],
      "@stylistic/js/no-multiple-empty-lines": ["warn", {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      }],
      "@stylistic/js/no-trailing-spaces": ["warn", {
        skipBlankLines: true,
        ignoreComments: true,
      }],
      "@stylistic/js/no-whitespace-before-property": "warn",
      "@stylistic/js/object-curly-newline": ["warn", {
        multiline: true,
        minProperties: 4,
        consistent: true,
      }],
      "@stylistic/js/object-curly-spacing": ["warn", "always"],
      "@stylistic/js/object-property-newline": ["warn", {
        allowAllPropertiesOnSameLine: true,
      }],
      "@stylistic/js/quotes": ["warn", "single"],
      "@stylistic/js/semi": ["warn", "always", {
        omitLastInOneLineBlock: true,
      }],
      "@stylistic/js/semi-spacing": "error",
      "@stylistic/js/space-before-blocks": "error",
      "@stylistic/js/space-infix-ops": "error",
      "@stylistic/js/space-unary-ops": "error",
      "@stylistic/js/switch-colon-spacing": "error",
      "@stylistic/js/template-curly-spacing": "error",
      "array-callback-return": "error",
      "func-style": ["error", "declaration", {
        allowArrowFunctions: true,
      }],
      "no-await-in-loop": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "no-else-return": "error",
      "no-empty": "error",
      "no-multi-assign": "error",
      "no-nested-ternary": "error",
      "no-param-reassign": ["warn", { props: true }],
      "no-sparse-arrays": "error",
      "no-tabs": "warn",
      "no-template-curly-in-string": "error",
      "no-unexpected-multiline": "error",
      "no-unneeded-ternary": "error",
      "no-unsafe-optional-chaining": "error",
      "no-use-before-define": "error",
      "no-var": "error",
      "prefer-object-spread": "error",
      "react-hooks/exhaustive-deps": 0,
      "require-await": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      // JSX
      "react/jsx-filename-extension": [1, {
        extensions: [".ts", ".tsx"],
      }],
      "@stylistic/js/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx/jsx-closing-bracket-location": [1, "tag-aligned"],
      "@stylistic/jsx/jsx-equals-spacing": [1, "never"],
      "@stylistic/jsx/jsx-first-prop-new-line": [1, "multiline"],
      "@stylistic/jsx/jsx-max-props-per-line": [1, {
        maximum: 1,
      }],
      "@stylistic/jsx/jsx-props-no-multi-spaces": "warn",
      "@stylistic/jsx/jsx-sort-props": [1, {
        callbacksLast: true,
        noSortAlphabetically: true,
      }],
      "@stylistic/jsx/jsx-tag-spacing": [1, {
        beforeSelfClosing: "always",
      }],
      "@stylistic/jsx/jsx-wrap-multilines": [1, {
        arrow: "parens-new-line",
        assignment: "parens-new-line",
        condition: "parens-new-line",
        declaration: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
        return: "parens-new-line",
      }],
      "@stylistic/ts/type-annotation-spacing": ["warn", {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }],
    },
  }
]);