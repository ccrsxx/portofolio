import { HiEye, HiUser, HiClock, HiLink } from 'react-icons/hi2';
import { SiGithub, SiYoutube } from 'react-icons/si';
import { CustomLink } from '@components/link/custom-link';
import { ViewsCounter } from '@components/content/views-counter';
import type { IconType } from 'react-icons';
import type { Project } from '@lib/types/contents';
import type { PropsForViews } from '@lib/types/helper';

type ProjectLinks = {
  name: string;
  link: string | undefined;
  Icon: IconType;
};

type ProjectStatsProps = PropsForViews<
  Pick<Project, 'readTime' | 'link' | 'category' | 'github' | 'youtube'>
>;

export function ProjectStats({
  slug,
  link,
  github,
  youtube,
  readTime,
  category,
  increment
}: ProjectStatsProps): JSX.Element {
  const projectLinks: ProjectLinks[] = [
    {
      name: 'Repository',
      link: github,
      Icon: SiGithub
    },
    {
      name: 'Demo',
      link: youtube,
      Icon: SiYoutube
    },
    {
      name: 'Open Live Site',
      link: link,
      Icon: HiLink
    }
  ];

  return (
    <>
      <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
        <div className='flex items-center gap-1'>
          <HiClock className='h-4 w-4' />
          <p>{readTime}</p>
        </div>
        <div className='flex items-center gap-1'>
          <HiEye className='h-4 w-4' />
          <ViewsCounter slug={slug} increment={increment} />
        </div>
        {projectLinks.map(
          ({ name, link, Icon }) =>
            link && (
              <div className='flex items-center gap-3' key={name}>
                <i>
                  <Icon className='text-lg text-black dark:text-white' />
                </i>
                <CustomLink href={link}>{name}</CustomLink>
              </div>
            )
        )}
      </div>
      <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
        <i>
          <HiUser className='text-lg' />
        </i>
        <p className='text-sm'>{category}</p>
      </div>
    </>
  );
}
