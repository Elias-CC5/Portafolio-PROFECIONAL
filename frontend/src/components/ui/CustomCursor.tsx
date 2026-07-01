import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const dotX = useSpring(mouseX, { damping: 40, stiffness: 700 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 700 });

  const checkedTouch = useRef(false);

  useEffect(() => {
    if (!checkedTouch.current) {
      checkedTouch.current = true;
      const touch = window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(touch);
      if (touch) return;
    }

    function handleMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-pointer]');
      setIsPointer(Boolean(interactive));
    }

    function handleLeave() {
      setIsVisible(false);
    }

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] hidden md:block" aria-hidden="true">
      <motion.div
        className="absolute rounded-full border border-[var(--color-accent-bright)]"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ width: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }, height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      />
      <motion.div
        className="absolute rounded-full bg-[var(--color-accent-bright)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
