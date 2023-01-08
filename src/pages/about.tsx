import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss
} from 'react-icons/si';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { Tooltip } from '@components/ui/tooltip';
import { AccentExternalLink } from '@components/link/accent-external-link';
import type { IconType } from 'react-icons';

export default function About(): JSX.Element {
  return (
    <main className='layout min-h-screen pt-20'>
      <SEO
        title='About | Risal Amin'
        description='Risal Amin is a web developer'
      />
      <section className='grid gap-1'>
        <motion.h2 className='text-3xl font-bold' {...setTransition()}>
          About
        </motion.h2>
        <motion.h1
          className='text-4xl font-bold'
          {...setTransition({ delayIn: 0.1 })}
        >
          <Accent>Risal Amin</Accent>
        </motion.h1>
        <motion.article
          className='prose mt-3 dark:prose-invert'
          {...setTransition({ delayIn: 0.2 })}
        >
          <p>
            Hi, I&apos;m Risal. I started learning web development in November
            2021, after building my first web app with{' '}
            <AccentExternalLink href='https://python.org'>
              Python
            </AccentExternalLink>{' '}
            and the{' '}
            <AccentExternalLink href='https://streamlit.io'>
              Streamlit
            </AccentExternalLink>{' '}
            module. Since then, I&apos;ve been dedicated to learning as much as
            I can about web development.
          </p>
          <p>
            I began my journey by completing the front-end course on{' '}
            <AccentExternalLink href='https://freecodecamp.org'>
              FreeCodeCamp
            </AccentExternalLink>{' '}
            and then moved on to{' '}
            <AccentExternalLink href='https://theodinproject.com'>
              The Odin Project
            </AccentExternalLink>{' '}
            to learn fullstack development. I&apos;m always motivated to learn
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
        </motion.article>
      </section>
      <motion.section
        className='mt-12 grid gap-4'
        {...setTransition({ delayIn: 0.3 })}
      >
        <h2 className='text-3xl font-bold'>Favorite Tech Stack</h2>
        <ul className='translate flex gap-4'>
          {favoriteTechStack.map(({ tip, name, href, Icon }) => (
            <Tooltip
              className='[&:first-child>div]:!-translate-x-12 [&:nth-child(2)>div]:!-translate-x-1/3'
              tooltipClassName='group-hover:!-translate-y-32 w-72 px-3 py-4 
                                !-translate-y-28 text-center !whitespace-normal'
              tag='li'
              key={name}
              tip={
                <>
                  <AccentExternalLink href={href}>{name}</AccentExternalLink>
                  {', '}
                  {tip}
                </>
              }
            >
              <Icon className='h-10 w-10 transition-colors hover:text-accent-blue' />
            </Tooltip>
          ))}
        </ul>
      </motion.section>
    </main>
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
    tip: 'a React framework that makes it easy to build static and server-side rendered applications.',
    name: 'Next.js',
    href: 'https://nextjs.org',
    Icon: SiNextdotjs
  },
  {
    tip: 'a javascript library for building user interfaces. Great for Single Page Applications.',
    name: 'Create React App',
    href: 'https://reactjs.org',
    Icon: SiReact
  },
  {
    tip: 'a superset of JavaScript that adds static typing and other features.',
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org',
    Icon: SiTypescript
  },
  {
    tip: 'a utility-first CSS framework that helps you build custom designs without ever leaving your JSX.',
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    Icon: SiTailwindcss
  }
];
