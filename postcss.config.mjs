// @ts-check

/**
 * @typedef {Object} Config
 * @property {Record<'tailwindcss' | 'autoprefixer', Record<string, never>>} plugins
 */

/** @type {Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

export default config;
