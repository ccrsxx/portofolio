import { type FormEvent } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { clsx } from 'clsx';
import { SiGithub } from 'react-icons/si';
import { useAddGuestbookEntry } from '@lib/hooks/use-guestbook';
import { Button } from '@components/ui/button';
import type { CustomSession } from '@lib/types/auth';

type GuestbookCardProps = {
  session: CustomSession | null;
};

export function GuestbookForm({
  session
}: GuestbookCardProps): React.JSX.Element {
  const { mutate, isPending } = useAddGuestbookEntry();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form[0] as HTMLInputElement;
    const { value } = input;

    if (!value.trim()) return;

    mutate(value, {
      onSuccess: () => {
        form.reset();
        input.blur();
      },
      onError: (error) => {
        console.error('guestbook form create error', error);
      }
    });
  };

  return (
    <>
      <form
        className='mt-4 flex items-center gap-2 text-sm transition md:text-base'
        onSubmit={handleSubmit}
      >
        <input
          className={clsx(
            'custom-input w-full disabled:cursor-not-allowed',
            isPending && 'brightness-75'
          )}
          type='text'
          placeholder={
            session ? 'Your message...' : 'Sign in to leave a message'
          }
          disabled={isPending || !session}
          required
        />
        {session ? (
          <Button
            type='submit'
            className='custom-button clickable font-bold'
            loading={isPending}
          >
            Sign
          </Button>
        ) : (
          <Button
            type='button'
            className='custom-button clickable flex items-center gap-2 font-bold whitespace-nowrap'
            onClick={handleSignIn}
          >
            <SiGithub className='h-5 w-5' />
            Sign in
          </Button>
        )}
      </form>
      {session && (
        <button
          className='smooth-tab text-secondary hover:text-foreground custom-underline mt-2 border-0 text-sm font-medium transition disabled:cursor-not-allowed disabled:brightness-50 md:text-base'
          onClick={handleSignOut}
          disabled={isPending}
        >
          ← Sign out @{session.user.name}
        </button>
      )}
    </>
  );
}

function handleSignIn(): void {
  void signIn('github');
}

function handleSignOut(): void {
  void signOut();
}
