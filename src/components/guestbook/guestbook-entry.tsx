import { UnstyledLink } from '@components/link/unstyled-link';
import { Button } from '@components/ui/button';
import { LazyImage } from '@components/ui/lazy-image';
import { Tooltip } from '@components/ui/tooltip';
import { formatFullTimeStamp, formatTimestamp } from '@lib/format';
import { useDeleteGuestbookEntry } from '@lib/hooks/use-guestbook';
import type { AuthUser } from '@lib/types/auth';
import type { Guestbook } from '@lib/types/guestbook';
import { motion, type MotionProps } from 'framer-motion';
import { useState } from 'react';
import { HiTrash } from 'react-icons/hi2';

type GuestbookEntryProps = Guestbook & {
  session: AuthUser | undefined;
};

export function GuestbookEntry({
  id,
  text,
  name,
  image,
  session,
  username,
  createdAt
}: GuestbookEntryProps): React.JSX.Element {
  const { mutate, isPending } = useDeleteGuestbookEntry();

  const [isDeleting, setIsDeleting] = useState(false);

  const isLoading = isPending || isDeleting;

  const handleUnRegisterGuestbook = (): void => {
    setIsDeleting(true);

    mutate(id, {
      onError: (error) => {
        console.error('guestbook entry delete error', error);
        setIsDeleting(false);
      }
    });
  };

  const isOwner = session?.role === 'admin';
  const githubProfileUrl = `https://github.com/${username}`;

  return (
    <motion.article
      className='main-border relative grid grid-cols-[auto_1fr] gap-3 rounded-md p-4'
      layout='position'
      {...variants}
    >
      <UnstyledLink className='smooth-tab' href={githubProfileUrl}>
        <LazyImage
          className='main-border rounded-full transition hover:brightness-75'
          src={image}
          alt={name}
          width={48}
          height={48}
        />
      </UnstyledLink>
      <div className='min-w-0'>
        <div className='mr-10 flex items-end gap-2'>
          <UnstyledLink
            className='custom-underline truncate font-bold'
            title={name}
            href={githubProfileUrl}
          >
            {name}
          </UnstyledLink>
          <Tooltip
            tip={formatFullTimeStamp(createdAt)}
            tooltipClassName='[position-try-fallbacks:none] group-hover:-translate-y-4! -translate-y-2!'
          >
            <button className='custom-underline text-muted cursor-pointer text-sm'>
              {formatTimestamp(createdAt)}
            </button>
          </Tooltip>
        </div>
        <p className='text-primary wrap-break-word'>{text}</p>
      </div>
      {isOwner && (
        <Button
          className='main-border clickable absolute top-2 right-2 rounded-md p-1.5 text-accent-main'
          loading={isLoading}
          disabled={isLoading}
          type='button'
          onClick={handleUnRegisterGuestbook}
        >
          <HiTrash className='text-lg' />
        </Button>
      )}
    </motion.article>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
