import { IoLogoVercel } from 'react-icons/io5';
import {
  SiGit,
  SiSass,
  SiReact,
  SiNotion,
  SiMongodb,
  SiFirebase,
  SiMarkdown,
  SiPrettier,
  SiNodedotjs,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiGoogleanalytics
} from 'react-icons/si';
import { Tooltip } from '../ui/tooltip';
import type { IconType } from 'react-icons';

type TechIconsProps = {
  techs: string;
};

export function TechIcons({ techs }: TechIconsProps): JSX.Element {
  const techsArray = techs.split(',');

  return (
    <ul className='mt-2 flex gap-2'>
      {techsArray.map((tech) => {
        const { name, Icon } = techList[tech];

        return (
          <Tooltip
            className='text-xl text-gray-700 dark:text-gray-200'
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
