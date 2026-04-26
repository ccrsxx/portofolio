import { useActiveHeading } from '@lib/hooks/use-active-heading';
import { useHeadingData } from '@lib/hooks/use-heading-data';
import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

export function TableOfContents({
  children
}: PropsWithChildren): React.JSX.Element {
  const headingData = useHeadingData();
  const activeHeadingId = useActiveHeading();

  return (
    <aside className='sticky top-24 grid gap-4 self-start lg:w-64'>
      <section className='hidden gap-4 lg:grid'>
        <h2 className='text-foreground text-xl font-bold'>Table of Contents</h2>
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

function getHeadingStyle(
  currentActiveId: string | null,
  targetId: string
): string {
  return clsx(
    'smooth-tab transition',
    currentActiveId === targetId
      ? 'text-foreground'
      : 'text-muted hover:text-primary'
  );
}
