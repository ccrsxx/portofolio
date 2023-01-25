import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'framer-motion';
import { clsx } from 'clsx';
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
          'sticky top-0 z-20 w-full bg-white/60 backdrop-blur-md transition dark:bg-dark-background/60',
          !inView && 'shadow-sm'
        )}
      >
        <div className='h-2 bg-gradient-to-r from-blue-400 to-green-300' />
        <div className='layout flex items-center justify-between py-4'>
          <nav className='flex gap-4 font-medium'>
            {navLinks.map(({ name, href }) => (
              <Link
                className={clsx(
                  'smooth-tab hover:text-accent-blue hover:transition-colors',
                  baseRoute === href && 'gradient-title !text-transparent'
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
