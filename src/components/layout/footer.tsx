import { HiEnvelope } from 'react-icons/hi2';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import { Tooltip } from '@components/ui/tooltip';
import { UnstyledLink } from '@components/link/unstyled-link';
import { SpotifyCard } from '@components/common/spotify-card';
import type { IconType } from 'react-icons';

export function Footer(): JSX.Element {
  return (
    <footer className='main-border layout mt-12 grid gap-8 border-0 border-t pb-2'>
      <nav className='mt-6 flex flex-wrap justify-center gap-x-8 gap-y-4'>
        {footerLinks.map(({ name, href, tip }) => (
          <Tooltip
            tooltipClassName='hidden sm:block group-hover:-translate-y-16 peer-focus-visible:-translate-y-16'
            tip={tip}
            key={name}
          >
            <UnstyledLink
              className='animated-underline peer text-sm font-medium dark:text-gray-200'
              href={href}
            >
              {name}
            </UnstyledLink>
          </Tooltip>
        ))}
      </nav>
      <section className='grid justify-items-center'>
        <SpotifyCard />
      </section>
      <section className='grid justify-items-center gap-2 text-gray-600 dark:text-gray-300'>
        <h2 className='font-medium'>Reach me out</h2>
        <section className='flex gap-4'>
          {socialLinks.map(({ tip, name, href, Icon }) => (
            <Tooltip
              tip={
                <>
                  {tip} {name}
                </>
              }
              key={name}
            >
              <UnstyledLink
                className='smooth-tab peer grid transition-colors hover:text-accent-blue'
                href={href}
              >
                <Icon className='smooth-tab h-6 w-6' />
              </UnstyledLink>
            </Tooltip>
          ))}
        </section>
      </section>
      <p className='text-center text-sm text-gray-600 dark:text-gray-300'>
        &copy; Risal Amin 2022 •{' '}
        <UnstyledLink
          className='smooth-tab transition hover:text-gray-800 dark:hover:text-gray-100'
          href='https://github.com/ccrsxx/ccrsxx.me'
        >
          Got any feedback?
        </UnstyledLink>
      </p>
    </footer>
  );
}

type FooterLink = {
  name: string;
  href: string;
  tip: string | JSX.Element;
};

const footerLinks: FooterLink[] = [
  {
    name: 'Source code',
    href: 'https://github.com/ccrsxx/ccrsxx.me',
    tip: (
      <>
        This website is <strong>open source!</strong>
      </>
    )
  },
  {
    name: 'Design',
    href: '/design',
    tip: 'ccrsxx.me color palette'
  },
  // {
  //   name: 'Analytics',
  //   href: 'https://umami.ccrsxx.me',
  //   tip: 'ccrsxx.me views and visitors analytics'
  // },
  {
    name: 'Statistics',
    href: '/statistics',
    tip: 'Blog & Projects statistics'
  }
  // {
  //   name: 'Subscribe',
  //   href: '/subscribe',
  //   tip: 'Get notified when I publish a new post'
  // }
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
