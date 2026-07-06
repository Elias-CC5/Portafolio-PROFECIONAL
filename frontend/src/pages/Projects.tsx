import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import SEO from '@/components/layout/SEO';
import ProjectCard from '@/components/sections/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import { useGsapStagger } from '@/hooks/useGsapStagger';
import { projects, profile } from '@/data/portfolio';
import { FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Filter = 'all' | 'completed' | 'in-progress';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Completados', value: 'completed' },
  { label: 'En curso', value: 'in-progress' },
];

export default function Projects() {
  const gridRef = useGsapStagger<HTMLDivElement>('.project-card-item');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return p.status === 'completed';
    return p.status !== 'completed';
  });

  return (
    <>
      <SEO
        title={`Proyectos — ${profile.fullName}`}
        description="Proyectos académicos y personales de desarrollo full stack."
      />
      <PageHeader
        eyebrow="Trabajo realizado"
        title="Proyectos"
        description="Proyectos donde aplico arquitectura backend limpia, autenticación segura y interfaces modernas."
      />

      <section className="px-6 pb-28 md:px-12">
        <div className="mx-auto max-w-6xl">

          {/* Filter tabs */}
          <Reveal className="mb-10 flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                data-cursor-pointer
                className="relative rounded-full px-4 py-2 font-mono text-xs transition-colors duration-200"
                style={{ color: filter === f.value ? 'var(--color-paper)' : 'var(--color-muted)' }}
              >
                {filter === f.value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full border border-[var(--color-accent-bright)]/40 bg-[var(--color-surface)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
                <span className="relative z-10 ml-1.5 font-mono text-[10px] text-[var(--color-muted)]">
                  {f.value === 'all'
                    ? projects.length
                    : projects.filter((p) =>
                        f.value === 'completed' ? p.status === 'completed' : p.status !== 'completed'
                      ).length}
                </span>
              </button>
            ))}
          </Reveal>

          {/* Grid */}
          <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-mono text-sm text-[var(--color-muted)]">No hay proyectos en esta categoría.</p>
            </div>
          )}

          {/* GitHub CTA */}
          <Reveal delay={0.2} className="mt-16 text-center">
            <p className="text-sm text-[var(--color-paper-dim)]">¿Quieres ver más código?</p>
            <a
              href="https://github.com/Elias-CC5"
              target="_blank"
              rel="noreferrer"
              data-cursor-pointer
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent-bright)] hover:text-[var(--color-accent-bright)]"
            >
              <FiGithub size={15} /> Ver perfil en GitHub
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}