import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { CustomLink } from '@components/link/custom-link';

export default function NotFound(): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState<null | string>(null);

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
        className='main-border grid w-full max-w-md justify-items-center gap-8 rounded-md p-8'
        {...setTransition()}
      >
        <h1 className='gradient-title text-8xl font-bold'>404</h1>
        <h2 className='text-2xl font-medium'>
          Page{' '}
          <span
            title={currentUrl ?? ''}
            className={clsx(
              'text-main-accent inline-block max-w-[160px] truncate align-bottom font-semibold text-accent-blue',
              !currentUrl && 'animate-pulse'
            )}
          >
            {currentUrl ?? '...'}
          </span>{' '}
          not found
        </h2>
        <CustomLink href='/'>Go back home</CustomLink>
      </motion.div>
    </main>
  );
}
