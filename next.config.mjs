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
  keepBackground: true,

  // Callback hooks to add custom logic to nodes when visiting
  // them.
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },

  onVisitHighlightedLine(node) {
    // Each line node by default has `class="line"`.
    node.properties.className.push('highlighted');
  },

  onVisitHighlightedWord(node) {
    // Each word node has no className by default.
    node.properties.className = ['word'];
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
    domains: []
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx']
});
