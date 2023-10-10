import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { CustomLink } from '@components/link/custom-link';
import type { MotionProps } from 'framer-motion';

export default function NotFound(): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const { asPath, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;

    const timeoutId = setTimeout(() => setCurrentUrl(asPath), 500);
    return () => clearTimeout(timeoutId);
  }, [asPath, isReady]);

  return (
    <main className='-mt-20 grid min-h-screen items-center justify-items-center'>
      <SEO
        title='Page not found'
        description='The page you are looking for is not found.'
      />
      <motion.div
        className='main-border grid w-full max-w-md justify-items-center gap-8 rounded-md p-8 text-center'
        {...setTransition()}
      >
        <h1 className='gradient-title text-8xl font-bold'>404</h1>
        <h2 className='text-2xl font-medium'>
          Page{' '}
          <motion.span
            title={currentUrl ?? ''}
            className={clsx(
              'inline-block max-w-[160px] truncate align-bottom font-semibold text-accent-main',
              currentUrl ? 'opacity-0' : 'animate-pulse'
            )}
            {...(currentUrl && variants)}
          >
            {currentUrl ?? '...'}
          </motion.span>{' '}
          not found
        </h2>
        <CustomLink href='/'>Go back home</CustomLink>
      </motion.div>
    </main>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
