import { BlogCard } from '@components/blog/blog-card';
import { CurrentlyPlayingCard } from '@components/home/currently-playing-card';
import { UnstyledLink } from '@components/link/unstyled-link';
import { ProjectCard } from '@components/projects/project-card';
import { PageTransition } from '@components/transitions/page-transition';
import { Accent } from '@components/ui/accent';
import { initializeAllContents } from '@lib/api';
import { getAllContents } from '@lib/mdx';
import { generatePageMetadata } from '@lib/metadata';
import type { Blog, Project } from '@lib/types/contents';
import type { Metadata } from 'next';
import type { IconType } from 'react-icons';
import { FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

const { title: _, ...homeMetadata } = generatePageMetadata({
  title: 'Risal Amin',
  description:
    'An online portfolio and blog by Risal Amin. Showcase some of my past projects and some of my thoughts on the world of web development.',
  pathname: '/'
});

export const metadata: Metadata = homeMetadata;

export default async function Home(): Promise<React.JSX.Element> {
  let featuredBlog: Blog[] = [];
  let featuredProjects: Project[] = [];

  try {
    await initializeAllContents();

    featuredBlog = await getAllContents('blog');
    featuredProjects = await getAllContents('projects');
  } catch (error) {
    console.error('home ssr error', error);
  }

  return (
    <PageTransition>
      <main className='grid gap-20'>
        <header className='-mt-20 grid min-h-screen content-center'>
          <h1
            className='mt-1 text-3xl font-bold transition-colors delay-100 md:text-5xl 2xl:text-6xl 
                       animate-enter-y'
          >
            Hi, I&apos;m <Accent>Risal Amin</Accent>
          </h1>
          <p
            className='mt-1 text-3xl font-bold transition-colors delay-200 md:text-5xl 2xl:text-6xl 
                       animate-enter-y animate-enter-delay-100'
          >
            Full Stack Developer
          </p>
          <p
            className='text-primary mt-4 max-w-4xl leading-relaxed transition-colors delay-400 md:mt-6 
                       md:text-lg 2xl:text-xl animate-enter-y animate-enter-delay-200'
          >
            A software engineer who loves building things with TypeScript,
            React, Node.js, and recently Go. Always exploring and learning new
            things.
          </p>
          <div className='mt-6 animate-enter-y animate-enter-delay-300'>
            <CurrentlyPlayingCard />
          </div>
          <nav className='mt-8 animate-enter-y animate-enter-delay-400'>
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
          </nav>
          <nav className='mt-8 animate-enter-y animate-enter-delay-500'>
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
          </nav>
        </header>
        <section className='grid gap-4'>
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
        </section>
        <section className='grid gap-4'>
          <h2 className='text-2xl font-bold md:text-4xl'>
            <Accent>Featured Project</Accent>
          </h2>
          <p className='text-secondary -mt-2'>
            Check out my featured projects.
          </p>
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
        </section>
      </main>
    </PageTransition>
  );
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
