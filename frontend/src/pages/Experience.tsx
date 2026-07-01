import { useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import SEO from '@/components/layout/SEO';
import Reveal from '@/components/ui/Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiBriefcase, FiFolder, FiBookOpen, FiUsers, FiUser, FiArrowUpRight } from 'react-icons/fi';
import { experience, education, projects, profile } from '@/data/portfolio';

type TimelineType = 'experience' | 'project' | 'education';

interface TimelineEntry {
  id: string;
  type: TimelineType;
  title: string;
  subtitle: string;
  period: string;
  bullets: string[];
  current: boolean;
  teamType?: 'individual' | 'team';
  slug?: string;
  sortOrder: number; // higher = more recent, manually curated since period formats vary
}

const ICONS: Record<TimelineType, typeof FiBriefcase> = {
  experience: FiBriefcase,
  project: FiFolder,
  education: FiBookOpen,
};

function TimelineCard({ item, isLink }: { item: TimelineEntry; isLink: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (py - 0.5) * -4, y: (px - 0.5) * 4 });
    setGlow({ x: px * 100, y: py * 100 });
  }

  function handleLeave() {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleLeave} style={{ perspective: 900 }}>
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y, scale: hovered ? 1.015 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative overflow-hidden rounded-2xl border p-6 transition-colors duration-300 ${
          isLink ? 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent-bright)]/50' : 'border-[var(--color-border)] bg-[var(--color-surface)]'
        }`}
      >
        {/* Cursor-tracking glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-[var(--color-paper)] md:text-xl">{item.title}</h3>
              {isLink && (
                <motion.span animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }} className="text-[var(--color-accent-bright)]">
                  <FiArrowUpRight size={14} />
                </motion.span>
              )}
            </div>
            <span className="font-mono text-xs text-[var(--color-muted)]">{item.period}</span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {item.subtitle && <p className="text-sm text-[var(--color-accent-bright)]">{item.subtitle}</p>}
            {item.type === 'project' && item.teamType && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-paper-dim)]">
                {item.teamType === 'team' ? <FiUsers size={10} /> : <FiUser size={10} />}
                {item.teamType === 'team' ? 'Equipo' : 'Individual'}
              </span>
            )}
          </div>

          {item.bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2.5 text-sm text-[var(--color-paper-dim)]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-paper-dim)]" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.3'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.3]);

  const timelineItems: TimelineEntry[] = [
    ...experience.map((e) => ({
      id: e.id,
      type: 'experience' as const,
      title: e.role,
      subtitle: e.organization,
      period: e.period,
      bullets: e.bullets,
      current: e.current,
      sortOrder: 100,
    })),
    ...projects.map((p, i) => ({
      id: p.id,
      type: 'project' as const,
      title: p.title,
      subtitle: p.context ?? '',
      period: p.period ?? '',
      bullets: p.bullets.slice(0, 2),
      current: false,
      teamType: p.teamType,
      slug: p.slug,
      sortOrder: 90 - i,
    })),
    ...education.map((e) => ({
      id: e.id,
      type: 'education' as const,
      title: e.institution,
      subtitle: e.description ?? 'Formación académica',
      period: e.period,
      bullets: [] as string[],
      current: false,
      sortOrder: 0,
    })),
  ].sort((a, b) => b.sortOrder - a.sortOrder);

  return (
    <>
      <SEO title={`Experiencia — ${profile.fullName}`} description="Trayectoria profesional, proyectos y formación académica de Elías Cárdenas." />
      <PageHeader eyebrow="Trayectoria" title="Experiencia" description="El camino que he recorrido construyendo software, proyecto por proyecto." />

      <section className="relative px-6 pb-28 md:px-12">
        <div ref={ref} className="relative mx-auto max-w-3xl" style={{ perspective: 1200 }}>
          {/* Vertical line track */}
          <div className="absolute top-0 left-[15px] h-full w-px bg-[var(--color-border)] md:left-[19px]" />
          {/* Animated progress line with glow */}
          <motion.div
            style={{ height: lineHeight, opacity: glowOpacity }}
            className="absolute top-0 left-[15px] w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-bright)] to-[var(--color-success)] shadow-[0_0_12px_2px_var(--color-accent-bright)] md:left-[19px]"
          />

          <div className="space-y-10">
            {timelineItems.map((item, i) => {
              const Icon = ICONS[item.type];
              const isLink = item.type === 'project' && Boolean(item.slug);

              return (
                <Reveal key={item.id} delay={i * 0.04} y={24}>
                  <div className="group relative flex gap-6 pl-10 md:pl-12">
                    {/* Node */}
                    <motion.span
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className={`absolute left-0 top-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        item.current
                          ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent)]/20 shadow-[0_0_16px_2px_color-mix(in_srgb,var(--color-accent-bright)_60%,transparent)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                      }`}
                    >
                      {item.current ? (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-bright)] opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-bright)]" />
                        </span>
                      ) : (
                        <Icon size={13} className="text-[var(--color-paper-dim)] transition-colors duration-300 group-hover:text-[var(--color-accent-bright)]" />
                      )}
                    </motion.span>

                    {isLink && item.slug ? (
                      <Link to={`/proyectos/${item.slug}`} data-cursor-pointer className="flex-1">
                        <TimelineCard item={item} isLink={isLink} />
                      </Link>
                    ) : (
                      <div className="flex-1">
                        <TimelineCard item={item} isLink={isLink} />
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}