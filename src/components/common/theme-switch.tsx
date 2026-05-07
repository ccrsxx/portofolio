import { useMounted } from '@lib/hooks/use-mounted';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { useTheme } from 'next-themes';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export function ThemeSwitch(): React.JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  const flipTheme = (): void => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <button
      className='border-border hover:border-accent-main! hover:text-accent-main 
                 focus-visible:border-accent-main! focus-visible:text-accent-main 
                   relative overflow-hidden rounded-md border p-2 text-lg outline-hidden 
                   transition md:text-xl [&>span]:block'
      type='button'
      onClick={flipTheme}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        {isDarkMode ? (
          <motion.span {...moonVariants} key='dark'>
            <HiOutlineMoon />
          </motion.span>
        ) : (
          <motion.span {...sunVariants} key='light'>
            <HiOutlineSun />
          </motion.span>
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
