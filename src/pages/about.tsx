import { SEO } from '@components/common/seo';
import { CustomLink } from '@components/link/custom-link';
import { Accent } from '@components/ui/accent';
import { Tooltip } from '@components/ui/tooltip';
import { setTransition } from '@lib/transition';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiGo,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

export default function About(): React.JSX.Element {
  return (
    <main className='layout min-h-screen'>
      <SEO title='About' description='Risal Amin is a web developer' />
      <section className='grid gap-2'>
        <motion.h2
          className='text-xl font-bold md:text-3xl'
          {...setTransition()}
        >
          About
        </motion.h2>
        <motion.h1
          className='text-2xl font-bold md:text-4xl'
          {...setTransition({ delayIn: 0.1 })}
        >
          <Accent>Risal Amin</Accent>
        </motion.h1>
      </section>
      <section className='mt-4'>
        <motion.article
          className='prose dark:prose-invert'
          {...setTransition({ delayIn: 0.2 })}
        >
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
        </motion.article>
      </section>
      <section className='mt-12 grid gap-4'>
        <motion.h2
          className='text-xl font-bold md:text-3xl'
          {...setTransition({ delayIn: 0.3 })}
        >
          Favorite Tech Stack
        </motion.h2>
        <motion.ul
          className='translate flex gap-4 [&>li:first-child>div]:-translate-x-4 [&>li:nth-child(2)>div]:-translate-x-16 [&>li:nth-child(3)>div]:-translate-x-28'
          {...setTransition({ delayIn: 0.4 })}
        >
          {favoriteTechStack.map(({ tip, name, href, Icon }) => (
            <Tooltip
              tooltipClassName='group-hover:-translate-y-38! w-72 px-3 py-4 -translate-y-32!
                                text-center whitespace-normal! 2xl:-translate-x-1/2!
                                peer-focus-visible:-translate-y-38!'
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
        </motion.ul>
      </section>
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
    tip: 'a powerful, open source object-relational database system with a strong reputation for reliability and data integrity.',
    name: 'PostgreSQL',
    href: 'https://postgresql.org',
    Icon: SiPostgresql
  }
];
