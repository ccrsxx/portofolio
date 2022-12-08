import { clsx } from 'clsx';

type IconName = keyof typeof Icons;

type IconProps = {
  className?: string;
};

type CustomIconProps = IconProps & {
  iconName: IconName;
};

const Icons = {
  SpinnerIcon
};

export function CustomIcon({
  iconName,
  className
}: CustomIconProps): JSX.Element {
  const Icon = Icons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
}

function SpinnerIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={clsx('animate-spin', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}
