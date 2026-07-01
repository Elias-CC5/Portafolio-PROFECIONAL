import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getSkillIcon } from '@/data/skillIcons';

interface SkillCardProps {
  name: string;
  index: number;
}

export default function SkillCard({ name }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Posición del cursor relativa a la tarjeta (-0.5 a 0.5)
  const xRelative = useMotionValue(0);
  const yRelative = useMotionValue(0);

  // Configuración de resortes (Springs) ultra suaves para el efecto 3D
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(yRelative, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(xRelative, [-0.5, 0.5], [-15, 15]), springConfig);
  const scale = useSpring(1, springConfig);

  // Posición del brillo y reflejos (0% a 100%)
  const glowX = useTransform(xRelative, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(yRelative, [-0.5, 0.5], [0, 100]);

  // Reflejo de luz inverso para el efecto cristal
  const sheenX = useTransform(xRelative, [-0.5, 0.5], [120, -20]);
  const sheenY = useTransform(yRelative, [-0.5, 0.5], [120, -20]);

  const { icon: Icon, color } = getSkillIcon(name);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    
    // Calculamos la posición del mouse de -0.5 a 0.5
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    xRelative.set(px);
    yRelative.set(py);
  }, [xRelative, yRelative]);

  const handleEnter = useCallback(() => {
    setHovered(true);
    scale.set(1.06);
  }, [scale]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    scale.set(1);
    xRelative.set(0);
    yRelative.set(0);
  }, [scale, xRelative, yRelative]);

  return (
    <div
      style={{ perspective: '1200px' }}
      className="group relative"
      data-cursor-pointer
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex h-40 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-950/40 backdrop-blur-md px-4 text-center cursor-pointer transition-colors duration-500 ease-out hover:border-white/[0.15] hover:bg-neutral-900/60"
      >
        {/* INTERIOR: Sombra interna para dar profundidad de caja */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

        {/* 1. Brillo de color de fondo dinámico */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(200px circle at ${x}% ${y}%, ${color}20, transparent 80%)`
            ),
          }}
        />

        {/* 2. Reflejo especular blanco (Efecto Cristal / Sheen) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [sheenX, sheenY],
              ([x, y]) => `radial-gradient(150px circle at ${x}% ${y}%, rgba(255,255,255,0.15), transparent 65%)`
            ),
          }}
        />

        {/* 3. Borde iluminado superior de alta gama */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}aa, transparent)`,
          }}
        />

        {/* 4. Contenedor del Icono (Flotando en el eje Z alto) */}
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ease-out"
          style={{
            background: hovered
              ? `radial-gradient(circle at 40% 35%, ${color}25, ${color}05)`
              : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${hovered ? `${color}50` : 'rgba(255, 255, 255, 0.08)'}`,
            boxShadow: hovered 
              ? `0 10px 30px -10px ${color}40, inset 0 1px 0px rgba(255,255,255,0.2)` 
              : 'none',
            transform: hovered ? 'translateZ(45px)' : 'translateZ(0px)',
          }}
        >
          <Icon
            size={28}
            style={{
              color: hovered ? color : '#9ca3af',
              filter: hovered ? `drop-shadow(0 0 12px ${color}bf)` : 'none',
              transition: 'all 0.5s ease-out',
            }}
          />
        </div>

        {/* 5. Texto de la habilidad (Flotando en el eje Z medio) */}
        <span
          className="relative z-10 w-full px-1 font-sans text-xs font-medium tracking-wide uppercase transition-all duration-500 ease-out md:text-sm"
          style={{
            color: hovered ? '#ffffff' : '#9ca3af',
            textShadow: hovered ? `0 0 15px ${color}40` : 'none',
            transform: hovered ? 'translateZ(25px)' : 'translateZ(0px)',
          }}
        >
          {name}
        </span>

        {/* 6. Barra de carga / acento inferior */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.8 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-8 bottom-0 h-[2px] origin-center"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </motion.div>
    </div>
  );
}