import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiUsers, FiUser, FiArrowUpRight } from 'react-icons/fi';
import type { Project } from '@/types';
import ProjectCover from './ProjectCover';
import { getSkillIcon } from '@/data/skillIcons';

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (py - 0.5) * -6, y: (px - 0.5) * 6 });
    setGlow({ x: px * 100, y: py * 100 });
  }, []);

  const handleLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <Link to={`/proyectos/${project.slug}`} data-cursor-pointer className="block h-full">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ perspective: 1000 }}
        className="group h-full"
      >
        <motion.div
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="glass relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] transition-colors duration-300 group-hover:border-[var(--color-accent-bright)]/50"
        >
          {/* Cursor-following glow */}
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)`,
            }}
          />

          {/* Cover image */}
          <div className="relative h-52 w-full shrink-0 overflow-hidden border-b border-[var(--color-border)]">
           <ProjectCover coverImage={project.coverImage} gallery={project.gallery} title={project.title} seed={index} />

            {/* Gradient overlay at bottom of cover for smooth transition */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-ink)]/60 to-transparent" />

            {/* Arrow button — top right */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              <FiArrowUpRight size={15} />
            </motion.div>

            {/* Period badge — bottom left over cover */}
            {project.period && (
              <span className="absolute bottom-3 right-4 font-mono text-[10px] text-white/60">
                {project.period}
              </span>
            )}
          </div>

          {/* Card body */}
          <div className="relative z-10 flex flex-1 flex-col p-6">

            {/* Status + team badges */}
            <div className="flex flex-wrap items-center gap-2">
              {project.status === 'completed' ? (
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-success)]/10 px-3 py-1 font-mono text-[11px] text-[var(--color-success)]">
                  <FiCheckCircle size={11} /> Completado
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-warn)]/10 px-3 py-1 font-mono text-[11px] text-[var(--color-warn)]">
                  <FiClock size={11} /> En curso
                </span>
              )}
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] text-[var(--color-paper-dim)]">
                {project.teamType === 'team' ? <FiUsers size={11} /> : <FiUser size={11} />}
                {project.teamType === 'team' ? 'En equipo' : 'Individual'}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[var(--color-paper)] transition-colors duration-300 group-hover:text-[var(--color-accent-bright)] md:text-2xl">
              {project.title}
            </h3>

            {/* Context subtitle */}
            {project.context && (
              <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{project.context}</p>
            )}

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-paper-dim)] md:text-base">
              {project.description}
            </p>

            {/* Tech stack — with colored icon dots */}
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {project.tech.slice(0, 4).map((t) => {
                const { icon: Icon, color } = getSkillIcon(t);
                return (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/40 px-3 py-1 font-mono text-[11px] text-[var(--color-paper-dim)] transition-colors duration-200 group-hover:border-[var(--color-border)]"
                  >
                    <Icon size={10} style={{ color }} className="shrink-0" />
                    {t}
                  </span>
                );
              })}
              {project.tech.length > 4 && (
                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/40 px-3 py-1 font-mono text-[11px] text-[var(--color-muted)]">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Bottom accent line that grows on hover */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[var(--color-accent-bright)] to-transparent"
          />
        </motion.div>
      </div>
    </Link>
  );
}