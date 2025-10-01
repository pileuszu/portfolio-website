const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 추가 규칙이 필요한 경우 여기에 작성
      "@next/next/no-img-element": "off", // 필요시 이미지 관련 규칙 비활성화
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
];

module.exports = eslintConfig;
