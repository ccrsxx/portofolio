import { getServerSession } from 'next-auth/next';
import { AnimatePresence, motion } from 'framer-motion';
import { getGuestbook } from '@lib/api';
import { setTransition } from '@lib/transition';
import { useGuestbook } from '@lib/hooks/useGuestbook';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { GuestbookCard } from '@components/guestbook/guestbook-card';
import { GuestbookForm } from '@components/guestbook/guestbook-form';
import { GuestbookEntry } from '@components/guestbook/guestbook-entry';
import { authOptions } from './api/auth/[...nextauth]';
import type {
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next';
import type { AuthOptions } from 'next-auth';
import type { CustomSession } from '@lib/types/api';
import type { Guestbook } from '@lib/types/guestbook';

export default function Guestbook({
  session,
  guestbook: fallbackData
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { guestbook, registerGuestbook, unRegisterGuestbook } =
    useGuestbook(fallbackData);

  return (
    <main className='grid min-h-screen content-start gap-6'>
      <SEO
        title='Guestbook'
        description='Sign my digital guestbook and share some wisdom.'
      />
      <section className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>Guestbook</Accent>
        </motion.h1>
        <motion.p
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.1 })}
        >
          Leave a comment below. It could be anything - appreciation,
          information, wisdom, or even humor. Surprise me!
        </motion.p>
      </section>
      <motion.section {...setTransition({ delayIn: 0.2 })}>
        <GuestbookCard>
          <GuestbookForm
            session={session}
            registerGuestbook={registerGuestbook}
          />
        </GuestbookCard>
      </motion.section>
      <motion.section
        className='grid gap-4'
        {...setTransition({ delayIn: 0.3 })}
      >
        <AnimatePresence>
          {guestbook?.length ? (
            guestbook.map((entry) => (
              <GuestbookEntry
                {...entry}
                session={session}
                unRegisterGuestbook={unRegisterGuestbook}
                key={entry.id}
              />
            ))
          ) : (
            <motion.h2
              className='text-center text-3xl font-bold'
              {...setTransition({ delayIn: 0.2 })}
            >
              <Accent>Sorry, Guestbook is currently empty :&#40;</Accent>
            </motion.h2>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}

type GuestbookProps = {
  session: CustomSession | null;
  guestbook: Guestbook[];
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<GuestbookProps>> {
  const session = await getServerSession<AuthOptions, CustomSession>(
    context.req,
    context.res,
    authOptions
  );

  const guestbook = await getGuestbook();

  return {
    props: {
      session,
      guestbook
    }
  };
}
