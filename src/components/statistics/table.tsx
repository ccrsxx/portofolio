import { useState } from 'react';
import { clsx } from 'clsx';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getFilteredRowModel
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { formatNumber } from '@lib/format';
import { SortIcon } from './sort-icon';
import type { ChangeEvent } from 'react';
import type {
  Row,
  ColumnDef,
  FilterMeta,
  CellContext,
  SortingState,
  SortDirection,
  ColumnFiltersState
} from '@tanstack/react-table';
import type { ContentColumn } from '@lib/types/statistics';

type TableProps = {
  data: ContentColumn[];
};

export function Table({ data }: TableProps): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { getHeaderGroups, getRowModel } = useReactTable<ContentColumn>({
    data: data,
    state: { globalFilter, columnFilters, sorting },
    columns: columns,
    sortDescFirst: false,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters
  });

  const handleGlobalFilterChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setGlobalFilter(value);

  const [totalViews, totalLikes] = getRowModel().rows.reduce(
    ([accViews, accLikes], { original: { views, likes } }) => [
      accViews + views,
      accLikes + likes
    ],
    [0, 0]
  );

  return (
    <div className='grid gap-4'>
      <input
        className='custom-input justify-self-start'
        type='text'
        placeholder='Search...'
        value={globalFilter}
        onChange={handleGlobalFilterChange}
      />
      <div className='main-border relative max-w-full overflow-x-auto rounded-md shadow-sm'>
        <table>
          <thead>
            {getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map(
                  ({
                    id,
                    column: {
                      columnDef,
                      getCanSort,
                      getIsSorted,
                      getToggleSortingHandler
                    },
                    getContext
                  }) => (
                    <th
                      className={clsx(
                        'group',
                        getCanSort() && 'cursor-pointer select-none'
                      )}
                      onClick={getToggleSortingHandler()}
                      key={id}
                    >
                      <div className='flex items-center justify-end gap-2'>
                        <div className='-space-y-1 text-xs'>
                          {sortDirections.map((sortDirection) => (
                            <SortIcon
                              isSorted={getIsSorted()}
                              sortDirection={sortDirection}
                              key={sortDirection}
                            />
                          ))}
                        </div>
                        <p className='whitespace-nowrap'>
                          {flexRender(columnDef.header, getContext())}
                        </p>
                      </div>
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map(({ id, getVisibleCells }) => (
              <tr key={id}>
                {getVisibleCells().map(({ id, column, getContext }) => (
                  <td className='whitespace-nowrap' key={id}>
                    {flexRender(column.columnDef.cell, getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{formatNumber(totalViews)}</td>
              <td>{formatNumber(totalLikes)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

const { accessor } = createColumnHelper<ContentColumn>();

function numericCellFormatter({
  getValue
}: CellContext<ContentColumn, number>): string {
  return formatNumber(getValue());
}

const columns: ColumnDef<ContentColumn>[] = [
  accessor('slug', { header: 'Post Slug' }),
  accessor('views', {
    header: 'Views',
    cell: numericCellFormatter
  }),
  accessor('likes', {
    header: 'Likes',
    cell: numericCellFormatter
  })
];

function fuzzyFilter(
  { getValue }: Row<ContentColumn>,
  columnId: string,
  value: string,
  addMeta: (meta: FilterMeta) => void
): boolean {
  const itemRank = rankItem(getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
}

const sortDirections: SortDirection[] = ['asc', 'desc'];
