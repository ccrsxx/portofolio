import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { ThemeSwitch } from '@components/common/theme-switch';

export default function Design(): React.JSX.Element {
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
          className='text-secondary'
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
        <p className='text-secondary mt-2'>Font Family: Inter</p>
        <ul className='mt-3 grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-4'>
          {colorPalette.map(({ title, className, lightHex, darkHex }) => {
            let parsedHex: string;

            if (!darkHex) parsedHex = lightHex;
            else {
              if (theme === 'dark') parsedHex = darkHex;
              else parsedHex = lightHex;
            }

            return (
              <li className='flex items-center gap-2' key={title}>
                <div
                  className={clsx(
                    'main-border h-10 w-10 rounded-md',
                    className
                  )}
                />
                <div>
                  <h3>{title}</h3>
                  <p className='text-muted text-sm'>{parsedHex}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.section>
    </main>
  );
}

type ColorPalette = {
  title: string;
  darkHex?: string;
  lightHex: string;
  className: string;
};

const colorPalette: ColorPalette[] = [
  {
    title: 'Background',
    className: 'bg-background',
    lightHex: '#ffffff',
    darkHex: '#000000'
  },
  {
    title: 'Foreground',
    className: 'bg-foreground',
    lightHex: '#000000',
    darkHex: '#ffffff'
  },
  {
    title: 'Primary',
    className: 'bg-primary',
    lightHex: '#111827',
    darkHex: '#f3f4f6'
  },
  {
    title: 'Secondary',
    className: 'bg-secondary',
    lightHex: '#1f2937',
    darkHex: '#e5e7eb'
  },
  {
    title: 'Muted',
    className: 'bg-muted',
    lightHex: '#4b5563',
    darkHex: '#9ca3af'
  },
  {
    title: 'Border',
    className: 'bg-border',
    lightHex: '#d1d5db',
    darkHex: '#374151'
  },
  {
    title: 'Muted background',
    className: 'bg-muted-background',
    lightHex: '#f3f4f6',
    darkHex: '#111827'
  },
  {
    title: 'Accent foreground',
    className: 'bg-accent-foreground',
    lightHex: '#9ca3af',
    darkHex: '#4b5563'
  },
  {
    title: 'Gradient color',
    className: 'bg-linear-to-tr from-accent-start to-accent-end',
    lightHex: '#a855f7 to #c084fc'
  }
];
