import Image from 'next/image';
import { formatTimestamp } from '@lib/format';
import { UnstyledLink } from '@components/link/unstyled-link';
import type { CustomSession } from '@lib/types/api';
import type { Guestbook } from '@lib/types/guestbook';

type GuestbookEntryProps = Guestbook & {
  session: CustomSession | null;
  unRegisterGuestbook: (id: string) => () => Promise<void>;
};

export function GuestbookEntry({
  id,
  text,
  name,
  image,
  session,
  username,
  createdAt,
  unRegisterGuestbook
}: GuestbookEntryProps): JSX.Element {
  const isOwner = session?.user.username === username;

  const GITHUB_PROFILE_URL = `https://github.com/${username}`;

  return (
    <article className='main-border grid grid-cols-[auto,1fr] gap-3 rounded-md p-4'>
      <UnstyledLink href={GITHUB_PROFILE_URL}>
        <Image
          className='rounded-full transition hover:brightness-75'
          src={image}
          width={48}
          height={48}
          alt={name}
        />
      </UnstyledLink>
      <div className='min-w-0'>
        <div className='flex gap-2'>
          <UnstyledLink
            className='custom-underline font-bold'
            href={GITHUB_PROFILE_URL}
          >
            {name}
          </UnstyledLink>
          <span className='text-gray-700 dark:text-gray-200'>/</span>
          <p className='text-gray-600 dark:text-gray-300'>
            {formatTimestamp(createdAt)}
          </p>
          {isOwner && (
            <button
              className='custom-underline text-red-400'
              type='button'
              onClick={unRegisterGuestbook(id)}
            >
              Delete
            </button>
          )}
        </div>
        <p className='break-words'>{text}</p>
      </div>
    </article>
  );
}
