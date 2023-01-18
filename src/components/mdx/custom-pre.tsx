import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { HiClipboard, HiClipboardDocumentCheck } from 'react-icons/hi2';
import { useMounted } from '@lib/hooks/useMounted';
import type { ReactNode, ComponentPropsWithoutRef, CSSProperties } from 'react';
import type { Variants } from 'framer-motion';

type PrettyCodeProps = {
  style: Pick<CSSProperties, 'backgroundColor'>;
  children: ReactNode;
  'data-theme': string;
  'data-language': string;
};

type CustomPreProps = ComponentPropsWithoutRef<'pre'> &
  Partial<PrettyCodeProps>;

export function CustomPre({ children, ...props }: CustomPreProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const mounted = useMounted();

  const preRef = useRef<HTMLPreElement>(null);

  const handleCopied = async (): Promise<void> => {
    if (copied) return;
    setCopied(true);
    await navigator.clipboard.writeText(preRef.current?.textContent ?? '');
    setTimeout(() => setCopied(false), 2000);
  };

  const dataLanguage = props['data-language'];

  return (
    <>
      {mounted && <div data-rehype-pretty-code-title>{dataLanguage}</div>}
      <pre {...props} ref={preRef}>
        {mounted && (
          <button
            className='main-border smooth-tab absolute top-2 right-2 grid rounded-md 
                       border-gray-600 p-2 brightness-75 transition hover:brightness-100'
            onClick={handleCopied}
          >
            <AnimatePresence mode='popLayout' initial={false}>
              {copied ? (
                <motion.i {...variants} key='copied'>
                  <HiClipboardDocumentCheck className='h-5 w-5 text-green-400' />
                </motion.i>
              ) : (
                <motion.i {...variants} key='not-copied'>
                  <HiClipboard className='h-5 w-5' />
                </motion.i>
              )}
            </AnimatePresence>
          </button>
        )}
        {children}
      </pre>
    </>
  );
}

const variants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, scale: 0.5 }
};
