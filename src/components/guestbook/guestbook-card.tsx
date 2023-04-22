import { Accent } from '@components/ui/accent';
import type { PropsWithChildren } from 'react';

export function GuestbookCard({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className='main-border rounded-md p-4'>
      <h2 className='text-2xl font-bold md:text-4xl'>
        <Accent>Sign the Guestbook</Accent>
      </h2>
      <p className='mt-2'>Share a message for a future visitor of my site.</p>
      {children}
      <p className='mt-2 text-xs text-gray-600 dark:text-gray-300'>
        Your information is only used to display your name, username, image, and
        reply by email.
      </p>
    </div>
  );
}
