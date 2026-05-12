import { CustomPre } from '@components/content/custom-pre';
import { CustomLink } from '@components/link/custom-link';
import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  a: CustomLink,
  pre: CustomPre
};

export function useMDXComponents(): MDXComponents {
  return components;
}
