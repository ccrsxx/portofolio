import { HiEye, HiUser, HiClock, HiLink } from 'react-icons/hi2';
import { SiGithub, SiYoutube } from 'react-icons/si';
import { formatNumber } from '@lib/format';
import { CustomLink } from '@components/link/custom-link';
import type { IconType } from 'react-icons';
import type { Project, InjectedMeta } from '@lib/types/contents';

type ProjectLinks = {
  name: string;
  link: string | undefined;
  Icon: IconType;
};

type ProjectStatsProps = Pick<InjectedMeta, 'views'> &
  Pick<Project, 'readTime' | 'link' | 'category' | 'github' | 'youtube'>;

export function ProjectStats({
  link,
  views,
  github,
  youtube,
  readTime,
  category
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
      <div className='flex gap-3 text-sm font-medium text-gray-600 dark:text-gray-300'>
        <div className='flex items-center gap-1'>
          <HiEye className='h-4 w-4' />
          <p>{readTime}</p>
        </div>
        <i>-</i>
        <div className='flex items-center gap-1'>
          <HiClock className='h-4 w-4' />
          <p>{formatNumber(views)} views</p>
        </div>
        {projectLinks.map(
          ({ name, link, Icon }) =>
            link && (
              <>
                <i>-</i>
                <div className='flex items-center gap-3'>
                  <i>
                    <Icon className='text-lg text-black dark:text-white' />
                  </i>
                  <CustomLink href={link}>{name}</CustomLink>
                </div>
              </>
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
