import { Button } from '@components/ui/button';
import { Accent } from '@components/ui/accent';

export function SubscribeCard(): JSX.Element {
  return (
    <div className='main-border rounded-md p-4'>
      <h2 className='text-4xl font-bold'>
        <Accent>Subscribe to the newsletter</Accent>
      </h2>
      <p className='mt-2'>
        Get emails from me about web development, tech, and early access to new
        articles.
      </p>
      <div className='mt-4 flex items-center gap-2'>
        <input
          className='main-border w-full rounded-md px-3 py-2 outline-none
                     transition focus:border-accent-blue dark:bg-dark-background'
          type='email'
          placeholder='Email'
        />
        <Button className='custom-button font-bold text-gray-600 dark:text-gray-300'>
          Subscribe
        </Button>
      </div>
      <p className='mt-2 text-xs text-gray-600 dark:text-gray-300'>
        Join <Accent>69</Accent> other subscribers
      </p>
    </div>
  );
}
