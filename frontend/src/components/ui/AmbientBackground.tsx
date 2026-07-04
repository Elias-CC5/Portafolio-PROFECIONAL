import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;
    let moved = false; // ← solo animar si hubo movimiento

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      moved = true;
    }

    function animate() {
      raf = requestAnimationFrame(animate);
      if (!moved) return; // ← no tocar el DOM si no hubo cambio
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const dx = Math.abs(targetX - currentX);
      const dy = Math.abs(targetY - currentY);
      if (dx < 0.1 && dy < 0.1) { moved = false; return; } // ← parar cuando llega
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 400}px, ${currentY - 400}px)`;
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-ink)]">
      <div
        ref={glowRef}
        className="absolute h-[800px] w-[800px] rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
      />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--color-accent-dim)] opacity-[0.12] blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-[140px]" />
    </div>
  );
}