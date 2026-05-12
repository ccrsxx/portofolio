'use client';

import { ThemeSwitch } from '@components/common/theme-switch';
import { clsx } from 'clsx';
import { useInView } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export function Header(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '40px 0px 0px', amount: 'all' });

  const pathname = usePathname();

  const baseRoute = '/' + pathname.split('/')[1];

  return (
    <>
      <div ref={ref} />
      <header
        style={{ viewTransitionName: 'site-header' }}
        className={clsx(
          'bg-background/60 sticky top-0 z-20 w-full backdrop-blur-md transition',
          !inView && 'shadow-xs'
        )}
      >
        <div className='gradient-background h-2' />
        <section className='layout flex items-center justify-between py-4'>
          <nav>
            <ul className='flex gap-4 font-medium'>
              {navLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className={clsx(
                      'smooth-tab hover:text-accent-main text-xs hover:transition-colors md:text-base',
                      baseRoute === href && 'gradient-title text-transparent!'
                    )}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeSwitch />
        </section>
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
