import { Button } from '@components/ui/button';
import { Accent } from '@components/ui/accent';

export function SubscribeCard(): JSX.Element {
  return (
    <div className='main-border rounded-md p-4'>
      <h2 className='text-2xl font-bold md:text-4xl'>
        <Accent>Subscribe to the newsletter</Accent>
      </h2>
      <p className='mt-2'>
        Get emails from me about web development, tech, and early access to new
        articles.
      </p>
      <div className='mt-4 flex items-center gap-2 text-sm md:text-base'>
        <input
          className='custom-input w-full'
          type='email'
          placeholder='Email'
        />
        <Button
          className='custom-button clickable font-bold text-gray-600 
                     dark:text-gray-300'
        >
          Subscribe
        </Button>
      </div>
      <p className='mt-2 text-xs text-gray-600 dark:text-gray-300'>
        Join <Accent>69</Accent> other subscribers
      </p>
    </div>
  );
}
