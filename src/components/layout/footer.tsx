import Link from 'next/link';
import { Tooltip } from '@components/ui/tooltip';
import { ReactIcon } from '@components/ui/react-icon';
import type { IconName } from '@components/ui/react-icon';

type FooterLink = {
  name: string;
  href: string;
  tip: string | JSX.Element;
  out?: boolean;
};

export function Footer(): JSX.Element {
  return (
    <footer className='main-border layout grid gap-4 border-0 border-t pb-2'>
      <nav className='mt-6 flex justify-center gap-8'>
        {footerLinks.map(({ name, href, tip, out }) => (
          <Tooltip tip={tip} key={name}>
            <Link
              className='text-sm font-medium dark:text-gray-200'
              href={href}
              {...(out && { target: '_blank', rel: 'noreferrer' })}
            >
              {name}
            </Link>
          </Tooltip>
        ))}
      </nav>
      <section className='mt-4 grid justify-items-center gap-2 text-gray-600 dark:text-gray-300'>
        <h2 className='font-medium'>Reach me out</h2>
        <section className='flex gap-4'>
          {socialLinks.map(({ name, href, icon, tip }) => (
            <Tooltip tip={tip} key={name}>
              <a
                className='transition-colors hover:text-accent-blue'
                href={href}
                target='_blank'
                rel='noreferrer'
              >
                <ReactIcon iconName={icon} />
              </a>
            </Tooltip>
          ))}
        </section>
      </section>
      <p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-300'>
        &copy; Risal Amin 2022 •{' '}
        <a
          className='transition hover:text-gray-800 dark:hover:text-gray-100'
          href='https://github.com/ccrsxx/ccrsxx.me'
        >
          Got any feedback?
        </a>
      </p>
    </footer>
  );
}

const footerLinks: FooterLink[] = [
  {
    name: 'Source code',
    href: 'https://github.com/ccrsxx/ccrsxx.me',
    tip: (
      <p>
        This website is <strong>open source!</strong>
      </p>
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
  name: string;
  href: string;
  icon: IconName;
  tip: JSX.Element;
  tooltipClassName?: string;
};

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    href: 'mailto:me@ccrsxx.me',
    icon: 'HiEnvelope',
    tip: (
      <p className='text-center'>
        Contact me at <span className='gradient-title'>me@ccrsxx.me</span>
      </p>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ccrsxx',
    icon: 'SiGithub',
    tip: (
      <p>
        See my other projects at <span className='gradient-title'>GitHub</span>
      </p>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/risalamin',
    icon: 'SiLinkedin',
    tip: (
      <p>
        Find me on <span className='gradient-title'>LinkedIn</span>
      </p>
    )
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/ccrsxx',
    icon: 'SiTwitter',
    tip: (
      <p>
        Follow me on <span className='gradient-title'>Twitter</span>
      </p>
    )
  }
];
