import Link from 'next/link';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { ThemeSwitch } from '@components/common/theme-switch';

export function Header(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '40px', amount: 'all' });

  const { pathname } = useRouter();

  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          !inView && 'shadow-sm',
          'fixed z-10 w-full bg-white/60 backdrop-blur-md transition dark:bg-background/60'
        )}
      >
        <div className='h-2 bg-gradient-to-r from-blue-400 to-green-300' />
        <div className='layout flex items-center justify-between py-4'>
          <nav className='flex gap-4 font-medium'>
            {navLinks.map(({ name, href }, index) => (
              <Link
                className={clsx(
                  'smooth-tab transition-colors hover:text-blue-200 hover:delay-[0ms]',
                  pathname === href && 'gradient-title',
                  `delay-${index * 100}`
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
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' }
];
