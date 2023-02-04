import { signIn, signOut } from 'next-auth/react';
import { SiGithub } from 'react-icons/si';
import { Button } from '@components/ui/button';
import { Accent } from '@components/ui/accent';
import type { Session } from 'next-auth';

const handleSignIn = (): void => void signIn('github');
const handleSignOut = (): void => void signOut();

export function GuestbookCard({
  session
}: {
  session: Session | null;
}): JSX.Element {
  return (
    <div className='main-border rounded-md p-4'>
      <h2 className='text-4xl font-bold'>
        <Accent>Sign the Guestbook</Accent>
      </h2>
      <p className='mt-2'>Share a message for a future visitor of my site.</p>
      <form className='mt-4 flex items-center gap-2'>
        <input
          className='main-border w-full rounded-md px-3 py-2 outline-none transition focus:border-accent-blue 
                         disabled:cursor-not-allowed dark:bg-dark-background'
          type='email'
          placeholder={
            session ? 'Your message...' : 'Sign in to leave a message'
          }
          disabled={!session}
          required
        />
        {session ? (
          <Button
            type='submit'
            className='custom-button font-bold text-gray-600 dark:text-gray-300'
          >
            Sign
          </Button>
        ) : (
          <Button
            className='custom-button flex items-center gap-2 whitespace-nowrap font-bold
                           text-gray-600 dark:text-gray-300'
            onClick={handleSignIn}
          >
            <SiGithub className='h-5 w-5' />
            Sign in
          </Button>
        )}
      </form>
      {session && (
        <button
          className='mt-2 border-none text-gray-600 dark:text-gray-300'
          onClick={handleSignOut}
        >
          ← Sign out
        </button>
      )}
      <p className='mt-2 text-xs text-gray-600 dark:text-gray-300'>
        Your information is only used to display your name, username, image, and
        reply by email.
      </p>
    </div>
  );
}
