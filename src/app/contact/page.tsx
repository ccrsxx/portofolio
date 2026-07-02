import { PageTransition } from '@components/transitions/page-transition';
import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description: 'Contact me directly on my website.',
  pathname: '/design'
});

export default function Contact(): React.JSX.Element {
  return (
    <PageTransition>
      <ContactClient />
    </PageTransition>
  );
}
