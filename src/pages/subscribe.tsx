import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { SubscribeCard } from '@components/blog/subscribe-card';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';

export default function Subscribe(): JSX.Element {
  return (
    <main className='grid min-h-screen content-start gap-6 py-12'>
      <SEO
        title='Subscribe'
        description='Get notified when I publish new post'
      />
      <section className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition({ delayIn: 0.1 })}
        >
          <Accent>Subscribe to risalamin.com</Accent>
        </motion.h1>
        <motion.p
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.2 })}
        >
          Get notified when I publish a new post.
        </motion.p>
      </section>
      <motion.section {...setTransition({ delayIn: 0.3 })}>
        <SubscribeCard />
      </motion.section>
    </main>
  );
}
