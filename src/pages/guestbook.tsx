import { getServerSession } from 'next-auth/next';
import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { GuestbookCard } from '@components/guestbook/guestbook-card';
import { authOptions } from './api/auth/[...nextauth]';
import type {
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next';
import type { AuthOptions, Session } from 'next-auth';

export default function Guestbook({
  session
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <main className='grid gap-6 py-12'>
      <SEO
        title='Guestbook | Risal Amin'
        description='Sign my digital guestbook and share some wisdom.'
      />
      <section className='grid gap-2'>
        <motion.h1 className='pb-1 text-5xl font-bold' {...setTransition()}>
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
        <GuestbookCard session={session} />
      </motion.section>
      <section></section>
    </main>
  );
}

type CustomSession = Session & { user: { username: string } };

type GuestbookProps = {
  session: CustomSession | null;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<GuestbookProps>> {
  const session = await getServerSession<AuthOptions, CustomSession>(
    context.req,
    context.res,
    authOptions
  );

  return {
    props: {
      session
    }
  };
}
