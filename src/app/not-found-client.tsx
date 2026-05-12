'use client';

import { CustomLink } from '@components/link/custom-link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NotFoundClient(): React.JSX.Element {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = setTimeout(() => setCurrentUrl(pathname), 500);
    return (): void => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <main className='-mt-20 grid min-h-screen items-center justify-items-center'>
      <div className='main-border grid w-full max-w-md justify-items-center gap-8 rounded-md p-8 text-center'>
        <h1 className='gradient-title text-8xl font-bold'>404</h1>
        <h2 className='text-2xl font-medium'>
          Page{' '}
          <span
            title={currentUrl ?? ''}
            className={`text-accent-main inline-block max-w-40 truncate align-bottom font-semibold ${
              currentUrl ? 'opacity-100' : 'animate-pulse'
            }`}
          >
            {currentUrl ?? '...'}
          </span>{' '}
          not found
        </h2>
        <CustomLink href='/'>Go back home</CustomLink>
      </div>
    </main>
  );
}
