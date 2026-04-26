import { UnstyledLink } from '@components/link/unstyled-link';
import { Tooltip } from '@components/ui/tooltip';
import type { IconType } from 'react-icons';
import { HiEnvelope } from 'react-icons/hi2';
import { SiDiscord, SiGithub, SiLinkedin, SiX } from 'react-icons/si';

export function Footer(): React.JSX.Element {
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
              className='animated-underline peer text-primary text-sm font-medium'
              href={href}
            >
              {name}
            </UnstyledLink>
          </Tooltip>
        ))}
      </nav>
      <section className='text-secondary grid justify-items-center gap-2'>
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
                className='smooth-tab peer hover:text-accent-main grid transition-colors'
                href={href}
              >
                <Icon className='smooth-tab h-6 w-6' />
              </UnstyledLink>
            </Tooltip>
          ))}
        </section>
      </section>
      <p className='text-muted text-center text-sm'>
        &copy; Risal Amin 2026 •{' '}
        <UnstyledLink
          className='smooth-tab hover:text-foreground transition'
          href='https://github.com/ccrsxx/portofolio'
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
  tip: string | React.JSX.Element;
};

const footerLinks: FooterLink[] = [
  {
    name: 'Source code',
    href: 'https://github.com/ccrsxx/portofolio',
    tip: (
      <>
        This website is <strong>open source!</strong>
      </>
    )
  },
  {
    name: 'Design',
    href: '/design',
    tip: 'risalamin.com color palette'
  },
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
    name: 'me@risalamin.com',
    href: 'mailto:me@risalamin.com',
    Icon: HiEnvelope
  },
  {
    tip: "I'm also on",
    name: 'Discord',
    href: 'https://discord.com/users/414304208649453568',
    Icon: SiDiscord
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
    name: 'X',
    href: 'https://x.com/ccrsxx',
    Icon: SiX
  }
];
