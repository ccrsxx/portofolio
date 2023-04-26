import { clsx } from 'clsx';
import { useHeadingData } from '@lib/hooks/useHeadingData';
import { useActiveHeading } from '@lib/hooks/useActiveHeading';
import type { PropsWithChildren } from 'react';

export function TableOfContents({ children }: PropsWithChildren): JSX.Element {
  const headingData = useHeadingData();
  const activeHeadingId = useActiveHeading();

  return (
    <aside className='sticky top-24 grid gap-4 self-start lg:w-64'>
      <section className='hidden gap-4 lg:grid'>
        <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
          Table of Contents
        </h2>
        <nav className='grid justify-items-start gap-2 text-sm font-medium'>
          {headingData.map(({ id, title, items }) => (
            <>
              <a
                className={getHeadingStyle(activeHeadingId, id)}
                href={`#${id}`}
                key={id}
              >
                {title}
              </a>
              {!!items.length &&
                items.map(({ id, title }) => (
                  <a
                    className={clsx(
                      'ml-4',
                      getHeadingStyle(activeHeadingId, id)
                    )}
                    href={`#${id}`}
                    key={id}
                  >
                    {title}
                  </a>
                ))}
            </>
          ))}
        </nav>
      </section>
      {children}
    </aside>
  );
}

const linkStyles = [
  'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200',
  'text-gray-900 dark:text-gray-100'
] as const;

function getHeadingStyle(
  currentActiveId: string | null,
  targetId: string
): string {
  return clsx(
    'smooth-tab transition',
    linkStyles[+(currentActiveId === targetId)]
  );
}
