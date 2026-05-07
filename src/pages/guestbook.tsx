import { SEO } from '@components/common/seo';
import { GuestbookCard } from '@components/guestbook/guestbook-card';
import { GuestbookEntry } from '@components/guestbook/guestbook-entry';
import { GuestbookForm } from '@components/guestbook/guestbook-form';
import { Accent } from '@components/ui/accent';
import { getGuestbook, getSession } from '@lib/api';
import { useGuestbook } from '@lib/hooks/use-guestbook';
import { useSession } from '@lib/hooks/use-session';
import { setTransition } from '@lib/transition';
import type { AuthUser } from '@lib/types/auth';
import type { Guestbook } from '@lib/types/guestbook';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next';

export default function Guestbook({
  session: fallbackSession,
  guestbook: fallbackGuestbook
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.JSX.Element {
  const { data: session } = useSession(fallbackSession);
  const { data: guestbook } = useGuestbook(fallbackGuestbook);

  return (
    <main className='grid min-h-screen content-start gap-6'>
      <SEO
        title='Guestbook'
        description='Sign my digital guestbook and share some wisdom.'
      />
      <header className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>Guestbook</Accent>
        </motion.h1>
        <motion.p
          className='text-secondary'
          {...setTransition({ delayIn: 0.1 })}
        >
          Leave a comment below. It could be anything - appreciation,
          information, wisdom, or even humor. Surprise me!
        </motion.p>
      </header>
      <motion.section {...setTransition({ delayIn: 0.2 })}>
        <GuestbookCard>
          <GuestbookForm session={session} />
        </GuestbookCard>
      </motion.section>
      <motion.ul className='grid gap-4' {...setTransition({ delayIn: 0.3 })}>
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
      </motion.ul>
    </main>
  );
}

type GuestbookProps = {
  session: AuthUser | null;
  guestbook: Guestbook[];
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<GuestbookProps>> {
  const token = context.req.cookies['oauth-token'];

  let session: AuthUser | null = null;
  let guestbook: Guestbook[] = [];

  try {
    if (token) session = await getSession(token);
  } catch (error) {
    console.error('guestbook ssr session error', error);
  }

  try {
    guestbook = await getGuestbook();
  } catch (error) {
    console.error('guestbook ssr guestbook error', error);
  }

  return {
    props: {
      session,
      guestbook
    }
  };
}

const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
