import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from 'next-themes';
import type { MotionProps } from 'framer-motion';

const variants: MotionProps[] = [
  {
    initial: { x: '-50px', y: '25px' },
    animate: { scale: 1, x: 0, y: 0, transition: { duration: 0.8 } },
    exit: { x: '-50px', y: '25px', transition: { duration: 0.5 } }
  },
  {
    initial: { x: '50px', y: '25px' },
    animate: { scale: 1, x: 0, y: 0, transition: { duration: 0.8 } },
    exit: { x: '50px', y: '25px', transition: { duration: 0.5 } }
  }
];

const [sunVariants, moonVariants] = variants;

export function ThemeSwitch(): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  const flipTheme = (): void => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <button
      className='relative overflow-hidden rounded-md border p-2 outline-none 
                 transition hover:!border-accent-blue hover:text-accent-blue
                 focus-visible:!border-accent-blue focus-visible:text-accent-blue 
                 dark:border-gray-600 [&>i]:block'
      type='button'
      onClick={flipTheme}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        {isDarkMode ? (
          <motion.i {...sunVariants} key='light'>
            <HiOutlineSun className='h-6 w-6' />
          </motion.i>
        ) : (
          <motion.i {...moonVariants} key='dark'>
            <HiOutlineMoon className='h-6 w-6' />
          </motion.i>
        )}
      </AnimatePresence>
    </button>
  );
}
