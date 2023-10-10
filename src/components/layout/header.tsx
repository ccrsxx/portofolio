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
          'sticky top-0 z-20 w-full bg-white/60 backdrop-blur-md transition dark:bg-black/60',
          !inView && 'shadow-sm dark:shadow-gray-900'
        )}
      >
        <div className='h-2 bg-gradient-to-r from-accent-start to-accent-end' />
        <div className='layout flex items-center justify-between py-4'>
          <nav className='flex gap-4 font-medium'>
            {navLinks.map(({ name, href }) => (
              <Link
                className={clsx(
                  'smooth-tab text-xs hover:text-accent-main hover:transition-colors md:text-base',
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
  { name: 'Guestbook', href: '/guestbook' },
  { name: 'About', href: '/about' }
] as const;
