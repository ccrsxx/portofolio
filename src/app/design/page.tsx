import { PageTransition } from '@components/transitions/page-transition';
import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';
import { DesignClient } from './design-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Design',
  description: "risalamin.com's color palette",
  pathname: '/design'
});

export default function Design(): React.JSX.Element {
  return (
    <PageTransition>
      <DesignClient />
    </PageTransition>
  );
}
