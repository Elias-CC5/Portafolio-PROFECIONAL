import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio';

const MESSAGES = [
  'status: online',
  'uptime: 24/7',
  'no se cae a las 3am',
  profile.availability.toLowerCase(),
];

export default function StatusBar() {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 3400);
    const cursorInterval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 600);
    return () => {
      clearInterval(msgInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2 font-mono text-xs text-[var(--color-paper-dim)] backdrop-blur-md md:flex"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
      </span>
      <span className="min-w-[170px]">
        {MESSAGES[index]}
        <span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
      </span>
    </motion.div>
  );
}
