'use client';

import { ThemeSwitch } from '@components/common/theme-switch';
import { Accent } from '@components/ui/accent';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';

export function DesignClient(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <main className='grid min-h-screen content-start gap-6'>
      <header className='grid gap-2'>
        <h1 className='text-5xl font-bold animate-enter-y'>
          <Accent>Design</Accent>
        </h1>
        <p className='text-secondary animate-enter-y animate-enter-delay-100'>
          risalamin.com&apos;s color palette.
        </p>
      </header>
      <section
        className='main-border rounded-md border-2 border-dashed p-4 
                   animate-enter-y animate-enter-delay-100'
      >
        <div className='flex justify-between'>
          <h2 className='text-4xl font-bold capitalize'>{theme} Mode</h2>
          <ThemeSwitch />
        </div>
        <p className='text-secondary mt-2'>Font Family: Inter</p>
        <ul className='mt-3 card-layout'>
          {colorPalette.map(({ title, className, darkColor, lightColor }) => {
            let parsedColor: string;
            if (!darkColor) parsedColor = lightColor;
            else {
              if (theme === 'dark') parsedColor = darkColor;
              else parsedColor = lightColor;
            }
            return (
              <li className='flex items-center gap-2' key={title}>
                <div
                  className={clsx(
                    'main-border h-10 w-10 rounded-md shrink-0',
                    className
                  )}
                />
                <div>
                  <p>{title}</p>
                  <p className='text-muted text-sm'>{parsedColor}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

type ColorPalette = {
  title: string;
  className: string;
  darkColor?: string;
  lightColor: string;
};

const colorPalette: ColorPalette[] = [
  {
    title: 'Background',
    className: 'bg-background',
    darkColor: '#000000',
    lightColor: '#ffffff'
  },
  {
    title: 'Foreground',
    className: 'bg-foreground',
    darkColor: '#ffffff',
    lightColor: '#000000'
  },
  {
    title: 'Primary',
    className: 'bg-primary',
    darkColor: '#f3f4f6',
    lightColor: '#111827'
  },
  {
    title: 'Secondary',
    className: 'bg-secondary',
    darkColor: '#e5e7eb',
    lightColor: '#1f2937'
  },
  {
    title: 'Muted',
    className: 'bg-muted',
    darkColor: '#9ca3af',
    lightColor: '#4b5563'
  },
  {
    title: 'Border',
    className: 'bg-border',
    darkColor: '#3f3f46',
    lightColor: '#e4e4e7'
  },
  {
    title: 'Muted background',
    className: 'bg-muted-background',
    darkColor: '#27272a',
    lightColor: '#f4f4f5'
  },
  {
    title: 'Accent foreground',
    className: 'bg-accent-foreground',
    darkColor: '#4b5563',
    lightColor: '#9ca3af'
  },
  {
    title: 'Gradient color',
    className: 'bg-linear-to-tr from-accent-start to-accent-end',
    lightColor: '#a855f7 to #ec4899'
  }
];
