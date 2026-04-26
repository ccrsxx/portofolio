import type { SortDirection } from '@tanstack/react-table';
import { clsx } from 'clsx';
import type { IconType } from 'react-icons';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

type SortIconProps = {
  isSorted: false | SortDirection;
  sortDirection: SortDirection;
};

export function SortIcon({
  isSorted,
  sortDirection
}: SortIconProps): React.JSX.Element {
  const Icon = Icons[sortDirection];

  return (
    <div
      className={clsx(
        'transition-opacity group-hover:opacity-100',
        isSorted ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Icon
        className={clsx(
          'transition-colors',
          isSorted === sortDirection ? 'text-primary' : 'text-accent-foreground'
        )}
      />
    </div>
  );
}

const Icons: Record<SortDirection, IconType> = {
  asc: HiChevronUp,
  desc: HiChevronDown
};
