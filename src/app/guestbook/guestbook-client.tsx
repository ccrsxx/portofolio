'use client';

import { GuestbookCard } from '@components/guestbook/guestbook-card';
import { GuestbookEntry } from '@components/guestbook/guestbook-entry';
import { GuestbookForm } from '@components/guestbook/guestbook-form';
import { Accent } from '@components/ui/accent';
import { useGuestbook } from '@lib/hooks/use-guestbook';
import { useSession } from '@lib/hooks/use-session';
import { setTransition } from '@lib/transition';
import type { AuthUser } from '@lib/types/auth';
import type { Guestbook } from '@lib/types/guestbook';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';

type GuestbookClientProps = {
  session: AuthUser | null;
  guestbook: Guestbook[];
};

export function GuestbookClient({
  session: fallbackSession,
  guestbook: fallbackGuestbook
}: GuestbookClientProps): React.JSX.Element {
  const { data: session } = useSession(fallbackSession);
  const { data: guestbook } = useGuestbook(fallbackGuestbook);

  return (
    <main className='grid min-h-screen content-start gap-6'>
      <header className='grid gap-2'>
        <h1 className='text-3xl font-bold md:text-5xl'>
          <Accent>Guestbook</Accent>
        </h1>
        <p className='text-secondary'>
          Leave a comment below. It could be anything - appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
      </header>
      <section>
        <GuestbookCard>
          <GuestbookForm session={session} />
        </GuestbookCard>
      </section>
      <ul className='grid gap-4'>
        <AnimatePresence>
          {guestbook?.length ? (
            guestbook.map((entry) => (
              <motion.li {...variants} layout='position' key={entry.id}>
                <GuestbookEntry {...entry} session={session} />
              </motion.li>
            ))
          ) : (
            <motion.li
              className='text-center text-3xl font-bold'
              {...setTransition({ delayIn: 0.2 })}
            >
              <Accent>Sorry, Guestbook is currently empty :&#40;</Accent>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </main>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
