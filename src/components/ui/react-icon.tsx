import {
  HiEye,
  HiClock,
  HiEnvelope,
  HiOutlineSun,
  HiOutlineMoon,
  HiDocumentText
} from 'react-icons/hi2';
import { SiTwitter, SiGithub, SiLinkedin } from 'react-icons/si';
import { ImSpinner2 } from 'react-icons/im';

const reactIcons = {
  HiEye,
  HiClock,
  SiGithub,
  SiTwitter,
  SiLinkedin,
  HiEnvelope,
  ImSpinner2,
  HiOutlineSun,
  HiOutlineMoon,
  HiDocumentText
};

export type IconName = keyof typeof reactIcons;

type ReactIconProps = {
  iconName: IconName;
  className?: string;
};

export function ReactIcon({
  iconName,
  className
}: ReactIconProps): JSX.Element {
  // eslint-disable-next-line import/namespace
  const Icon = reactIcons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
}
