import { CustomLink } from '@components/link/custom-link';
import type { MDXComponents } from 'mdx/types';
import { CustomPre } from './custom-pre';

export const components: MDXComponents = {
  a: CustomLink,
  pre: CustomPre
};
