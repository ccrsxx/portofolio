import type { IconType } from 'react-icons';
import { IoLogoVercel } from 'react-icons/io5';
import {
  SiFirebase,
  SiGit,
  SiGoogleanalytics,
  SiJavascript,
  SiMarkdown,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPrettier,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';
import { Tooltip } from '../ui/tooltip';

export function TechIcons({ tags }: { tags: string }): React.JSX.Element {
  const techsArray = tags.split(',');

  return (
    <ul className='mt-2 flex gap-2 [&>li:first-child>div]:-translate-x-1/3'>
      {techsArray.map((tech) => {
        const { name, Icon } = techList[tech];

        return (
          <Tooltip
            className='text-primary text-xl'
            tooltipClassName='group-hover:-translate-y-[3.75rem]'
            tag='li'
            tip={name}
            key={name}
          >
            <Icon />
          </Tooltip>
        );
      })}
    </ul>
  );
}

type TechList = Record<string, { name: string; Icon: IconType }>;

const techList: TechList = {
  react: {
    name: 'React',
    Icon: SiReact
  },
  nextjs: {
    name: 'Next.js',
    Icon: SiNextdotjs
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    Icon: SiTailwindcss
  },
  scss: {
    name: 'SCSS',
    Icon: SiSass
  },
  javascript: {
    name: 'JavaScript',
    Icon: SiJavascript
  },
  typescript: {
    name: 'TypeScript',
    Icon: SiTypescript
  },
  nodejs: {
    name: 'Node.js',
    Icon: SiNodedotjs
  },
  firebase: {
    name: 'Firebase',
    Icon: SiFirebase
  },
  mongodb: {
    name: 'MongoDB',
    Icon: SiMongodb
  },
  swr: {
    name: 'SWR',
    Icon: IoLogoVercel
  },
  mdx: {
    name: 'MDX',
    Icon: SiMarkdown
  },
  prettier: {
    name: 'Prettier',
    Icon: SiPrettier
  },
  analytics: {
    name: 'Google Analytics',
    Icon: SiGoogleanalytics
  },
  git: {
    name: 'Git',
    Icon: SiGit
  },
  notion: {
    name: 'Notion API',
    Icon: SiNotion
  }
};
