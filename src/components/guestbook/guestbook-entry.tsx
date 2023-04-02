import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiTrash } from 'react-icons/hi2';
import { formatTimestamp } from '@lib/format';
import { UnstyledLink } from '@components/link/unstyled-link';
import { Button } from '@components/ui/button';
import { LazyImage } from '../ui/lazy-image';
import type { Variants } from 'framer-motion';
import type { CustomSession } from '@lib/types/api';
import type { Guestbook } from '@lib/types/guestbook';

type GuestbookEntryProps = Guestbook & {
  session: CustomSession | null;
  unRegisterGuestbook: (id: string) => Promise<void>;
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
  const [loading, setLoading] = useState(false);

  const handleUnRegisterGuestbook = async (): Promise<void> => {
    setLoading(true);
    await unRegisterGuestbook(id);
    setLoading(false);
  };

  const isOwner = session?.user.username === username || session?.user.admin;

  const GITHUB_PROFILE_URL = `https://github.com/${username}`;

  return (
    <motion.article
      className='main-border relative grid grid-cols-[auto,1fr] gap-3 rounded-md p-4'
      layout='position'
      {...variants}
    >
      <UnstyledLink href={GITHUB_PROFILE_URL}>
        <LazyImage
          className='main-border rounded-full transition hover:brightness-75'
          src={image}
          alt={name}
          width={48}
          height={48}
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
        </div>
        <p className='break-words'>{text}</p>
      </div>
      {isOwner && (
        <Button
          className='custom-underline main-border clickable !absolute right-2 top-2 
                     rounded-md p-1.5 text-red-400'
          loading={loading}
          type='button'
          onClick={handleUnRegisterGuestbook}
        >
          <HiTrash className='h-5 w-5' />
        </Button>
      )}
    </motion.article>
  );
}

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
