import { HiEye, HiUser, HiClock, HiLink } from 'react-icons/hi2';
import { SiGithub, SiYoutube } from 'react-icons/si';
import { formatNumber } from '@lib/format';
import { Accent } from '@components/ui/accent';
import type { IconType } from 'react-icons';
import type { Project, InjectedMeta } from '@lib/types/contents';

type ProjectStatsProps = Pick<
  Project,
  'readTime' | 'link' | 'category' | 'github' | 'youtube'
> &
  Pick<InjectedMeta, 'views'>;

type ProjectLinks = {
  name: string;
  link: string | undefined;
  Icon: IconType;
};

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
                    <Icon className='h-5 w-5 text-black dark:text-white' />
                  </i>
                  <a
                    className='animated-underline with-dots'
                    href={link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Accent>{name}</Accent>
                  </a>
                </div>
              </>
            )
        )}
      </div>
      <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
        <i>
          <HiUser className='h-4 w-4' />
        </i>
        <p className='text-sm'>{category}</p>
      </div>
    </>
  );
}
