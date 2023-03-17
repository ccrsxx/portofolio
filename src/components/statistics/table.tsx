import { useState } from 'react';
import { clsx } from 'clsx';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper
} from '@tanstack/react-table';
import { SortIcon } from './sort-icon';
import type {
  ColumnDef,
  SortingState,
  SortDirection
} from '@tanstack/react-table';

type ContentColumn = {
  postName: string;
  views: number;
  likes: number;
};

const defaultData: ContentColumn[] = [
  {
    postName: 'Hello World',
    views: 100_000,
    likes: 1_000
  },
  {
    postName: 'Hello World 2',
    views: 200_000,
    likes: 2_000
  },
  {
    postName: 'Hello World 3',
    views: 300_000,
    likes: 3_000
  }
];

const { accessor } = createColumnHelper<ContentColumn>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<ContentColumn, any>[] = [
  accessor('postName', { header: 'Post Name' }),
  accessor('views', { header: 'Views' }),
  accessor('likes', { header: 'Likes' })
];

export function Table(): JSX.Element {
  const [data, _setData] = useState(defaultData);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    state: { sorting },
    columns,
    sortDescFirst: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className='main-border relative overflow-hidden rounded-md shadow-sm'>
      <table className='w-full table-auto border-collapse text-sm'>
        <thead className='main-border border-0 border-b'>
          {table.getHeaderGroups().map(({ id, headers }) => (
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
                      'group font-medium text-gray-500 dark:text-gray-200',
                      getCanSort() && 'cursor-pointer select-none'
                    )}
                    onClick={getToggleSortingHandler()}
                    key={id}
                  >
                    <div className='flex items-center justify-end gap-2 p-4'>
                      <div className='-space-y-1 text-xs opacity-0 transition-opacity group-hover:opacity-100'>
                        {sortDirections.map((sortDirection) => (
                          <SortIcon
                            isSorted={getIsSorted()}
                            sortDirection={sortDirection}
                            key={sortDirection}
                          />
                        ))}
                      </div>
                      <p>{flexRender(columnDef.header, getContext())}</p>
                    </div>
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody className='divide-y divide-gray-300 dark:divide-gray-600'>
          {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
            <tr key={id}>
              {getVisibleCells().map(({ id, column, getContext }) => (
                <td
                  className='p-4 font-medium text-gray-500 dark:text-gray-400'
                  key={id}
                >
                  {flexRender(column.columnDef.cell, getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sortDirections: SortDirection[] = ['asc', 'desc'];
