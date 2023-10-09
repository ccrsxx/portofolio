import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { ThemeSwitch } from '@components/common/theme-switch';

export default function Design(): JSX.Element {
  const { theme } = useTheme();

  return (
    <main className='grid min-h-screen content-start gap-6'>
      <SEO title='Design' description="risalamin.com's color palette" />
      <section className='grid gap-2'>
        <motion.h1
          className='text-5xl font-bold'
          {...setTransition({ delayIn: 0.1 })}
        >
          <Accent>Design</Accent>
        </motion.h1>
        <motion.p
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.2 })}
        >
          risalamin.com&apos;s color palette.
        </motion.p>
      </section>
      <motion.section
        className='main-border rounded-md border-2 border-dashed p-4'
        {...setTransition({ delayIn: 0.3 })}
      >
        <div className='flex justify-between'>
          <h2 className='text-4xl font-bold capitalize'>{theme} Mode</h2>
          <ThemeSwitch />
        </div>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          Font Family: Inter
        </p>
        <ul className='mt-3 grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-4'>
          {colorPalette.map(({ title, hexCode, className }) => (
            <li className='flex items-center gap-2' key={title}>
              <div
                className={clsx('main-border h-10 w-10 rounded-md', className)}
              />
              <div>
                <h3>{title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {hexCode}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>
    </main>
  );
}

const colorPalette = [
  {
    title: 'White Background',
    hexCode: '#ffffff',
    className: 'bg-white'
  },
  {
    title: 'Black Background',
    hexCode: '#222222',
    className: 'bg-black'
  },
  {
    title: 'White Text',
    hexCode: '#ffffff',
    className: 'bg-white'
  },
  {
    title: 'Black Text',
    hexCode: '#000000',
    className: 'bg-black'
  },
  {
    title: 'Gray 100 Text',
    hexCode: '#f3f4f6',
    className: 'bg-gray-100'
  },
  {
    title: 'Gray 200 Text',
    hexCode: '#e5e7eb',
    className: 'bg-gray-200'
  },
  {
    title: 'Gray 300 Text',
    hexCode: '#d1d5db',
    className: 'bg-gray-300'
  },
  {
    title: 'Gray 400 Text',
    hexCode: '#9ca3af',
    className: 'bg-gray-400'
  },
  {
    title: 'Gray 500 Text',
    hexCode: '#6b7280',
    className: 'bg-gray-500'
  },
  {
    title: 'Gray 600 Text',
    hexCode: '#4b5563',
    className: 'bg-gray-600'
  },
  {
    title: 'Gray 700 Text',
    hexCode: '#374151',
    className: 'bg-gray-700'
  },
  {
    title: 'Gray 800 Text',
    hexCode: '#1f2937',
    className: 'bg-gray-800'
  },
  {
    title: 'Gray 900 Text',
    hexCode: '#111827',
    className: 'bg-gray-900'
  },
  {
    title: 'Gradient Color',
    hexCode: '#a855f7 to #f472b6',
    className: 'bg-gradient-to-tr from-accent-start to-accent-end'
  }
] as const;
