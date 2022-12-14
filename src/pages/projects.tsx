import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const item: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export default function Placeholder(): JSX.Element {
  return (
    <motion.main
      className='layout min-h-screen pt-32 text-center'
      variants={item}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      Placeholder
    </motion.main>
  );
}
