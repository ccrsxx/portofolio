// @ts-check

/** @satisfies {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none'
};

export default config;
