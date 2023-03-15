import { useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  createColumnHelper
} from '@tanstack/react-table';

type ContentColumn = {
  postName: string;
  numeric?: boolean;
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
    numeric: true,
    views: 200_000,
    likes: 2_000
  },
  {
    postName: 'Hello World 3',
    numeric: true,
    views: 300_000,
    likes: 3_000
  }
];

const columnHelper = createColumnHelper<ContentColumn>();

const columns = [
  columnHelper.accessor('postName', {
    header: 'Post Name'
  }),
  columnHelper.accessor('views', {
    header: 'Views'
  }),
  columnHelper.accessor('likes', {
    header: 'Likes'
  })
];

export function Table(): JSX.Element {
  const [data, _setData] = useState(defaultData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className='relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800/25'>
      <div className='relative overflow-auto rounded-xl'>
        <div className='my-8 overflow-hidden shadow-sm'>
          <table className='w-full table-auto border-collapse text-sm'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className='border-b p-4 pl-8 pt-0 pb-3 font-medium text-gray-400
                                 dark:border-gray-600 dark:text-gray-200'
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='bg-white dark:bg-gray-800'>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className='border-b border-gray-100 p-4 pl-8 text-gray-500 
                                   dark:border-gray-700 dark:text-gray-400'
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className='pointer-events-none absolute inset-0 rounded-xl border 
                     border-black/5 dark:border-white/5'
      />
    </div>
  );
}
