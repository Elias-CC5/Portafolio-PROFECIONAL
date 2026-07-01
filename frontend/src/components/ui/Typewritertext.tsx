import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number; // ms per character
  as?: 'h1' | 'h2' | 'h3' | 'p';
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 38,
  as = 'h1',
  showCursor = true,
}: TypewriterTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const Tag = as;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisibleChars(text.length);
      setDone(true);
      return;
    }

    const startTimeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [delay, text.length]);

  useEffect(() => {
    if (!started || done) return;

    if (visibleChars >= text.length) {
      setDone(true);
      return;
    }

    const interval = setTimeout(() => setVisibleChars((c) => c + 1), speed);
    return () => clearTimeout(interval);
  }, [started, visibleChars, text.length, speed, done]);

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, visibleChars)}
        {showCursor && (
          <motion.span
            animate={done ? { opacity: [1, 0, 1] } : { opacity: 1 }}
            transition={
              done 
                ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } 
                : { duration: 0 }
            }
            className="ml-1 inline-block w-[8px] bg-[var(--color-paper)]"
            style={{ height: '0.75em', translateY: '2px' }}
          />
        )}
      </span>
    </Tag>
  );
}