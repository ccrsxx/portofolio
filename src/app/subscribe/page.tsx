import { SubscribeCard } from '@components/blog/subscribe-card';
import { PageTransition } from '@components/transitions/page-transition';
import { Accent } from '@components/ui/accent';
import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Subscribe',
  description: 'Get notified when I publish new post',
  pathname: '/subscribe'
});

export default function Subscribe(): React.JSX.Element {
  return (
    <PageTransition>
      <main className='grid min-h-screen content-start gap-6 py-12'>
        <header className='grid gap-2'>
          <h1 className='text-3xl font-bold md:text-5xl'>
            <Accent>Subscribe to risalamin.com</Accent>
          </h1>
          <p className='text-secondary'>
            Get notified when I publish a new post.
          </p>
        </header>
        <section>
          <SubscribeCard />
        </section>
      </main>
    </PageTransition>
  );
}
