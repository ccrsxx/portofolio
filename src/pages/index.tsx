import { BlogCard } from '@components/blog/blog-card';
import { SpotifyCard } from '@components/common/currently-playing-card';
import { SEO } from '@components/common/seo';
import { UnstyledLink } from '@components/link/unstyled-link';
import { ProjectCard } from '@components/projects/project-card';
import { Accent } from '@components/ui/accent';
import { initializeAllContents } from '@lib/api';
import { getAllContents } from '@lib/mdx';
import { fadeInWhenVisible, setTransition } from '@lib/transition';
import type { Blog, Project } from '@lib/types/contents';
import { motion } from 'framer-motion';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import type { IconType } from 'react-icons';
import { FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

export default function Home({
  featuredBlog,
  featuredProjects
}: InferGetStaticPropsType<typeof getStaticProps>): React.JSX.Element {
  return (
    <main className='grid gap-20'>
      <SEO
        title='Risal Amin'
        description='An online portfolio and blog by Risal Amin. Showcase some of my past projects and some of my thoughts on the world of web development.'
      />
      <header className='-mt-20 grid min-h-screen content-center'>
        <motion.p
          className='text-2xl font-bold transition-colors delay-100 md:text-4xl 2xl:text-5xl'
          {...setTransition()}
        >
          Hi!
        </motion.p>
        <motion.h1
          className='mt-1 text-3xl font-bold transition-colors delay-200 md:text-5xl 2xl:text-6xl'
          {...setTransition({ delayIn: 0.1 })}
        >
          I&apos;m <Accent>Risal</Accent> - Full Stack Developer
        </motion.h1>
        <motion.p
          className='text-primary mt-4 max-w-4xl leading-relaxed transition-colors delay-400 md:mt-6 
                       md:text-lg 2xl:text-xl'
          {...setTransition({ delayIn: 0.2 })}
        >
          I&apos;m a self-taught Software Engineer turned Full Stack Developer.
          I enjoy working with TypeScript, React, Node.js, and recently Go. I
          also love exploring new technologies and learning new things.
        </motion.p>
        <motion.div className='mt-6' {...setTransition({ delayIn: 0.3 })}>
          <SpotifyCard />
        </motion.div>
        <motion.nav className='mt-8 ' {...setTransition({ delayIn: 0.4 })}>
          <ul className='flex gap-4 text-sm md:text-base'>
            <li>
              <UnstyledLink className='custom-button clickable' href='/blog'>
                Read my blog
              </UnstyledLink>
            </li>
            <li>
              <UnstyledLink className='custom-button clickable' href='/about'>
                Learn more about me
              </UnstyledLink>
            </li>
          </ul>
        </motion.nav>
        <motion.nav className='mt-8 ' {...setTransition({ delayIn: 0.4 })}>
          <ul className='flex gap-4'>
            {socialLink.map(({ name, href, Icon }) => (
              <li key={name}>
                <UnstyledLink
                  className='smooth-tab group text-muted flex items-center gap-2 text-sm transition 
                           *:transition-colors md:text-base'
                  href={href}
                >
                  <Icon className='group-hover:text-accent-main' />{' '}
                  <span className='group-hover:text-foreground'>{name}</span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </motion.nav>
      </header>
      <motion.section className='grid gap-4' {...fadeInWhenVisible()}>
        <h2 className='text-2xl font-bold md:text-4xl'>
          <Accent>Featured Posts</Accent>
        </h2>
        <p className='text-secondary -mt-2'>
          Check out my featured blog posts.
        </p>
        <ul className='card-layout'>
          {featuredBlog.map((blog) => (
            <li className='grid' key={blog.slug}>
              <BlogCard {...blog} />
            </li>
          ))}
        </ul>
        <UnstyledLink
          className='custom-button clickable justify-self-center font-bold'
          href='/blog'
        >
          See more posts
        </UnstyledLink>
      </motion.section>
      <motion.section className='grid gap-4' {...fadeInWhenVisible()}>
        <h2 className='text-2xl font-bold md:text-4xl'>
          <Accent>Featured Project</Accent>
        </h2>
        <p className='text-secondary -mt-2'>Check out my featured projects.</p>
        <ul className='card-layout'>
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
        <UnstyledLink
          className='custom-button clickable justify-self-center font-bold'
          href='/projects'
        >
          See more projects
        </UnstyledLink>
      </motion.section>
    </main>
  );
}

type HomeProps = {
  featuredBlog: Blog[];
  featuredProjects: Project[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeProps>
> {
  try {
    await initializeAllContents();

    const featuredBlog = await getAllContents('blog');
    const featuredProjects = await getAllContents('projects');

    return {
      props: {
        featuredBlog,
        featuredProjects
      }
    };
  } catch (error) {
    console.error('home ssr error', error);
    throw error;
  }
}

type SocialLink = {
  name: string;
  href: string;
  Icon: IconType;
};

const socialLink: SocialLink[] = [
  {
    name: 'Resume',
    href: 'https://docs.google.com/document/d/1WKzJo_tOtDN9_mMx5YhVRmRE2AuC21pKP1sP8CXER9w',
    Icon: HiDocumentText
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/risalamin',
    Icon: FaLinkedin
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ccrsxx',
    Icon: SiGithub
  }
];
