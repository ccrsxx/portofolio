// @ts-check

export default /** @satisfies {import('prettier').Config} */ ({
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none'
});
