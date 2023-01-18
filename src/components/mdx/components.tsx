import { CustomLink } from '@components/link/custom-link';
import { CustomPre } from './custom-pre';
import type { MDXComponents } from 'mdx/types';

export const components: MDXComponents = {
  a: CustomLink,
  pre: CustomPre
};
