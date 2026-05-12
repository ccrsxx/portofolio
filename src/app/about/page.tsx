import { CustomLink } from '@components/link/custom-link';
import { PageTransition } from '@components/transitions/page-transition';
import { Accent } from '@components/ui/accent';
import { Tooltip } from '@components/ui/tooltip';
import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';
import type { IconType } from 'react-icons';
import {
  SiGo,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: 'Risal Amin is a web developer',
  pathname: '/about'
});

export default function About(): React.JSX.Element {
  return (
    <PageTransition>
      <main className='min-h-screen'>
        <header className='grid gap-2'>
          <h1 className='text-xl font-bold md:text-3xl'>About</h1>
          <h2 className='text-2xl font-bold md:text-4xl'>
            <Accent>Risal Amin</Accent>
          </h2>
        </header>
        <section className='prose dark:prose-invert mt-4'>
          <p>
            Hi, I&apos;m Risal. I started learning web development in November
            2021, after building my first web app with{' '}
            <CustomLink href='https://python.org'>Python</CustomLink> and the{' '}
            <CustomLink href='https://streamlit.io'>Streamlit</CustomLink>{' '}
            module. Since then, I&apos;ve been dedicated to learning as much as
            I can about web development.
          </p>
          <p>
            I began my journey by completing the front-end course on{' '}
            <CustomLink href='https://freecodecamp.org'>
              FreeCodeCamp
            </CustomLink>{' '}
            and then moved on to{' '}
            <CustomLink href='https://theodinproject.com'>
              The Odin Project
            </CustomLink>{' '}
            to learn Full Stack Development. I&apos;m always motivated to learn
            new technologies and techniques, and I enjoy getting feedback to
            help me improve.
          </p>
          <p>
            On this website, I&apos;ll be sharing my projects and writing about
            what I&apos;ve learned. I believe that writing helps me better
            understand and retain new information, and I&apos;m always happy to
            share my knowledge with others. If you have any questions or want to
            connect, don&apos;t hesitate to reach out!
          </p>
        </section>
        <section className='mt-12 grid gap-4'>
          <h2 className='text-xl font-bold md:text-3xl'>Favorite Tech Stack</h2>
          <ul className='translate flex gap-4 [&>li:nth-child(-n+3)>div]:[position-area:top_span-right]'>
            {favoriteTechStack.map(({ tip, name, href, Icon }) => (
              <Tooltip
                tooltipClassName='w-72 px-3 py-4 mb-4 text-center'
                tag='li'
                key={name}
                tip={
                  <>
                    <CustomLink href={href} tabIndex={-1}>
                      {name}
                    </CustomLink>
                    {', '}
                    {tip}
                  </>
                }
              >
                <button className='smooth-tab peer'>
                  <Icon className='hover:text-accent-main text-4xl transition-colors' />
                </button>
              </Tooltip>
            ))}
          </ul>
        </section>
      </main>
    </PageTransition>
  );
}

type FavoriteTechStack = {
  tip: string;
  name: string;
  href: string;
  Icon: IconType;
};

const favoriteTechStack: FavoriteTechStack[] = [
  {
    tip: 'a strongly typed language that builds on JavaScript, giving you better tooling at any scale.',
    name: 'TypeScript',
    href: 'https://typescriptlang.org',
    Icon: SiTypescript
  },
  {
    tip: 'an open-source programming language that makes it easy to build simple, reliable, and efficient software.',
    name: 'Go',
    href: 'https://go.dev',
    Icon: SiGo
  },
  {
    tip: 'a JavaScript library for building user interfaces, allowing you to create reusable UI components.',
    name: 'React',
    href: 'https://reactjs.org',
    Icon: SiReact
  },
  {
    tip: 'a React framework that makes it easy to build static and server-side rendered applications.',
    name: 'Next.js',
    href: 'https://nextjs.org',
    Icon: SiNextdotjs
  },
  {
    tip: 'a utility-first CSS framework that helps you build custom designs without ever leaving your JSX.',
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    Icon: SiTailwindcss
  },
  {
    tip: 'a powerful, open source object-relational database system with a strong reliability and data integrity.',
    name: 'PostgreSQL',
    href: 'https://postgresql.org',
    Icon: SiPostgresql
  }
];
