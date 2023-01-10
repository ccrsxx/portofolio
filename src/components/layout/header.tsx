import Link from 'next/link';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { ThemeSwitch } from '@components/common/theme-switch';

export function Header(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '40px 0px 0px', amount: 'all' });

  const { pathname } = useRouter();

  const baseRoute = '/' + pathname.split('/')[1];

  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          !inView && 'shadow-sm',
          'sticky top-0 z-10 w-full bg-white/60 backdrop-blur-md transition dark:bg-dark-background/60'
        )}
      >
        <div className='h-2 bg-gradient-to-r from-blue-400 to-green-300' />
        <div className='layout flex items-center justify-between py-4'>
          <nav className='flex gap-4 font-medium'>
            {navLinks.map(({ name, href }) => (
              <Link
                className={clsx(
                  baseRoute === href && 'gradient-title',
                  'smooth-tab transition hover:text-accent-blue'
                )}
                href={href}
                key={name}
              >
                {name}
              </Link>
            ))}
          </nav>
          <ThemeSwitch />
        </div>
      </header>
    </>
  );
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' }
] as const;
