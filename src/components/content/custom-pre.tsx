'use client';

import { useMounted } from '@lib/hooks/use-mounted';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import {
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type PropsWithChildren
} from 'react';
import { HiClipboard, HiClipboardDocumentCheck } from 'react-icons/hi2';

type PrettyCodeProps = PropsWithChildren<{
  style: Pick<CSSProperties, 'backgroundColor'>;
  'data-theme': string;
  'data-language': string;
}>;

type CustomPreProps = ComponentPropsWithoutRef<'pre'> &
  Partial<PrettyCodeProps>;

export function CustomPre({
  children,
  ...rest
}: CustomPreProps): React.JSX.Element {
  const mounted = useMounted();

  const [copied, setCopied] = useState(false);

  const preRef = useRef<HTMLPreElement>(null);

  const handleCopied = async (): Promise<void> => {
    if (copied) return;
    setCopied(true);
    await navigator.clipboard.writeText(preRef.current?.textContent ?? '');
    setTimeout(() => setCopied(false), 2000);
  };

  const dataLanguage = rest['data-language'];

  return (
    <>
      {mounted && <div data-rehype-pretty-code-title>{dataLanguage}</div>}
      <pre {...rest} ref={preRef}>
        {mounted && (
          <button
            className='main-border smooth-tab clickable text-muted absolute top-2 right-2 grid rounded-md p-2'
            onClick={handleCopied}
          >
            <AnimatePresence mode='wait' initial={false}>
              {copied ? (
                <motion.span {...variants} key='copied'>
                  <HiClipboardDocumentCheck className='text-accent-main text-lg' />
                </motion.span>
              ) : (
                <motion.span {...variants} key='not-copied'>
                  <HiClipboard className='text-lg' />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
        {children}
      </pre>
    </>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.1 } }
};
