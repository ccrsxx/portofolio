import Link from 'next/link';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { ThemeSwitch } from '@components/common/theme-switch';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' }
];

export function Header(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <header className='sticky top-0 bg-white/60 backdrop-blur-md transition-colors dark:bg-background/60'>
      <div className='h-2 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200' />
      <div className='layout flex items-center justify-between py-4'>
        <nav className='flex gap-4'>
          {navLinks.map(({ name, href }) => (
            <Link
              className={clsx(
                pathname === href && '!text-accent-blue',
                'smooth-tab transition-colors hover:text-blue-200'
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
  );
}
