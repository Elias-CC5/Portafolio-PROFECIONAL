import { type ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean;
  target?: string;
}

export default function MagneticButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  download,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 whitespace-nowrap';
  const variants = {
    primary: 'bg-[var(--color-paper)] text-[var(--color-ink)] hover:bg-[var(--color-accent-bright)] hover:text-white',
    secondary: 'border border-[var(--color-border)] text-[var(--color-paper)] hover:border-[var(--color-accent-bright)] hover:text-[var(--color-accent-bright)]',
    ghost: 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]',
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref as never}
      href={href}
      onClick={onClick}
      download={download}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      className={`${base} ${variants[variant]} ${className}`}
      data-cursor-pointer
    >
      {children}
    </Comp>
  );
}
