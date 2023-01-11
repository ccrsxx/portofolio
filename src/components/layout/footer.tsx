import Link from 'next/link';
import { HiEnvelope } from 'react-icons/hi2';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import { Tooltip } from '@components/ui/tooltip';
import { AccentExternalLink } from '@components/link/accent-external-link';
import { ExternalLink } from '@components/link/external-link';
import type { IconType } from 'react-icons';

export function Footer(): JSX.Element {
  return (
    <footer className='main-border layout grid gap-8 border-0 border-t pb-2'>
      <nav className='mt-6 flex justify-center gap-8'>
        {footerLinks.map(({ name, href, tip, out }) => (
          <Tooltip tip={tip} key={name}>
            <Link
              className='animated-underline text-sm font-medium dark:text-gray-200'
              href={href}
              {...(out && { target: '_blank', rel: 'noreferrer' })}
            >
              {name}
            </Link>
          </Tooltip>
        ))}
      </nav>
      <section className='grid justify-items-center gap-2 text-gray-600 dark:text-gray-300'>
        <h2 className='font-medium'>Reach me out</h2>
        <section className='flex gap-4'>
          {socialLinks.map(({ tip, name, href, Icon }) => (
            <Tooltip
              tip={
                <>
                  {tip}{' '}
                  <AccentExternalLink href={href}>{name}</AccentExternalLink>
                </>
              }
              key={name}
            >
              <a
                className='transition-colors hover:text-accent-blue'
                href={href}
                target='_blank'
                rel='noreferrer'
              >
                <Icon className='h-6 w-6' />
              </a>
            </Tooltip>
          ))}
        </section>
      </section>
      <p className='text-center text-sm text-gray-600 dark:text-gray-300'>
        &copy; Risal Amin 2022 •{' '}
        <ExternalLink
          className='transition hover:text-gray-800 dark:hover:text-gray-100'
          href='https://github.com/ccrsxx/ccrsxx.me'
        >
          Got any feedback?
        </ExternalLink>
      </p>
    </footer>
  );
}

type FooterLink = {
  name: string;
  href: string;
  tip: string | JSX.Element;
  out?: boolean;
};

const footerLinks: FooterLink[] = [
  {
    name: 'Source code',
    href: 'https://github.com/ccrsxx/ccrsxx.me',
    tip: (
      <>
        This website is <strong>open source!</strong>
      </>
    ),
    out: true
  },
  {
    name: 'Design',
    href: '/design',
    tip: 'ccrsxx.me color palette'
  },
  {
    name: 'Analytics',
    href: 'https://umami.ccrsxx.me',
    tip: 'ccrsxx.me views and visitors analytics',
    out: true
  },
  {
    name: 'Statistics',
    href: '/statistics',
    tip: 'Blog & Projects statistics'
  },
  {
    name: 'Subscribe',
    href: '/subscribe',
    tip: 'Get notified when I publish a new post'
  }
];

type SocialLink = {
  tip: string;
  name: string;
  href: string;
  Icon: IconType;
};

const socialLinks: SocialLink[] = [
  {
    tip: 'Contact me at',
    name: 'me@ccrsxx.me',
    href: 'mailto:me@ccrsxx.me',
    Icon: HiEnvelope
  },
  {
    tip: 'See my other projects on',
    name: 'GitHub',
    href: 'https://github.com/ccrsxx',
    Icon: SiGithub
  },
  {
    tip: 'Find me on',
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/risalamin',
    Icon: SiLinkedin
  },
  {
    tip: 'Follow me on',
    name: 'Twitter',
    href: 'https://twitter.com/ccrsxx',
    Icon: SiTwitter
  }
];
