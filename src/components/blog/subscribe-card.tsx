import { Button } from '@components/ui/button';

export function SubscribeCard(): JSX.Element {
  return (
    <div className='main-border mt-6 grid gap-2 rounded-md p-4'>
      <h2 className='gradient-heading text-4xl font-bold'>
        Subscribe to the newsletter
      </h2>
      <p>
        Get emails from me about web development, tech, and early access to new
        articles.
      </p>
      <div className='mt-2 flex items-center gap-2'>
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
      <p className='text-xs text-gray-600 dark:text-gray-300'>
        Join <span className='gradient-title'>69</span> other subscribers
      </p>
    </div>
  );
}
