/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug]
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});

export default withMDX({
  // Append the default value with md extensions
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: []
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx']
});
