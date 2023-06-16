import { clsx } from 'clsx';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import type { SortDirection } from '@tanstack/react-table';

type SortIconProps = {
  isSorted: false | SortDirection;
  sortDirection: SortDirection;
};

export function SortIcon({
  isSorted,
  sortDirection
}: SortIconProps): JSX.Element {
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
          arrowStyles[+(isSorted === sortDirection)]
        )}
      />
    </div>
  );
}

const Icons: Record<SortDirection, IconType> = {
  asc: HiChevronUp,
  desc: HiChevronDown
};

const arrowStyles = [
  'text-gray-400 dark:text-gray-500',
  'text-gray-700 dark:text-gray-200'
] as const;
