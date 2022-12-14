import { clsx } from 'clsx';
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
import { Tooltip } from './tooltip';
import type { IconType } from 'react-icons';

export type ValidTech =
  | 'react'
  | 'nextjs'
  | 'tailwindcss'
  | 'scss'
  | 'javascript'
  | 'typescript'
  | 'nodejs'
  | 'firebase'
  | 'mongodb'
  | 'swr'
  | 'mdx'
  | 'prettier'
  | 'analytics'
  | 'git'
  | 'notion';

type TechIconsProps = {
  techs: ValidTech[];
  className?: string;
};

export function TechIcons({ className, techs }: TechIconsProps): JSX.Element {
  return (
    <ul className={clsx(className, 'flex gap-2')}>
      {techs.map((tech) => {
        if (!techList[tech]) return;

        const { name, Icon } = techList[tech];

        return (
          <Tooltip
            className='text-xl text-gray-700 dark:text-gray-200'
            tooltipClassName='group-hover:-translate-y-[3.75rem]'
            customTag='li'
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

type TechList = Record<ValidTech, { Icon: IconType; name: string }>;

const techList: TechList = {
  react: {
    Icon: SiReact,
    name: 'React'
  },
  nextjs: {
    Icon: SiNextdotjs,
    name: 'Next.js'
  },
  tailwindcss: {
    Icon: SiTailwindcss,
    name: 'Tailwind CSS'
  },
  scss: {
    Icon: SiSass,
    name: 'SCSS'
  },
  javascript: {
    Icon: SiJavascript,
    name: 'JavaScript'
  },
  typescript: {
    Icon: SiTypescript,
    name: 'TypeScript'
  },
  nodejs: {
    Icon: SiNodedotjs,
    name: 'Node.js'
  },
  firebase: {
    Icon: SiFirebase,
    name: 'Firebase'
  },
  mongodb: {
    Icon: SiMongodb,
    name: 'MongoDB'
  },
  swr: {
    Icon: IoLogoVercel,
    name: 'SWR'
  },
  mdx: {
    Icon: SiMarkdown,
    name: 'MDX'
  },
  prettier: {
    Icon: SiPrettier,
    name: 'Prettier'
  },
  analytics: {
    Icon: SiGoogleanalytics,
    name: 'Google Analytics'
  },
  git: {
    Icon: SiGit,
    name: 'Git'
  },
  notion: {
    Icon: SiNotion,
    name: 'Notion API'
  }
};
