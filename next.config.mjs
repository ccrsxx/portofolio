import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-autolink-headings').Options} */
const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap'
};

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  // Use one of Shiki's packaged themes
  theme: {
    light: 'light-plus',
    dark: 'dark-plus'
  },

  // Keep the background or use a custom background color?
  keepBackground: false,

  onVisitLine(element) {
    // Add a custom class to each line
    element.properties.className = ['line'];
  },

  onVisitHighlightedLine(element) {
    // Add a custom class to each highlighted line
    element.properties.className.push('highlighted');
  },

  onVisitHighlightedChars(element) {
    // Add a custom class to each highlighted character
    element.properties.className = ['word'];
  }
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react'
  }
});

export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'i.scdn.co']
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx']
});
