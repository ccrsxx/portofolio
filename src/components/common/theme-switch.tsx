import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from 'next-themes';
import { useMounted } from '@lib/hooks/useMounted';
import type { MotionProps } from 'framer-motion';

export function ThemeSwitch(): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  const flipTheme = (): void => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <button
      className='relative overflow-hidden rounded-md border p-2 text-lg outline-none
                 transition hover:!border-accent-end hover:text-accent-end
                 focus-visible:!border-accent-end focus-visible:text-accent-end 
                 dark:border-gray-600 md:text-xl [&>i]:block'
      type='button'
      onClick={flipTheme}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        {isDarkMode ? (
          <motion.i {...moonVariants} key='dark'>
            <HiOutlineMoon />
          </motion.i>
        ) : (
          <motion.i {...sunVariants} key='light'>
            <HiOutlineSun />
          </motion.i>
        )}
      </AnimatePresence>
    </button>
  );
}

const variants: MotionProps[] = [
  {
    initial: { x: '50px', y: '25px' },
    animate: { scale: 1, x: 0, y: 0, transition: { duration: 0.8 } },
    exit: { x: '50px', y: '25px', transition: { duration: 0.5 } }
  },
  {
    initial: { x: '-50px', y: '25px' },
    animate: { scale: 1, x: 0, y: 0, transition: { duration: 0.8 } },
    exit: { x: '-50px', y: '25px', transition: { duration: 0.5 } }
  }
];

const [moonVariants, sunVariants] = variants;
