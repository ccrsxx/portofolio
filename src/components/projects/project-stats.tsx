import { ViewsCounter } from '@components/contents/views-counter';
import { CustomLink } from '@components/link/custom-link';
import type { Project } from '@lib/types/contents';
import type { PropsForViews } from '@lib/types/helper';
import type { IconType } from 'react-icons';
import { LuClock, LuEye, LuLink, LuUser } from 'react-icons/lu';
import { SiGithub, SiYoutube } from 'react-icons/si';

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
}: ProjectStatsProps): React.JSX.Element {
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
      Icon: LuLink
    }
  ];

  return (
    <>
      <div className='text-muted flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium'>
        <div className='flex items-center gap-1'>
          <LuClock className='h-4 w-4' />
          <p>{readTime}</p>
        </div>
        <div className='flex items-center gap-1'>
          <LuEye className='h-4 w-4' />
          <ViewsCounter slug={slug} increment={increment} />
        </div>
        {projectLinks.map(
          ({ name, link, Icon }) =>
            link && (
              <div className='flex items-center gap-3' key={name}>
                <Icon className='text-foreground text-lg' />
                <CustomLink href={link}>{name}</CustomLink>
              </div>
            )
        )}
      </div>
      <div className='text-muted flex items-center gap-2'>
        <LuUser className='text-lg' />
        <p className='text-sm'>{category}</p>
      </div>
    </>
  );
}
