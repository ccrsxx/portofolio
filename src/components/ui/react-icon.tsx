import * as HeroIcons from 'react-icons/hi2';
import * as SimpleIcons from 'react-icons/si';
import { ImSpinner2 } from 'react-icons/im';

const reactIcons = {
  ImSpinner2,
  ...HeroIcons,
  ...SimpleIcons
};

type IconName = keyof typeof reactIcons;

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
