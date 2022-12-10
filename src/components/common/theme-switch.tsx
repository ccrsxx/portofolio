import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ReactIcon } from '@components/ui/react-icon';
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
      onClick={flipTheme}
    >
      <AnimatePresence mode='popLayout'>
        {isDarkMode ? (
          <motion.i {...sunVariants} key='light'>
            <ReactIcon iconName='HiOutlineSun' />
          </motion.i>
        ) : (
          <motion.i {...moonVariants} key='dark'>
            <ReactIcon iconName='HiOutlineMoon' />
          </motion.i>
        )}
      </AnimatePresence>
    </button>
  );
}
