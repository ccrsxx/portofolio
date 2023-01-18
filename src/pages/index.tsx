import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { HiDocumentText } from 'react-icons/hi2';
import { SiGithub, SiTwitter } from 'react-icons/si';
import { getAllContents } from '@lib/mdx';
import { setTransition, fadeInWhenVisible } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { BlogCard } from '@components/blog/blog-card';
import { ProjectCard } from '@components/project/project-card';
import { UnstyledLink } from '@components/link/unstyled-link';
import { Accent } from '@components/ui/accent';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import type { IconType } from 'react-icons';
import type { BlogWithMeta, ProjectWithMeta } from '@lib/types/contents';

export default function Home({
  featuredBlog,
  featuredProjects
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <main>
      <SEO
        title='Risal Amin - Web Developer'
        description='An online portfolio and blog by Risal Amin. Showcase some of my past projects and some of my thoughts on the world of web development.'
      />
      <section className='-mt-20 grid min-h-screen content-center'>
        <motion.h2
          className='text-5xl font-bold transition-colors delay-100'
          {...setTransition()}
        >
          Hi!
        </motion.h2>
        <motion.h1
          className='mt-1 text-6xl font-bold transition-colors delay-200'
          {...setTransition({ delayIn: 0.1 })}
        >
          You can call me <Accent>Risal</Accent>
        </motion.h1>
        <motion.p
          className='mt-6 max-w-4xl text-xl text-gray-700 transition-colors 
                     delay-[400ms] dark:text-gray-200'
          {...setTransition({ delayIn: 0.2 })}
        >
          I&apos;m a self-taught developer, who&apos;s currently pursuing a
          Full-Stack development to create stunning user experiences on the
          front-end, scalable, and secure infrastructure on the backend.
        </motion.p>
        <motion.section
          className='mt-8 flex gap-4'
          {...setTransition({ delayIn: 0.3 })}
        >
          <UnstyledLink className='custom-button clickable' href='/blog'>
            Read my blog
          </UnstyledLink>
          <UnstyledLink className='custom-button clickable' href='/about'>
            Learn more about me
          </UnstyledLink>
        </motion.section>
        <motion.section
          className='mt-8 flex gap-4'
          {...setTransition({ delayIn: 0.4 })}
        >
          {socialLink.map(({ name, href, iconHoverColor, Icon }) => (
            <UnstyledLink
              className='group flex items-center gap-2 text-gray-600 transition-colors
                        hover:text-black dark:text-gray-400 dark:hover:text-white'
              href={href}
              key={name}
            >
              <Icon
                className={clsx('h-4 w-4 transition-colors', iconHoverColor)}
              />{' '}
              {name}
            </UnstyledLink>
          ))}
        </motion.section>
      </section>
      <motion.section className='grid gap-4 py-20' {...fadeInWhenVisible()}>
        <h2 className='text-4xl font-bold'>
          <Accent>Featured Posts</Accent>
        </h2>
        <section className='grid grid-cols-3 gap-4'>
          {featuredBlog.map((blog, index) => (
            <BlogCard {...blog} key={index} />
          ))}
        </section>
        <UnstyledLink
          className='custom-button clickable justify-self-center font-bold text-gray-600 dark:text-gray-300'
          href='/blog'
        >
          See more posts
        </UnstyledLink>
      </motion.section>
      <motion.section
        className='grid gap-4 py-12 pt-20'
        {...fadeInWhenVisible()}
      >
        <h2 className='text-4xl font-bold'>
          <Accent>Featured Project</Accent>
        </h2>
        <p className='-mt-2 text-gray-600 dark:text-gray-300'>
          Some projects I&apos;m proud of
        </p>
        <section className='grid grid-cols-3 gap-4'>
          {featuredProjects.map((project, index) => (
            <ProjectCard {...project} key={index} />
          ))}
        </section>
        <UnstyledLink
          className='custom-button clickable justify-self-center font-bold text-gray-600 dark:text-gray-300'
          href='/projects'
        >
          See more projects
        </UnstyledLink>
      </motion.section>
    </main>
  );
}

type HomeProps = {
  featuredBlog: BlogWithMeta[];
  featuredProjects: ProjectWithMeta[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeProps>
> {
  const featuredBlog = await getAllContents('blog');
  const featuredProjects = await getAllContents('projects');

  return {
    props: {
      featuredBlog,
      featuredProjects
    }
  };
}

type SocialLink = {
  name: string;
  href: string;
  iconHoverColor?: string;
  Icon: IconType;
};

const socialLink: SocialLink[] = [
  {
    name: 'Resume',
    href: 'placeholder',
    iconHoverColor: 'group-hover:text-accent-blue',
    Icon: HiDocumentText
  },
  {
    name: 'Twitter',
    href: 'placeholder',
    iconHoverColor: 'group-hover:text-[#1d9bf0]',
    Icon: SiTwitter
  },
  {
    name: 'GitHub',
    href: 'placeholder',
    Icon: SiGithub
  }
];
