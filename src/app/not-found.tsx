import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';
import { NotFoundClient } from './not-found-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Page not found',
  description: 'The page you are looking for is not found.',
  pathname: '/404'
});

export default function NotFound(): React.JSX.Element {
  return <NotFoundClient />;
}
